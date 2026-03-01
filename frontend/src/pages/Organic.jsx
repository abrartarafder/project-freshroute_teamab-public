import { Container } from "react-bootstrap";
import { useMemo, useState } from "react";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import AppNavbar from "../components/navbar.jsx";
import logo from "../assets/logo_clear.png";
import appleImg from "../assets/organic/apple.jpg";
import avocadoImg from "../assets/organic/avacado.jpg";
import bananaImg from "../assets/organic/bananas.png";
import bellPepperImg from "../assets/organic/bell peppers.jpg";
import broccoliImg from "../assets/organic/broccolli.png";
import carrotsImg from "../assets/organic/carrots.png";
import celeryImg from "../assets/organic/celery.png";
import cherryImg from "../assets/organic/cherry.png";
import cucumberImg from "../assets/organic/cucumber.png";
import grapesImg from "../assets/organic/grapes.png";
import mangoImg from "../assets/organic/mango.png";
import onionImg from "../assets/organic/onions.png";
import orangeImg from "../assets/organic/orange.jpg";
import potatoImg from "../assets/organic/potatoes.png";
import "./Landing.css";
import "./Recipes.css";
import "./Organic.css";

const TAB_KEYS = ["featured", "popular", "new"];

const products = [
  {
    name: "Apple",
    price: "$2.50/lb",
    image: appleImg,
    tabs: ["featured", "popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Fresh crisp apples sourced from trusted organic farms in Canada.",
  },
  {
    name: "Avocado",
    price: "$1.99",
    image: avocadoImg,
    tabs: ["featured"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Creamy ripe avocados ideal for salads, toast, and healthy bowls.",
  },
  {
    name: "Banana",
    price: "$3.00/lb",
    image: bananaImg,
    tabs: ["featured", "new"],
    badges: ["Organic"],
    inStock: true,
    description: "Sweet naturally ripened bananas, perfect for smoothies and snacks.",
  },
  {
    name: "Bell Pepper",
    price: "$1.00",
    image: bellPepperImg,
    tabs: ["featured"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Crisp colorful peppers with a sweet flavor and high vitamin content.",
  },
  {
    name: "Broccoli",
    price: "$3.50",
    image: broccoliImg,
    tabs: ["popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Nutrient-dense broccoli crowns, freshly harvested and packed.",
  },
  {
    name: "Carrots",
    price: "$4.00/lb",
    image: carrotsImg,
    tabs: ["popular", "new"],
    badges: ["Organic"],
    inStock: true,
    description: "Crunchy sweet carrots great for cooking, roasting, and raw snacks.",
  },
  {
    name: "Celery",
    price: "$3.00",
    image: celeryImg,
    tabs: ["featured", "popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: false,
    description: "Fresh green celery with crisp texture and clean flavor.",
  },
  {
    name: "Cherry",
    price: "$4.00/lb",
    image: cherryImg,
    tabs: ["new"],
    badges: ["Organic"],
    inStock: true,
    description: "Juicy cherries with balanced sweetness and tart notes.",
  },
  {
    name: "Cucumber",
    price: "$1.50",
    image: cucumberImg,
    tabs: ["popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Refreshing cucumbers with a crisp bite for salads and sides.",
  },
  {
    name: "Green Grapes",
    price: "$2.00/lb",
    image: grapesImg,
    tabs: ["featured"],
    badges: ["Organic"],
    inStock: true,
    description: "Seedless green grapes that are sweet, juicy, and snack-ready.",
  },
  {
    name: "Mango",
    price: "$4.40/lb",
    image: mangoImg,
    tabs: ["new", "popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: false,
    description: "Tropical mangoes with rich aroma and naturally sweet flavor.",
  },
  {
    name: "Orange",
    price: "$2.00/lb",
    image: orangeImg,
    tabs: ["featured"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Bright oranges packed with juice and vitamin C.",
  },
  {
    name: "Onion",
    price: "$3.00/bag",
    image: onionImg,
    tabs: ["new"],
    badges: ["Organic"],
    inStock: true,
    description: "Flavorful onions suitable for everyday cooking and meal prep.",
  },
  {
    name: "Potato",
    price: "$4.99/bag",
    image: potatoImg,
    tabs: ["featured", "popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Versatile farm-fresh potatoes for roasting, mashing, and baking.",
  },
];

function stars(rating = 4) {
  return Array.from({ length: 5 }).map((_, i) =>
    i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
  );
}

export default function Organic() {
  const [activeTab, setActiveTab] = useState("featured");
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const byTab =
      activeTab === "featured"
        ? products
        : products.filter((p) => p.tabs.includes(activeTab));

    if (!trimmed) return byTab;
    return byTab.filter((p) =>
      [p.name, p.description, p.price, ...(p.badges ?? [])].join(" ").toLowerCase().includes(trimmed)
    );
  }, [activeTab, query]);

  return (
    <div className="page-shell organic-shell">
      <div className="page-main">
        <AppNavbar
          userName="John"
          activeKey="organic"
          cartCount={9}
          onSearch={(value) => setQuery(value)}
        />

        <section className="recipes-hero organic-hero">
          <Container className="recipes-hero-container">
            <div className="recipes-hero-eyebrow">Organic</div>
            <h1 className="recipes-hero-title">Produce</h1>
            <div className="recipes-tabs" role="tablist" aria-label="Produce filters">
              {TAB_KEYS.map((tab) => {
                const label = tab.charAt(0).toUpperCase() + tab.slice(1);
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    className={`recipes-tab ${isActive ? "active" : ""}`}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="organic-content">
          <Container className="organic-container">
            {selectedProduct ? (
              <section className="organic-detail" aria-label="Product details">
                <button
                  type="button"
                  className="organic-back-btn recipe-cta ghost"
                  onClick={() => setSelectedProduct(null)}
                >
                  Back to produce
                </button>
                <article className="organic-detail-card">
                  <div className="organic-detail-image">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                  </div>
                  <div className="organic-detail-body">
                    <h2>{selectedProduct.name}</h2>
                    <p className="organic-detail-price">{selectedProduct.price}</p>
                    <p className="organic-detail-desc">
                      {selectedProduct.description || "Product details are coming soon."}
                    </p>
                    <div className="organic-badges">
                      {selectedProduct.badges.map((badge) => (
                        <span key={badge} className="organic-badge">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <p className={`organic-stock ${selectedProduct.inStock ? "in" : "out"}`}>
                      {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                    <button
                      type="button"
                      className="cart-btn organic-detail-cart"
                      disabled={!selectedProduct.inStock}
                    >
                      <FaShoppingCart />
                      {selectedProduct.inStock ? "Add to cart" : "Unavailable"}
                    </button>
                  </div>
                </article>
              </section>
            ) : (
              <>
                <div className="organic-grid">
                  {activeTab === "featured" && query.trim() === "" && (
                    <aside className="member-card">
                      <p className="member-offer">10% OFF</p>
                      <p className="member-copy">
                        For new member sign up at
                        <br />
                        the first time
                      </p>
                      <label htmlFor="member-email">Email address*</label>
                      <input id="member-email" type="email" placeholder="johndoe@gmail.com" />
                      <label htmlFor="member-password">Password*</label>
                      <input
                        id="member-password"
                        type="password"
                        placeholder="Maximum 8 characters"
                      />
                      <button type="button" className="member-btn">
                        Register Now
                      </button>
                    </aside>
                  )}

                  {filteredProducts.map((item) => (
                    <article
                      key={item.name}
                      className={`produce-card ${item.inStock ? "" : "out-of-stock"}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedProduct(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedProduct(item);
                        }
                      }}
                    >
                      <div className="produce-illustration">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <h3>{item.name}</h3>
                      <div className="organic-badges">
                        {item.badges.map((badge) => (
                          <span key={badge} className="organic-badge">
                            {badge}
                          </span>
                        ))}
                      </div>
                      <div className="produce-rating" aria-label="4 out of 5 stars">
                        <span className="stars">{stars(4)}</span>
                        <span className="count">(4)</span>
                      </div>
                      <p className="origin">Product of Canada</p>
                      <p className={`organic-stock ${item.inStock ? "in" : "out"}`}>
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                      <p className="price">{item.price}</p>
                      <button
                        type="button"
                        className="cart-btn"
                        disabled={!item.inStock}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaShoppingCart />
                        {item.inStock ? "Add to cart" : "Unavailable"}
                      </button>
                    </article>
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="recipes-empty">
                    No products available right now. Please check back soon.
                  </div>
                )}

                {products.length > 0 && filteredProducts.length === 0 && (
                  <div className="recipes-empty">
                    No products match "{query.trim() || "(blank)"}". Try a different search or tab.
                  </div>
                )}

                <div className="recipes-pagination organic-pagination" aria-label="Pagination controls">
                  <button type="button" className="page-btn" aria-label="Previous page">
                    ←
                  </button>
                  <button type="button" className="page-btn" aria-label="Next page">
                    →
                  </button>
                </div>
              </>
            )}
          </Container>
        </section>
      </div>

      <footer className="footer organic-footer">
        <div className="container footer-container">
          <img src={logo} alt="FreshRoute Logo" className="footer-logo" />
        </div>
      </footer>
    </div>
  );
}
