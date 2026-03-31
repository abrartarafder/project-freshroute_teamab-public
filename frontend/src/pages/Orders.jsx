import { useEffect, useMemo, useState } from "react";
import { FaMapMarkerAlt, FaReceipt, FaRegClock, FaSearch, FaTrash } from "react-icons/fa";
import AppNavbar from "../components/navbar.jsx";
import { useCart } from "../utils/cartStore.js";
import "./Orders.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const readOrders = () => {
  try {
    return JSON.parse(window.localStorage.getItem("fr-orders") || "[]");
  } catch {
    return [];
  }
};

const normalizeOrderId = (value) => value.trim().toUpperCase();

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const formatDate = (value) => {
  if (!value) return "Not provided";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getLocalOrderById = (orderId, orders = []) => {
  const normalized = normalizeOrderId(orderId);
  return (
    orders.find((order) => normalizeOrderId(order.orderId || order.id || "") === normalized) ||
    readOrders().find((order) => normalizeOrderId(order.orderId || order.id || "") === normalized) ||
    null
  );
};

const normalizeStatus = (value) => {
  const raw = String(value || "").trim().toLowerCase();

  if (raw === "starting") return "Preparing";
  if (raw === "pending") return "Placed";
  if (raw === "placed") return "Placed";
  if (raw === "preparing") return "Preparing";
  if (raw === "out for delivery") return "Out for Delivery";
  if (raw === "delivered") return "Delivered";
  if (raw === "cancelled" || raw === "canceled") return "Cancelled";

  return value || "Placed";
};

const isCancellableStatus = (value) => normalizeStatus(value) === "Placed";

const syncStoredOrders = (nextOrders) => {
  window.localStorage.setItem("fr-orders", JSON.stringify(nextOrders));
};

export default function Orders() {
  const initialQueryId = new URLSearchParams(window.location.search).get("orderId") || "";
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pendingCancelOrder, setPendingCancelOrder] = useState(null);
  const [filterYear, setFilterYear] = useState("all");
  const [lookupId, setLookupId] = useState(initialQueryId);
  const [lookupError, setLookupError] = useState("");
  const [ordersError, setOrdersError] = useState("");
  const [lookupTouched, setLookupTouched] = useState(Boolean(initialQueryId));
  const [isLookupLoading, setIsLookupLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const { count: cartCount } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders`);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setOrders(data);
        setOrdersError("");
      } catch {
        const fallback = readOrders();
        setOrders(fallback);
        setOrdersError(
          fallback.length
            ? "We could not refresh your latest orders from the server, so we are showing saved orders from this device."
            : "We could not load your orders right now. You can still search using an order ID from this device."
        );
      }
    };

    load();
  }, []);

  const runLookup = async (rawOrderId) => {
    const normalized = normalizeOrderId(rawOrderId);
    setLookupTouched(true);
    setLookupError("");
    setSelectedOrder(null);

    if (!normalized) {
      setLookupError("Enter your order ID to view the order details.");
      return;
    }

    setLookupId(normalized);
    setIsLookupLoading(true);
    window.history.replaceState({}, "", `/orders?orderId=${encodeURIComponent(normalized)}`);

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${encodeURIComponent(normalized)}`);

      if (res.ok) {
        const data = await res.json();
        setSelectedOrder(data);
        setIsLookupLoading(false);
        return;
      }

      if (res.status !== 404) {
        throw new Error(`Request failed with status ${res.status}`);
      }
    } catch {
      const localOrder = getLocalOrderById(normalized, orders);
      if (localOrder) {
        setSelectedOrder(localOrder);
        setLookupError(
          "We loaded this order from saved device data because the live order service is unavailable right now."
        );
        setIsLookupLoading(false);
        return;
      }

      setLookupError("We could not reach the order service. Please try again in a moment.");
      setIsLookupLoading(false);
      return;
    }

    const fallbackOrder = getLocalOrderById(normalized, orders);
    if (fallbackOrder) {
      setSelectedOrder(fallbackOrder);
      setLookupError(
        "This order was found in saved device data. Live order lookup did not return a match."
      );
    } else {
      setLookupError("We could not find an order with that ID. Check the ID from checkout and try again.");
    }

    setIsLookupLoading(false);
  };

  useEffect(() => {
    if (initialQueryId) {
      runLookup(initialQueryId);
    }
    // We only want to hydrate the initial query string once on first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalOrders = orders.length;

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      if (!order?.createdAt) return filterYear === "all";

      const year = new Date(order.createdAt).getFullYear();
      if (filterYear === "all") return true;
      if (filterYear === "2026") return year === 2026;
      if (filterYear === "2025") return year === 2025;
      if (filterYear === "older") return year <= 2024;
      return true;
    });
  }, [orders, filterYear]);

  const selectedStatus = normalizeStatus(selectedOrder?.deliveryStatus);
  const canCancelSelectedOrder = isCancellableStatus(selectedOrder?.deliveryStatus);
  const pendingCancelOrderId = pendingCancelOrder?.orderId || pendingCancelOrder?.id || "";
  const selectedAddress = [
    selectedOrder?.address?.fullName,
    selectedOrder?.address?.street,
    [selectedOrder?.address?.city, selectedOrder?.address?.postal].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  const applyOrderUpdate = (updatedOrder) => {
    const targetId = updatedOrder.orderId || updatedOrder.id;
    const hasExistingOrder = orders.some((order) => (order.orderId || order.id) === targetId);
    const nextOrders = orders.map((order) =>
      (order.orderId || order.id) === targetId ? { ...order, ...updatedOrder } : order
    );
    const finalOrders = hasExistingOrder ? nextOrders : [updatedOrder, ...nextOrders];

    setOrders(finalOrders);
    setSelectedOrder(updatedOrder);
    syncStoredOrders(finalOrders);

    try {
      const lastOrder = JSON.parse(window.localStorage.getItem("fr-last-order") || "null");
      if (lastOrder && (lastOrder.orderId || lastOrder.id) === targetId) {
        window.localStorage.setItem("fr-last-order", JSON.stringify(updatedOrder));
      }
    } catch {
      // ignore storage failures
    }
  };

  const handleCancelOrder = async (order) => {
    if (!order || !isCancellableStatus(order.deliveryStatus) || isCancelLoading) {
      return;
    }

    setLookupError("");
    setIsCancelLoading(true);
    setPendingCancelOrder(null);

    const orderId = order.orderId || order.id;

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${encodeURIComponent(orderId)}/cancel`, {
        method: "PATCH",
      });

      if (!res.ok) {
        if (res.status === 409) {
          setLookupError("This order can no longer be cancelled because it is no longer in Placed status.");
          setIsCancelLoading(false);
          return;
        }

        throw new Error(`Request failed with status ${res.status}`);
      }

      const updatedOrder = await res.json();
      applyOrderUpdate(updatedOrder);
      setLookupError(`Order ${orderId} was cancelled successfully.`);
    } catch {
      const localUpdate = { ...order, deliveryStatus: "Cancelled" };
      applyOrderUpdate(localUpdate);
      setLookupError(
        `Order ${orderId} was cancelled on this device. We could not confirm the update with the server.`
      );
    }

    setIsCancelLoading(false);
  };

  return (
    <div className="orders-shell">
      <AppNavbar
        activeKey="orders"
        showSearch={true}
        showLocationPicker={false}
        cartCount={cartCount}
        searchPlaceholder="Enter order ID"
        onSearch={(value) => setLookupId(value.toUpperCase())}
        onSearchSubmit={(value) => runLookup(value)}
      />
      <main className="orders-main">
        <section className="orders-hero">
          <div className="orders-hero-container">
            <div className="orders-header">
              <div>
                <p className="orders-kicker">Orders</p>
                <h1>Find Your Order</h1>
                <p className="orders-sub">
                  Enter the order ID from checkout to review items, address, totals, and status.
                </p>
              </div>
              <div className="orders-metrics">
                <span className="metric-pill">Orders saved: {totalOrders}</span>
                <span className="metric-pill">Cart items now: {cartCount}</span>
              </div>
            </div>

            <form
              className="orders-lookup-card"
              onSubmit={(event) => {
                event.preventDefault();
                runLookup(lookupId);
              }}
            >
              <div className="orders-lookup-copy">
                <span className="orders-lookup-icon">
                  <FaSearch />
                </span>
                <div>
                  <h2>Order Lookup</h2>
                  <p>Use the order ID you received after checkout. Example: `FR-12345678`</p>
                </div>
              </div>
              <div className="orders-lookup-form">
                <label className="sr-only" htmlFor="order-id-input">
                  Order ID
                </label>
                <input
                  id="order-id-input"
                  type="text"
                  className="orders-lookup-input"
                  value={lookupId}
                  onChange={(event) => setLookupId(event.target.value.toUpperCase())}
                  placeholder="FR-12345678"
                  autoComplete="off"
                />
                <button type="submit" className="orders-lookup-button" disabled={isLookupLoading}>
                  {isLookupLoading ? "Looking up..." : "Find order"}
                </button>
              </div>
            </form>

            <div className="orders-tabs" role="tablist" aria-label="Filter saved orders by year">
              {[
                { key: "all", label: "All" },
                { key: "2026", label: "2026" },
                { key: "2025", label: "2025" },
                { key: "older", label: "Older" },
              ].map((tab) => {
                const active = filterYear === tab.key;
                return (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={active}
                    className={`orders-tab ${active ? "is-active" : ""}`}
                    onClick={() => setFilterYear(tab.key)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="orders-content">
          {ordersError && <div className="orders-banner orders-banner-warning">{ordersError}</div>}
          {lookupError && <div className="orders-banner orders-banner-info">{lookupError}</div>}

          {selectedOrder ? (
            <section className="order-detail-card" aria-live="polite">
              <div className="order-detail-top">
                <div>
                  <p className="order-detail-kicker">Order Found</p>
                  <h2>{selectedOrder.orderId || selectedOrder.id}</h2>
                  <p className="order-detail-sub">
                    Placed on {formatDateTime(selectedOrder.createdAt)}.
                  </p>
                </div>
                <span
                  className={`status-pill status-${selectedStatus.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  {selectedStatus}
                </span>
              </div>

              <div className="order-detail-highlights">
                <div className="detail-highlight">
                  <span className="detail-highlight-icon">
                    <FaReceipt />
                  </span>
                  <div>
                    <p>Order total</p>
                    <strong>{formatCurrency(selectedOrder.totals?.total)}</strong>
                  </div>
                </div>
                <div className="detail-highlight">
                  <span className="detail-highlight-icon">
                    <FaRegClock />
                  </span>
                  <div>
                    <p>Delivery window</p>
                    <strong>
                      {[formatDate(selectedOrder.deliveryDate), selectedOrder.deliverySlot]
                        .filter(Boolean)
                        .join(" • ") || "Not scheduled"}
                    </strong>
                  </div>
                </div>
                <div className="detail-highlight">
                  <span className="detail-highlight-icon">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <p>Delivery address</p>
                    <strong>{selectedAddress || "Address unavailable"}</strong>
                  </div>
                </div>
              </div>

              <div className="order-detail-grid">
                <div className="order-detail-section">
                  <h3>Items in this order</h3>
                  {selectedOrder.items?.length ? (
                    <div className="order-items-list">
                      {selectedOrder.items.map((item, index) => (
                        <div className="order-item-row" key={`${item.id || item.name}-${index}`}>
                          <div>
                            <strong>{item.name || "Unnamed item"}</strong>
                            <p>{item.priceLabel || formatCurrency(item.unitPrice)}</p>
                          </div>
                          <div className="order-item-meta">
                            <span>Qty {Number(item.quantity) || 0}</span>
                            <strong>
                              {formatCurrency((Number(item.unitPrice) || 0) * (Number(item.quantity) || 0))}
                            </strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="orders-empty compact">No items were stored for this order.</div>
                  )}
                </div>

                <div className="order-detail-section">
                  <h3>Summary</h3>
                  <div className="order-summary-list">
                    <div>
                      <span>Subtotal</span>
                      <strong>{formatCurrency(selectedOrder.totals?.subtotal)}</strong>
                    </div>
                    <div>
                      <span>Shipping</span>
                      <strong>{formatCurrency(selectedOrder.totals?.shipping)}</strong>
                    </div>
                    <div>
                      <span>Tax</span>
                      <strong>{formatCurrency(selectedOrder.totals?.tax)}</strong>
                    </div>
                    <div className="summary-total">
                      <span>Total</span>
                      <strong>{formatCurrency(selectedOrder.totals?.total)}</strong>
                    </div>
                  </div>

                  <div className="order-address-card">
                    <h4>Delivery details</h4>
                    <p>{selectedAddress || "Address unavailable"}</p>
                    {selectedOrder.address?.phone && <p>Phone: {selectedOrder.address.phone}</p>}
                    {selectedOrder.address?.notes && <p>Notes: {selectedOrder.address.notes}</p>}
                    {canCancelSelectedOrder && (
                      <div className="order-detail-actions">
                        <button
                          type="button"
                          className="orders-cancel order-detail-cancel"
                          onClick={() => setPendingCancelOrder(selectedOrder)}
                          disabled={isCancelLoading}
                        >
                          {isCancelLoading ? "Cancelling..." : "Cancel order"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="orders-empty-state">
              <h2>{lookupTouched ? "No order selected" : "Search by order ID"}</h2>
              <p>
                {lookupTouched
                  ? "Try another order ID, or open one of the saved recent orders below."
                  : "We’ll show your full order details here once you search for an order ID."}
              </p>
            </section>
          )}

          <section className="orders-history">
            <div className="orders-section-header">
              <div>
                <p className="orders-kicker">Saved Orders</p>
                <h2>Recent Orders</h2>
              </div>
              <p className="orders-section-sub">Quick access to recent orders stored on this account or device.</p>
            </div>

            {filtered.length === 0 ? (
              <div className="orders-empty">No orders yet. Place your first order to see it here.</div>
            ) : (
              <div className="orders-table-wrap">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Placed</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Delivery Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order) => {
                      const displayId = order.orderId || order.id || "-";
                      const itemCount = (order.items || []).reduce(
                        (sum, item) => sum + (Number(item.quantity) || 0),
                        0
                      );
                      const status = normalizeStatus(order.deliveryStatus);

                      return (
                        <tr key={displayId}>
                          <td className="orders-id">{displayId}</td>
                          <td>{formatDateTime(order.createdAt)}</td>
                          <td>{itemCount || 0}</td>
                          <td>{formatCurrency(order.totals?.total)}</td>
                          <td>
                            <span className={`status-pill status-${status.replace(/\s+/g, "-").toLowerCase()}`}>
                              {status}
                            </span>
                          </td>
                          <td className="orders-actions-cell">
                            <button
                              type="button"
                              className="orders-open"
                              onClick={() => runLookup(displayId)}
                            >
                              View details
                            </button>
                            <button
                              type="button"
                              className="orders-delete"
                              onClick={async () => {
                                const next = orders.filter(
                                  (entry) => (entry.id || entry.orderId) !== (order.id || order.orderId)
                                );
                                setOrders(next);
                                syncStoredOrders(next);

                                if ((selectedOrder?.id || selectedOrder?.orderId) === (order.id || order.orderId)) {
                                  setSelectedOrder(null);
                                }

                                try {
                                  await fetch(`${API_BASE_URL}/api/orders/${order.orderId || order.id}`, {
                                    method: "DELETE",
                                  });
                                } catch {
                                  setLookupError(
                                    "The order was removed from this device, but we could not sync the deletion with the server."
                                  );
                                }
                              }}
                              aria-label={`Delete order ${displayId}`}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </section>
      </main>

      {pendingCancelOrder && (
        <div className="orders-modal-backdrop" role="presentation" onClick={() => setPendingCancelOrder(null)}>
          <div
            className="orders-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-order-title"
            aria-describedby="cancel-order-description"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="orders-modal-kicker">Before You Cancel</p>
            <h2 id="cancel-order-title">Cancel this order?</h2>
            <p id="cancel-order-description" className="orders-modal-copy">
              Are you sure you want to cancel order {pendingCancelOrderId}? Once cancelled, it will not be
              prepared for delivery.
            </p>
            <div className="orders-modal-actions">
              <button
                type="button"
                className="orders-modal-secondary"
                onClick={() => setPendingCancelOrder(null)}
                disabled={isCancelLoading}
              >
                Keep order
              </button>
              <button
                type="button"
                className="orders-cancel orders-modal-primary"
                onClick={() => handleCancelOrder(pendingCancelOrder)}
                disabled={isCancelLoading}
              >
                {isCancelLoading ? "Cancelling..." : "Cancel order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
