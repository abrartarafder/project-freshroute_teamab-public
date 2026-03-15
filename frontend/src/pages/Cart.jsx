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
} from "../utils/cartStore.js";
import logo from "../assets/logo_clear.png";
import mastercardLogo from "../assets/card/mastercard.png";
import visaLogo from "../assets/card/visa.png";
import applePayLogo from "../assets/card/applepay.png";
import "./Landing.css";
import "./Cart.css";

const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;

const formatQuantity = (value, isFractional) => {
  const qty = Number(value || 0);
  if (!isFractional) return String(Math.round(qty));
  return qty.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
};

export default function Cart() {
  const { items, count } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

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
          userName="John"
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
                  <input id="checkout-card-name" type="text" placeholder="Name" />
                  <label htmlFor="checkout-card-number">Card Number</label>
                  <input
                    id="checkout-card-number"
                    type="text"
                    placeholder="1111 2222 3333 4444"
                  />
                  <div className="card-row">
                    <div>
                      <label htmlFor="checkout-card-exp">Expiration date</label>
                      <input id="checkout-card-exp" type="text" placeholder="mm/yy" />
                    </div>
                    <div>
                      <label htmlFor="checkout-card-cvv">CVV</label>
                      <input id="checkout-card-cvv" type="text" placeholder="123" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="checkout-section">
                <h3>Delivery Address</h3>
                <div className="card-form">
                  <label htmlFor="checkout-full-name">Full name</label>
                  <input id="checkout-full-name" type="text" placeholder="John Doe" />
                  <label htmlFor="checkout-address">Street address</label>
                  <input id="checkout-address" type="text" placeholder="123 Main Street" />
                  <label htmlFor="checkout-city">City</label>
                  <input id="checkout-city" type="text" placeholder="Toronto" />
                  <div className="card-row">
                    <div>
                      <label htmlFor="checkout-postal">Postal code</label>
                      <input id="checkout-postal" type="text" placeholder="M1A 1A1" />
                    </div>
                    <div>
                      <label htmlFor="checkout-phone">Phone</label>
                      <input id="checkout-phone" type="text" placeholder="(416) 555-0123" />
                    </div>
                  </div>
                  <label htmlFor="checkout-notes">Delivery notes (optional)</label>
                  <input id="checkout-notes" type="text" placeholder="Leave at front door" />
                </div>
              </section>
            </div>

            <div className="checkout-actions">
              <button type="button" className="checkout-cancel" onClick={() => setShowCheckout(false)}>
                Cancel
              </button>
              <button type="button" className="checkout-confirm">
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
