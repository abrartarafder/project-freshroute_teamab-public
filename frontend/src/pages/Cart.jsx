import { useMemo, useState } from "react";
import { FaChevronLeft, FaTrash } from "react-icons/fa";
import AppNavbar from "../components/navbar.jsx";
import {
  useCart,
  setItemQuantity,
  removeItem,
  getCartSubtotal,
  updateRecipeQuantity,
  removeRecipeAndGroceries,
  clearCart,
} from "../utils/cartStore.js";
import logo from "../assets/logo_clear.png";
import mastercardLogo from "../assets/card/mastercard.png";
import visaLogo from "../assets/card/visa.png";
import applePayLogo from "../assets/card/applepay.png";
import paypalLogo from "../assets/card/paypal.png";
import shopPayLogo from "../assets/card/shoppay.png";
import "./Landing.css";
import "./Cart.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;

const formatQuantity = (value, isFractional) => {
  const qty = Number(value || 0);
  if (!isFractional) return String(Math.round(qty));
  return qty.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
};

const makeOrderId = () =>
  `FR-${Math.floor(10000000 + Math.random() * 90000000)}`;

export default function Cart() {
  const userName = "John";
  const { items, count } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const deliverySlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "6:00 PM - 8:00 PM",
  ];
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotError, setSlotError] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postal: "",
    phone: "",
    notes: "",
  });
  const [card, setCard] = useState({
    name: "",
    number: "",
    exp: "",
    cvv: "",
  });
  const [addressErrors, setAddressErrors] = useState({});
  const [cardErrors, setCardErrors] = useState({});
  const [orderMessage, setOrderMessage] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [orderId, setOrderId] = useState(() => makeOrderId());

  const { regularItems, recipeItems, recipeGroceryItems, subtotal } = useMemo(() => {
    const regular = items.filter((item) => item.group === "regular");
    const recipes = items.filter((item) => item.group === "recipe");
    const recipeGroceries = items.filter((item) => item.group === "recipe-grocery");
    return {
      regularItems: regular,
      recipeItems: recipes,
      recipeGroceryItems: recipeGroceries,
      subtotal: getCartSubtotal(items),
    };
  }, [items]);

  const shipping = subtotal < 50 ? 4 : 0;
  const tax = subtotal * 0.13;
  const total = subtotal + tax + shipping;

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    setAddressErrors((prev) => ({ ...prev, [field]: "" }));
    setOrderMessage("");
  };

  const handleCardChange = (field, value) => {
    setCard((prev) => ({ ...prev, [field]: value }));
    setCardErrors((prev) => ({ ...prev, [field]: "" }));
    setOrderMessage("");
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setSlotError("");
    setOrderMessage("");
  };

  const handleDateChange = (value) => {
    setDeliveryDate(value);
    setDateError("");
    setOrderMessage("");
  };

  const validateAddress = () => {
    const requiredFields = ["fullName", "street", "city", "postal"];
    const nextErrors = {};
    requiredFields.forEach((field) => {
      if (!address[field].trim()) {
        nextErrors[field] = "Required";
      }
    });
    setAddressErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateCard = () => {
    const requiredFields = ["name", "number", "exp", "cvv"];
    const nextErrors = {};
    requiredFields.forEach((field) => {
      if (!card[field].trim()) {
        nextErrors[field] = "Required";
      }
    });
    setCardErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildDeliveryString = () => {
    const parts = [
      address.fullName.trim(),
      address.street.trim(),
      [address.city.trim(), address.postal.trim()].filter(Boolean).join(" "),
    ].filter(Boolean);
    const upper = parts.map((p) => p.toUpperCase());
    return upper.length > 0 ? `Delivering to ${upper.join(", ")}` : "";
  };

  const handlePlaceOrder = async () => {
    const cardOk = validateCard();
    const addressOk = validateAddress();
    const slotOk = Boolean(selectedSlot);
    const dateOk = Boolean(deliveryDate);
    if (!slotOk) setSlotError("Please choose a delivery time slot.");
    if (!dateOk) setDateError("Please select a delivery date.");
    if (!cardOk || !addressOk || !slotOk || !dateOk) return;
    const delivery = buildDeliveryString();
    const confirmation = [
      `Delivery date: ${deliveryDate}`,
      "Delivery window: " + selectedSlot,
      delivery,
    ]
      .filter(Boolean)
      .join(" • ");
    const statusPool = ["Placed", "Preparing", "Out for Delivery", "Delivered"];
    const deliveryStatus = statusPool[Math.floor(Math.random() * statusPool.length)];
    const order = {
      orderId,
      createdAt: new Date().toISOString(),
      address,
      deliverySlot: selectedSlot,
      deliveryDate,
      saveCard,
      deliveryStatus,
      totals: { subtotal, tax, shipping, total },
      items,
    };

    try {
      await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch (error) {
      console.error("Order sync failed; keeping local only", error);
    }

    try {
      window.localStorage.setItem("fr-last-order", JSON.stringify(order));
      const existing = JSON.parse(window.localStorage.getItem("fr-orders") || "[]");
      window.localStorage.setItem("fr-orders", JSON.stringify([...existing, order]));
    } catch (error) {
      // ignore storage failures
    }

    clearCart();
    setOrderMessage(`Order Confirmed! Your Order ID is ${orderId}`);
    setOrderId(makeOrderId());
    setShowCheckout(false);
  };

  const renderItem = (item) => {
    const step = 1;
    const isRecipe = item.group === "recipe";
    const isAuto = item.group === "recipe-grocery";
    const recipeForUpdate = isRecipe
      ? {
          title: item.name,
          image: item.image,
          servings: item.meta?.baseServings || 1,
          ingredients: item.meta?.ingredients ?? [],
          ingredientDetails: item.meta?.ingredientDetails ?? [],
        }
      : null;
    return (
      <div key={item.id} className="cart-item">
        <div className="cart-thumb">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="cart-item-info">
          <div className="cart-item-title">{item.name}</div>
          <div className="cart-item-meta">
            <span>{item.priceLabel}</span>
            {item.group === "recipe" && (
              <span className="cart-item-note">Recipe Selection</span>
            )}
            {item.group === "recipe-grocery" && item.meta?.parentRecipe && (
              <span className="cart-item-note">Auto-generated</span>
            )}
          </div>
        </div>
        <div className="cart-qty">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={isAuto}
            onClick={() => {
              const nextQty = (Number(item.quantity) || 0) - step;
              if (isRecipe) {
                updateRecipeQuantity(item.id, item.name, nextQty, recipeForUpdate);
                return;
              }
              setItemQuantity(item.id, nextQty);
            }}
          >
            -
          </button>
          <span>{formatQuantity(item.quantity, isAuto)}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={isAuto}
            onClick={() => {
              const nextQty = (Number(item.quantity) || 0) + step;
              if (isRecipe) {
                updateRecipeQuantity(item.id, item.name, nextQty, recipeForUpdate);
                return;
              }
              setItemQuantity(item.id, nextQty);
            }}
          >
            +
          </button>
          {item.unitLabel && <small>{item.unitLabel}</small>}
        </div>
        <div className="cart-item-total">
          {formatMoney((Number(item.unitPrice) || 0) * (Number(item.quantity) || 0))}
        </div>
        <button
          type="button"
          className="cart-remove"
          aria-label={`Remove ${item.name}`}
          disabled={isAuto}
          onClick={() => {
            if (isRecipe) {
              removeRecipeAndGroceries(item.name, item.id);
              return;
            }
            removeItem(item.id);
          }}
        >
          <FaTrash />
        </button>
      </div>
    );
  };

  return (
    <div className="page-shell cart-shell">
      <div className={`page-main ${showCheckout ? "cart-blur" : ""}`}>
        <AppNavbar
          userName={userName}
          activeKey="cart"
          cartCount={count}
          showSearch={false}
          showLocationPicker={true}
        />

        <section className="cart-page">
          <div className="cart-container">
            <div className="cart-header">
              <div>
                <a className="cart-continue" href="/organic">
                  <FaChevronLeft />
                  Shopping Continue
                </a>
                <h1>Shopping Cart</h1>
                <p>You have {count} item{count === 1 ? "" : "s"} in your cart.</p>
              </div>
            </div>

            <div className="cart-grid">
              <div className="cart-left">
                {count === 0 ? (
                  <div className="cart-empty">
                    <h3>Your cart is empty.</h3>
                    <p>Add items from Organic, Ethically Raised, or Recipes to get started.</p>
                  </div>
                ) : (
                  <>
                    <div className="cart-section">
                      <h2>Regular Grocery</h2>
                      {regularItems.length === 0 ? (
                        <p className="cart-section-empty">No grocery items yet.</p>
                      ) : (
                        regularItems.map(renderItem)
                      )}
                    </div>

                    <div className="cart-section">
                      <h2>Recipe Selection</h2>
                      {recipeItems.length === 0 ? (
                        <p className="cart-section-empty">No recipes selected.</p>
                      ) : (
                        recipeItems.map(renderItem)
                      )}
                    </div>

                    <div className="cart-section">
                      <h2>Recipe Grocery (auto-generated)</h2>
                      {recipeGroceryItems.length === 0 ? (
                        <p className="cart-section-empty">
                          Add a recipe to generate its grocery list.
                        </p>
                      ) : (
                        recipeGroceryItems.map(renderItem)
                      )}
                    </div>
                  </>
                )}
              </div>

              <aside className="cart-right">
                <div className="card-panel">
                  <h3>Order Summary</h3>
                  <div className="card-summary">
                    <div>
                      <span>Subtotal</span>
                      <span>{formatMoney(subtotal)}</span>
                    </div>
                    <div>
                      <span>Shipping</span>
                      <span>{formatMoney(shipping)}</span>
                    </div>
                    <div>
                      <span>Tax (HST)</span>
                      <span>{formatMoney(tax)}</span>
                    </div>
                    <div className="card-total">
                      <span>Total (tax incl.)</span>
                      <span>{formatMoney(total)}</span>
                    </div>
                    <button
                      type="button"
                      className="checkout-btn"
                      disabled={count === 0}
                      onClick={() => setShowCheckout(true)}
                    >
                      Checkout
                    </button>
                    <p className="checkout-note">
                      You accept full responsibility for the order once delivered. Items not requiring ID or delivery confirmation may be left at your door if requested or if you are not present. FreshRoute may charge retailers a fee for orders placed through its services. A retailer bag fee per bag may be added to your final total (shown on the receipt after delivery).
                    </p>
                    <p className="checkout-note tos-note">
                      By ordering you agree to the <span className="tos-link">Terms of Service</span>.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>

      <footer className={`footer ${showCheckout ? "cart-blur" : ""}`}>
        <div className="container footer-container">
          <img src={logo} alt="FreshRoute Logo" className="footer-logo" />
        </div>
      </footer>

      {showCheckout && (
        <div className="checkout-overlay" role="dialog" aria-modal="true">
          <div className="checkout-modal">
            <div className="checkout-header">
              <h2>Checkout</h2>
              <span className="order-id-pill">Order ID: {orderId}</span>
              <button
                type="button"
                className="checkout-close"
                aria-label="Close checkout"
                onClick={() => setShowCheckout(false)}
              >
                X
              </button>
            </div>
            <p className="checkout-subtitle">
              Enter your payment details and delivery address to complete the order.
            </p>

            <div className="checkout-grid">
              <section className="checkout-section payment-section">
                <h3>Card Details</h3>
                <div className="card-types">
                  <button type="button" className="card-type-logo">
                    <img src={mastercardLogo} alt="Mastercard" />
                  </button>
                  <button type="button" className="card-type-logo">
                    <img src={visaLogo} alt="Visa" />
                  </button>
                  <button type="button" className="card-type-logo">
                    <img src={applePayLogo} alt="Apple Pay" />
                  </button>
                  <button type="button" className="card-chip">
                    See all
                  </button>
                </div>
                <div className="card-form">
                  <label htmlFor="checkout-card-name">Name on card</label>
                  <input
                    id="checkout-card-name"
                    type="text"
                    placeholder="Name"
                    value={card.name}
                    onChange={(e) => handleCardChange("name", e.target.value)}
                    aria-invalid={Boolean(cardErrors.name)}
                    aria-describedby="err-card-name"
                  />
                  {cardErrors.name && (
                    <span id="err-card-name" className="field-error">
                      {cardErrors.name}
                    </span>
                  )}
                  <label htmlFor="checkout-card-number">Card Number</label>
                  <input
                    id="checkout-card-number"
                    type="text"
                    placeholder="1111 2222 3333 4444"
                    value={card.number}
                    onChange={(e) => handleCardChange("number", e.target.value)}
                    aria-invalid={Boolean(cardErrors.number)}
                    aria-describedby="err-card-number"
                  />
                  {cardErrors.number && (
                    <span id="err-card-number" className="field-error">
                      {cardErrors.number}
                    </span>
                  )}
                  <div className="card-row">
                    <div>
                      <label htmlFor="checkout-card-exp">Expiration date</label>
                      <input
                        id="checkout-card-exp"
                        type="text"
                        placeholder="mm/yy"
                        value={card.exp}
                        onChange={(e) => handleCardChange("exp", e.target.value)}
                        aria-invalid={Boolean(cardErrors.exp)}
                        aria-describedby="err-card-exp"
                      />
                      {cardErrors.exp && (
                        <span id="err-card-exp" className="field-error">
                          {cardErrors.exp}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="checkout-card-cvv">CVV</label>
                      <input
                        id="checkout-card-cvv"
                        type="text"
                        placeholder="123"
                        value={card.cvv}
                        onChange={(e) => handleCardChange("cvv", e.target.value)}
                        aria-invalid={Boolean(cardErrors.cvv)}
                        aria-describedby="err-card-cvv"
                      />
                      {cardErrors.cvv && (
                        <span id="err-card-cvv" className="field-error">
                          {cardErrors.cvv}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="save-card-row">
                    <label className="save-card-checkbox">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                      />
                      <div className="save-card-copy">
                        <span className="save-card-title">Save for next time</span>
                        <span className="save-card-note">
                          We tokenize your card with our payment partner; no full card number is kept on this device.
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="alt-pay">
                    <span className="alt-pay-label">Or pay with</span>
                    <div className="alt-pay-buttons">
                      <button type="button" className="alt-pay-btn shop-pay">
                        <img src={shopPayLogo} alt="Shop Pay" />
                      </button>
                      <button type="button" className="alt-pay-btn paypal">
                        <img src={paypalLogo} alt="PayPal" />
                      </button>
                    </div>
                  </div>
                  <p className="safety-tip">
                    Safety tip: Make sure the name and postal code match your bank records to avoid declines.
                  </p>
                </div>
              </section>

              <section className="checkout-section">
                <h3>Delivery Address</h3>
                <div className="card-form">
                  <label htmlFor="checkout-full-name">Full name</label>
                  <input
                    id="checkout-full-name"
                    type="text"
                    placeholder="John Doe"
                    value={address.fullName}
                    onChange={(e) => handleAddressChange("fullName", e.target.value)}
                    aria-invalid={Boolean(addressErrors.fullName)}
                    aria-describedby="err-full-name"
                  />
                  {addressErrors.fullName && (
                    <span id="err-full-name" className="field-error">
                      {addressErrors.fullName}
                    </span>
                  )}
                  <label htmlFor="checkout-address">Street address</label>
                  <input
                    id="checkout-address"
                    type="text"
                    placeholder="123 Main Street"
                    value={address.street}
                    onChange={(e) => handleAddressChange("street", e.target.value)}
                    aria-invalid={Boolean(addressErrors.street)}
                    aria-describedby="err-street"
                  />
                  {addressErrors.street && (
                    <span id="err-street" className="field-error">
                      {addressErrors.street}
                    </span>
                  )}
                  <label htmlFor="checkout-city">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    placeholder="Toronto"
                    value={address.city}
                    onChange={(e) => handleAddressChange("city", e.target.value)}
                    aria-invalid={Boolean(addressErrors.city)}
                    aria-describedby="err-city"
                  />
                  {addressErrors.city && (
                    <span id="err-city" className="field-error">
                      {addressErrors.city}
                    </span>
                  )}
                  <div className="card-row">
                    <div>
                      <label htmlFor="checkout-postal">Postal code</label>
                      <input
                        id="checkout-postal"
                        type="text"
                        placeholder="M1A 1A1"
                        value={address.postal}
                        onChange={(e) => handleAddressChange("postal", e.target.value)}
                        aria-invalid={Boolean(addressErrors.postal)}
                        aria-describedby="err-postal"
                      />
                      {addressErrors.postal && (
                        <span id="err-postal" className="field-error">
                          {addressErrors.postal}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="checkout-phone">Phone</label>
                      <input
                        id="checkout-phone"
                        type="text"
                        placeholder="(416) 555-0123"
                        value={address.phone}
                        onChange={(e) => handleAddressChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  <label htmlFor="checkout-notes">Delivery notes (optional)</label>
                  <input
                    id="checkout-notes"
                    type="text"
                    placeholder="Leave at front door"
                    value={address.notes}
                    onChange={(e) => handleAddressChange("notes", e.target.value)}
                  />
                  <div className="slot-picker">
                    <div className="slot-picker__header">
                      <div>
                        <p className="slot-title">Delivery date</p>
                        <p className="slot-help">Pick the day for your order.</p>
                      </div>
                      <span className="slot-required">Required</span>
                    </div>
                    <input
                      type="date"
                      className="slot-date"
                      value={deliveryDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => handleDateChange(e.target.value)}
                    />
                    {dateError && <span className="field-error">{dateError}</span>}
                  </div>
                  <div className="slot-picker">
                    <div className="slot-picker__header">
                      <div>
                        <p className="slot-title">Delivery time slot</p>
                        <p className="slot-help">Choose a window for your drop-off.</p>
                      </div>
                      <span className="slot-required">Required</span>
                    </div>
                    <div className="slot-grid" role="group" aria-label="Delivery time slots">
                      {deliverySlots.map((slot) => {
                        const isActive = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            className={`slot-chip ${isActive ? "is-active" : ""}`}
                            aria-pressed={isActive}
                            onClick={() => handleSlotSelect(slot)}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {slotError && <span className="field-error">{slotError}</span>}
                  </div>
                </div>
              </section>
            </div>

            <div className="checkout-actions">
              <button type="button" className="checkout-cancel" onClick={() => setShowCheckout(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="checkout-confirm"
                onClick={handlePlaceOrder}
                disabled={!selectedSlot || !deliveryDate}
              >
                Place Order
              </button>
            </div>

            {orderMessage && <p className="order-confirm">{orderMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
