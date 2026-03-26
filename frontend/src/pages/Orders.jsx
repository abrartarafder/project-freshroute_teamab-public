import { useEffect, useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AppNavbar from "../components/navbar.jsx";
import { useCart } from "../utils/cartStore.js";
import "./Orders.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const readOrders = () => {
  try {
    return JSON.parse(window.localStorage.getItem("fr-orders") || "[]");
  } catch (error) {
    return [];
  }
};

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { count: cartCount } = useCart();
  const [filterYear, setFilterYear] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
          return;
        }
      } catch (error) {
        console.error("Failed to fetch orders from API, using local storage");
      }
      setOrders(readOrders());
    };
    load();
  }, []);

  const totalOrders = orders.length;

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      if (!order?.createdAt) return true;
      const year = new Date(order.createdAt).getFullYear();
      if (filterYear === "all") return true;
      if (filterYear === "2025") return year === 2025;
      if (filterYear === "2024") return year === 2024;
      if (filterYear === "older") return year <= 2023;
      return true;
    });
  }, [orders, filterYear]);

  return (
    <div className="orders-shell">
      <AppNavbar
        activeKey="orders"
        showSearch={true}
        showLocationPicker={false}
        cartCount={cartCount}
        searchPlaceholder="Search orders"
      />
      <main className="orders-main">
        <section className="orders-hero">
          <div className="orders-hero-container">
            <div className="orders-header">
              <div>
                <p className="orders-kicker">Orders</p>
                <h1>Your Orders</h1>
                <p className="orders-sub">Recent orders placed on FreshRoute.</p>
              </div>
              <div className="orders-metrics">
                <span className="metric-pill">Orders: {totalOrders}</span>
                <span className="metric-pill">Cart items now: {cartCount}</span>
              </div>
            </div>

            <div className="orders-tabs" role="tablist" aria-label="Filter orders by year">
              {[
                { key: "all", label: "All" },
                { key: "2025", label: "2025" },
                { key: "2024", label: "2024" },
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
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="orders-content">
          {filtered.length === 0 ? (
            <div className="orders-empty">No orders yet. Place your first order to see it here.</div>
          ) : (
            <div className="orders-table-wrap">
              <table className="orders-table">
                <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items (count)</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Address</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered
                    .slice()
                    .reverse()
                    .map((order) => {
                      const displayId = order.orderId || order.id || "—";
                      const totalQty = (order.items || []).reduce(
                        (sum, i) => sum + (Number(i.quantity) || 0),
                        0
                      );
                      const itemNames = order.items?.map((i) => i.name).join(", ") || "-";
                      const addrParts = [
                        order.address?.fullName,
                        order.address?.street,
                        [order.address?.city, order.address?.postal].filter(Boolean).join(" "),
                      ]
                        .filter(Boolean)
                        .join(", ");
                      const slot = [order.deliveryDate, order.deliverySlot].filter(Boolean).join(" • ");
                      const status = order.deliveryStatus || "Pending";
                      return (
                        <tr key={displayId}>
                          <td className="orders-id">{displayId}</td>
                          <td>{totalQty || "0"}</td>
                          <td>{itemNames}</td>
                          <td>{formatCurrency(order.totals?.total)}</td>
                          <td>{addrParts || "—"}</td>
                          <td>{slot || "—"}</td>
                          <td>
                            <span className={`status-pill status-${status.replace(/\s+/g, "-").toLowerCase()}`}>
                              {status}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="orders-delete"
                              onClick={async () => {
                                const next = orders.filter(
                                  (o) => (o.id || o.orderId) !== (order.id || order.orderId)
                                );
                                setOrders(next);
                                window.localStorage.setItem("fr-orders", JSON.stringify(next));
                                try {
                                  await fetch(`${API_BASE_URL}/api/orders/${order.orderId || order.id}`, {
                                    method: "DELETE",
                                  });
                                } catch (error) {
                                  console.error("Failed to delete order from API");
                                }
                              }}
                              aria-label={`Delete order ${order.id}`}
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
      </main>
    </div>
  );
}
