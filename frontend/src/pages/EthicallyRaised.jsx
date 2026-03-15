import { Container, Modal, Button } from "react-bootstrap";
import { useMemo, useState } from "react";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import AppNavbar from "../components/navbar.jsx";
import { addItem, makeCartId, useCart } from "../utils/cartStore.js";
import logo from "../assets/logo_clear.png";
import groundBeefImg from "../assets/ethicallyraised/groundbeef.png";
import ribsImg from "../assets/ethicallyraised/ribs.png";
import sirloinSteakImg from "../assets/ethicallyraised/sirloinSteak.png";
import chuckSteakImg from "../assets/ethicallyraised/chuckSteak.png";
import chickenBreastImg from "../assets/ethicallyraised/chickenbreast.png";
import wingImg from "../assets/ethicallyraised/wing.png";
import chickenThighImg from "../assets/ethicallyraised/chickenthigh.png";
import drumsticksImg from "../assets/ethicallyraised/chickendrumsticks.png";
import wholeChickenImg from "../assets/ethicallyraised/wholechicken.png";
import salmonImg from "../assets/ethicallyraised/salmon.png";
import codImg from "../assets/ethicallyraised/cod.png";
import tunaImg from "../assets/ethicallyraised/tuna.png";
import lobsterImg from "../assets/ethicallyraised/lobster.png";
import shrimpImg from "../assets/ethicallyraised/shrimp.png";
import "./Landing.css";
import "./Recipes.css";
import "./Organic.css";

const TAB_KEYS = ["featured", "popular", "new", "all"];
const priceToNumber = (price) => Number((price.match(/[\d.]+/) ?? [0])[0]);

const proteins = [
  {
    name: "Ground Beef (80/20)",
    price: "$6.50/lb",
    image: groundBeefImg,
    tabs: ["featured", "popular"],
    badges: ["Ethically Raised", "Hormone-Free"],
    inStock: true,
    description: "Ground beef sourced from responsibly raised cattle.",
  },
  {
    name: "Beef Ribs",
    price: "$8.00/lb",
    image: ribsImg,
    tabs: ["featured", "new"],
    badges: ["Ethically Raised", "Antibiotic-Free"],
    inStock: true,
    description: "Meaty ribs from trusted farms focused on animal welfare.",
  },
  {
    name: "Sirloin Steak",
    price: "$10.00/lb",
    image: sirloinSteakImg,
    tabs: ["featured", "popular"],
    badges: ["Ethically Raised", "Grass-Fed"],
    inStock: true,
    description: "Lean sirloin cuts with bold flavor and tender texture.",
  },
  {
    name: "Chuck Steak",
    price: "$7.50/lb",
    image: chuckSteakImg,
    tabs: ["featured"],
    badges: ["Ethically Raised", "Hormone-Free"],
    inStock: false,
    description: "Rich chuck steak ideal for braising and slow-cooked meals.",
  },
  {
    name: "Chicken Breast",
    price: "$4.50/lb",
    image: chickenBreastImg,
    tabs: ["featured", "popular"],
    badges: ["Ethically Raised", "Free-Range"],
    inStock: true,
    description: "Boneless chicken breast raised with high welfare standards.",
  },
  {
    name: "Chicken Wings",
    price: "$6.99/lb",
    image: wingImg,
    tabs: ["featured", "new"],
    badges: ["Ethically Raised", "Free-Range"],
    inStock: true,
    description: "Flavorful wings from free-range ethically raised chicken.",
  },
  {
    name: "Chicken Thighs",
    price: "$4.99/lb",
    image: chickenThighImg,
    tabs: ["featured", "popular"],
    badges: ["Ethically Raised", "Antibiotic-Free"],
    inStock: true,
    description: "Juicy chicken thighs perfect for grilling and roasting.",
  },
  {
    name: "Chicken Drumsticks",
    price: "$3.50/lb",
    image: drumsticksImg,
    tabs: ["featured", "popular"],
    badges: ["Ethically Raised", "Free-Range"],
    inStock: true,
    description: "Affordable drumsticks sourced from humane poultry farms.",
  },
  {
    name: "Whole Chicken",
    price: "$3.99/lb",
    image: wholeChickenImg,
    tabs: ["featured", "new"],
    badges: ["Ethically Raised", "Free-Range"],
    inStock: true,
    description: "Whole bird raised responsibly for family-style meals.",
  },
  {
    name: "Atlantic Salmon",
    price: "$10.00/lb",
    image: salmonImg,
    tabs: ["featured", "popular"],
    badges: ["Ethically Raised", "Sustainably Sourced"],
    inStock: true,
    description: "Atlantic salmon fillets from responsible fisheries.",
  },
  {
    name: "Cod",
    price: "$9.00/lb",
    image: codImg,
    tabs: ["featured", "new"],
    badges: ["Ethically Raised", "Sustainably Sourced"],
    inStock: true,
    description: "Mild cod fillets caught with low-impact sourcing methods.",
  },
  {
    name: "Tuna",
    price: "$12.00/lb",
    image: tunaImg,
    tabs: ["featured", "popular"],
    badges: ["Ethically Raised", "Sustainably Sourced"],
    inStock: false,
    description: "Premium tuna cuts from traceable sustainable suppliers.",
  },
  {
    name: "Lobster",
    price: "$15.00/lb",
    image: lobsterImg,
    tabs: ["featured", "new"],
    badges: ["Ethically Raised", "Sustainably Sourced"],
    inStock: true,
    description: "Fresh lobster selected from responsible seafood harvesters.",
  },
  {
    name: "Shrimp",
    price: "$9.00/lb",
    image: shrimpImg,
    tabs: ["featured", "popular"],
    badges: ["Ethically Raised", "Sustainably Sourced"],
    inStock: true,
    description: "Traceable shrimp sourced from ethical, low-impact producers.",
  },
];

function stars(rating = 4) {
  return Array.from({ length: 5 }).map((_, i) =>
    i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
  );
}

export default function EthicallyRaised() {
  const [activeTab, setActiveTab] = useState("featured");
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { count } = useCart();

  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    let list =
      activeTab && activeTab !== "all"
        ? proteins.filter((p) => p.tabs.includes(activeTab))
        : proteins;

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

  const handleAddToCart = (item) => {
    addItem({
      id: makeCartId("ethical", item.name),
      name: item.name,
      image: item.image,
      unitPrice: priceToNumber(item.price),
      priceLabel: item.price,
      unitLabel: item.price.includes("/lb") ? "lb" : "item",
      group: "regular",
      meta: {
        source: "Ethically Raised",
      },
    });
  };

  return (
    <div className="page-shell organic-shell">
      <div className="page-main">
        <AppNavbar
          userName="John"
          activeKey="ethically"
          cartCount={count}
          onSearch={(value) => setQuery(value)}
          searchPlaceholder="Search Ethically Raised Products"
        />

        <section className="recipes-hero">
          <Container className="recipes-hero-container">
            <div className="recipes-hero-eyebrow">Ethically Raised</div>
            <h1 className="recipes-hero-title">Products</h1>
            <div className="recipes-tabs" role="tablist" aria-label="Protein filters">
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
                  <label htmlFor="ethical-price-filter" className="control-label">
                    Price
                  </label>
                  <select
                    id="ethical-price-filter"
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
                  <label htmlFor="ethical-sort" className="control-label">
                    Sort
                  </label>
                  <select
                    id="ethical-sort"
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
                  <label htmlFor="member-email-ethical">Email address*</label>
                  <input id="member-email-ethical" type="email" placeholder="johndoe@gmail.com" />
                  <label htmlFor="member-password-ethical">Password*</label>
                  <input id="member-password-ethical" type="password" placeholder="Maximum 8 characters" />
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

            {proteins.length === 0 && (
              <div className="recipes-empty">
                No products available right now. Please check back soon.
              </div>
            )}

            {proteins.length > 0 && filteredProducts.length === 0 && (
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
          onHide={() => setSelectedProduct(null)}
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
                    <div className="recipe-actions">
                      <Button
                        variant="outline-success"
                        className="recipe-cta ghost modal-action"
                        onClick={() => setSelectedProduct(null)}
                      >
                        Close
                      </Button>
                      <Button
                        variant="success"
                        className="recipe-cta modal-action"
                        disabled={!selectedProduct.inStock}
                        onClick={() => handleAddToCart(selectedProduct)}
                      >
                        Add to cart
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
