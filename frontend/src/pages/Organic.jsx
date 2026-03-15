import { Container, Modal, Button, Form } from "react-bootstrap";
import { useMemo, useState } from "react";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import AppNavbar from "../components/navbar.jsx";
import { addItem, makeCartId, useCart } from "../utils/cartStore.js";
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

const TAB_KEYS = ["featured", "popular", "new", "all"];
const priceToNumber = (price) => Number((price.match(/[\d.]+/) ?? [0])[0]);

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
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const { count } = useCart();

  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    let list =
      activeTab && activeTab !== "all"
        ? products.filter((p) => p.tabs.includes(activeTab))
        : products;

    if (priceFilter !== "all") {
      list = list.filter((p) => {
        const price = priceToNumber(p.price);
        if (priceFilter === "under5") return price < 5;
        if (priceFilter === "5to65") return price >= 5 && price <= 6.5;
        if (priceFilter === "over65") return price > 6.5;
        return true;
      });
    }

    if (trimmed) {
      list = list.filter((p) =>
        [p.name, p.description, p.price, ...(p.badges ?? [])].join(" ").toLowerCase().includes(trimmed)
      );
    }

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
    } else if (sortBy === "alpha") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [activeTab, priceFilter, query, sortBy]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setPriceFilter("all");
    setSortBy("none");
  };

  const handleAddToCart = (item, quantity = 1) => {
    addItem({
      id: makeCartId("organic", item.name),
      name: item.name,
      image: item.image,
      unitPrice: priceToNumber(item.price),
      priceLabel: item.price,
      unitLabel: item.price.includes("/lb") ? "lb" : "item",
      group: "regular",
      meta: {
        source: "Organic",
      },
    }, quantity);
  };

  return (
    <div className="page-shell organic-shell">
      <div className="page-main">
        <AppNavbar
          userName="John"
          activeKey="organic"
          cartCount={count}
          onSearch={(value) => setQuery(value)}
          searchPlaceholder="Search Organic Produce"
        />

        <section className="recipes-hero">
          <Container className="recipes-hero-container">
            <div className="recipes-hero-eyebrow">Organic</div>
            <h1 className="recipes-hero-title">Produce</h1>
            <div className="recipes-tabs" role="tablist" aria-label="Produce filters">
              {TAB_KEYS.map((tab) => {
                const label = tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1);
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    className={`recipes-tab ${isActive ? "active" : ""}`}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTabSwitch(tab)}
                  >
                    {label}
                  </button>
                );
              })}
              <div
                className="recipes-inline-controls"
                role="region"
                aria-label="Filter and sort products"
              >
                <div className="recipes-control">
                  <label htmlFor="organic-price-filter" className="control-label">
                    Price
                  </label>
                  <select
                    id="organic-price-filter"
                    className="recipes-select"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="under5">Under $5.00</option>
                    <option value="5to65">$5.00 – $6.50</option>
                    <option value="over65">Over $6.50</option>
                  </select>
                </div>
                <div className="recipes-control">
                  <label htmlFor="organic-sort" className="control-label">
                    Sort
                  </label>
                  <select
                    id="organic-sort"
                    className="recipes-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="none">Relevance</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="alpha">Name: A → Z</option>
                  </select>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="organic-content">
          <Container className="organic-container">
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
                  <input id="member-password" type="password" placeholder="Maximum 8 characters" />
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
                  <div className="produce-actions">
                    <button
                      type="button"
                      className="recipe-cta ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(item);
                        setModalQty(1);
                      }}
                    >
                      View details
                    </button>
                    <button
                      type="button"
                      className="cart-btn"
                      disabled={!item.inStock}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      <FaShoppingCart />
                      {item.inStock ? "Add to cart" : "Unavailable"}
                    </button>
                  </div>
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
                {query.trim()
                  ? `No products match “${query.trim()}”. Try a different search or tab.`
                  : "No products match the current filters. Try adjusting category, price, or sort."}
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
          </Container>
        </section>

        <Modal
          show={Boolean(selectedProduct)}
          onHide={() => {
            setSelectedProduct(null);
            setModalQty(1);
          }}
          centered
          size="lg"
          className="recipe-modal"
        >
          {selectedProduct && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedProduct.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="recipe-modal-grid">
                  <div className="recipe-modal-image">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                  </div>
                  <div className="recipe-modal-body">
                    <p className="recipe-modal-desc">
                      {selectedProduct.description || "Product details are coming soon."}
                    </p>
                    <div className="recipe-tags">
                      {selectedProduct.badges.map((badge) => (
                        <span key={badge} className="recipe-tag">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <p className="recipe-price" style={{ marginTop: 10 }}>{selectedProduct.price}</p>
                    <p className={`organic-stock ${selectedProduct.inStock ? "in" : "out"}`}>
                      {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                    <div className="recipe-actions modal-actions">
                      <Form.Select
                        aria-label="Quantity"
                        className="modal-qty-select"
                        value={modalQty}
                        onChange={(e) => setModalQty(Number(e.target.value) || 1)}
                        style={{ maxWidth: 140 }}
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "item" : "items"}
                          </option>
                        ))}
                      </Form.Select>
                      <Button
                        variant="success"
                        className="recipe-cta modal-action"
                        disabled={!selectedProduct.inStock}
                        onClick={() => handleAddToCart(selectedProduct, modalQty)}
                      >
                        <FaShoppingCart aria-hidden="true" />
                        Add {modalQty} to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </>
          )}
        </Modal>
      </div>

      <footer className="footer organic-footer">
        <div className="container footer-container">
          <img src={logo} alt="FreshRoute Logo" className="footer-logo" />
        </div>
      </footer>
    </div>
  );
}
