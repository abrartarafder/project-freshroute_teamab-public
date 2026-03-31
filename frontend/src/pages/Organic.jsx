import { Container, Modal, Button, Form } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import AppNavbar from "../components/navbar.jsx";
import { addItem, makeCartId, useCart } from "../utils/cartStore.js";
import logo from "../assets/logo_clear.png";
import "./Landing.css";
import "./Recipes.css";
import "./Organic.css";

const resolveImageUrl = (raw, fallback) => {
  if (typeof raw === "string" && raw.trim()) {
    const cleaned = raw.replace(/^public\//, "");
    return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  }
  return fallback;
};

const appleImg = "/organic/apple.png";
const avocadoImg = "/organic/avacado.png";
const bananaImg = "/organic/bananas.png";
const bellPepperImg = "/organic/bell peppers.png";
const broccoliImg = "/organic/broccolli.png";
const carrotsImg = "/organic/carrots.png";
const celeryImg = "/organic/celery.png";
const cherryImg = "/organic/cherry.png";
const cucumberImg = "/organic/cucumber.png";
const grapesImg = "/organic/grapes.png";
const mangoImg = "/organic/mango.png";
const onionImg = "/organic/onions.png";
const orangeImg = "/organic/orange.png";
const potatoImg = "/organic/potatoes.png";
const imageByName = new Map(
  [
    ["apple", appleImg],
    ["avocado", avocadoImg],
    ["banana", bananaImg],
    ["bell pepper", bellPepperImg],
    ["broccoli", broccoliImg],
    ["carrots", carrotsImg],
    ["celery", celeryImg],
    ["cherry", cherryImg],
    ["cucumber", cucumberImg],
    ["green grapes", grapesImg],
    ["mango", mangoImg],
    ["orange", orangeImg],
    ["onion", onionImg],
    ["potato", potatoImg],
  ].map(([k, v]) => [k, v])
);

const getImageForName = (name, fallback) => {
  if (typeof name === "string") {
    const found = imageByName.get(name.trim().toLowerCase());
    if (found) return found;
  }
  return fallback;
};

const TAB_KEYS = ["all", "featured", "popular", "new"];
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const priceToNumber = (price) => Number((price.match(/[\d.]+/) ?? [0])[0]);

const formatDbPrice = (price, unit) => {
  if (typeof price !== "number") return "";
  const formatted = Number.isInteger(price) ? price.toFixed(0) : price.toFixed(2);
  return unit ? `$${formatted}/${unit}` : `$${formatted}`;
};

const pickGeneratedTabs = (name = "") => {
  const tabPool = ["featured", "popular", "new"];
  const hash = name
    .split("")
    .reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 1), 0);
  const primaryTab = tabPool[hash % tabPool.length];
  const secondaryTab = tabPool[(hash + 1) % tabPool.length];

  if (hash % 2 === 0) {
    return [primaryTab, secondaryTab, "all"];
  }

  return [primaryTab, "all"];
};

const products = [
  // Produce with images
  {
    name: "Apple",
    price: formatDbPrice(2.5, "lb"),
    image: appleImg,
    tabs: ["featured", "popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Fresh crisp apples sourced from trusted organic farms in Canada.",
  },
  {
    name: "Avocado",
    price: formatDbPrice(1.99, "each"),
    image: avocadoImg,
    tabs: ["featured"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Creamy ripe avocados ideal for salads, toast, and healthy bowls.",
  },
  {
    name: "Banana",
    price: formatDbPrice(3, "lb"),
    image: bananaImg,
    tabs: ["featured", "new"],
    badges: ["Organic"],
    inStock: true,
    description: "Sweet naturally ripened bananas, perfect for smoothies and snacks.",
  },
  {
    name: "Bell Pepper",
    price: formatDbPrice(1, "each"),
    image: bellPepperImg,
    tabs: ["featured"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Crisp colorful peppers with a sweet flavor and high vitamin content.",
  },
  {
    name: "Broccoli",
    price: formatDbPrice(3.5, "each"),
    image: broccoliImg,
    tabs: ["popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Nutrient-dense broccoli crowns, freshly harvested and packed.",
  },
  {
    name: "Carrots",
    price: formatDbPrice(4, "lb"),
    image: carrotsImg,
    tabs: ["popular", "new"],
    badges: ["Organic"],
    inStock: true,
    description: "Crunchy sweet carrots great for cooking, roasting, and raw snacks.",
  },
  {
    name: "Celery",
    price: formatDbPrice(3, "each"),
    image: celeryImg,
    tabs: ["featured", "popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Fresh green celery with crisp texture and clean flavor.",
  },
  {
    name: "Cherry",
    price: formatDbPrice(4, "lb"),
    image: cherryImg,
    tabs: ["new"],
    badges: ["Organic"],
    inStock: true,
    description: "Juicy cherries with balanced sweetness and tart notes.",
  },
  {
    name: "Cucumber",
    price: formatDbPrice(1.5, "each"),
    image: cucumberImg,
    tabs: ["popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Refreshing cucumbers with a crisp bite for salads and sides.",
  },
  {
    name: "Green Grapes",
    price: formatDbPrice(2, "lb"),
    image: grapesImg,
    tabs: ["featured"],
    badges: ["Organic"],
    inStock: true,
    description: "Seedless green grapes that are sweet, juicy, and snack-ready.",
  },
  {
    name: "Mango",
    price: formatDbPrice(4.4, "lb"),
    image: mangoImg,
    tabs: ["new", "popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Tropical mangoes with rich aroma and naturally sweet flavor.",
  },
  {
    name: "Orange",
    price: formatDbPrice(2, "lb"),
    image: orangeImg,
    tabs: ["featured"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Bright oranges packed with juice and vitamin C.",
  },
  {
    name: "Onion",
    price: formatDbPrice(3, "bag"),
    image: onionImg,
    tabs: ["new"],
    badges: ["Organic"],
    inStock: true,
    description: "Flavorful onions suitable for everyday cooking and meal prep.",
  },
  {
    name: "Potato",
    price: formatDbPrice(4.99, "bag"),
    image: potatoImg,
    tabs: ["featured", "popular"],
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Versatile farm-fresh potatoes for roasting, mashing, and baking.",
  },
  // Pantry + others (use mapped image when available, otherwise logo fallback)
  {
    name: "Quinoa",
    price: formatDbPrice(6.99, "bag"),
    image: getImageForName("Quinoa", logo),
    tabs: pickGeneratedTabs("Quinoa"),
    badges: ["Organic"],
    inStock: true,
    description: "Nutty organic quinoa—fluffy, protein-rich, and meal-prep friendly.",
  },
  {
    name: "Black Beans",
    price: formatDbPrice(2.49, "can"),
    image: getImageForName("Black Beans", logo),
    tabs: pickGeneratedTabs("Black Beans"),
    badges: ["Organic"],
    inStock: true,
    description: "Creamy canned black beans packed in a simple, low-sodium brine.",
  },
  {
    name: "Corn",
    price: formatDbPrice(0.75, "each"),
    image: getImageForName("Corn", logo),
    tabs: pickGeneratedTabs("Corn"),
    badges: ["Organic"],
    inStock: true,
    description: "Sweet, crisp ears of corn picked at peak ripeness.",
  },
  {
    name: "Limes",
    price: formatDbPrice(0.79, "each"),
    image: getImageForName("Limes", logo),
    tabs: pickGeneratedTabs("Limes"),
    badges: ["Organic"],
    inStock: true,
    description: "Juicy limes with bright acidity for dressings, tacos, and tea.",
  },
  {
    name: "Kale",
    price: formatDbPrice(3.49, "each"),
    image: getImageForName("Kale", logo),
    tabs: pickGeneratedTabs("Kale"),
    badges: ["Organic"],
    inStock: true,
    description: "Hearty kale bunches—great for sautés, salads, and smoothies.",
  },
  {
    name: "Tomatoes",
    price: formatDbPrice(2.99, "lb"),
    image: getImageForName("Tomatoes", logo),
    tabs: pickGeneratedTabs("Tomatoes"),
    badges: ["Organic"],
    inStock: true,
    description: "Vine-ripened tomatoes with balanced sweetness and acidity.",
  },
  {
    name: "Lemons",
    price: formatDbPrice(0.89, "each"),
    image: getImageForName("Lemons", logo),
    tabs: pickGeneratedTabs("Lemons"),
    badges: ["Organic"],
    inStock: true,
    description: "Fragrant lemons perfect for zesting, marinades, and fresh lemonade.",
  },
  {
    name: "Tofu",
    price: formatDbPrice(3.99, "pack"),
    image: getImageForName("Tofu", logo),
    tabs: pickGeneratedTabs("Tofu"),
    badges: ["Organic", "Non-GMO"],
    inStock: true,
    description: "Firm organic tofu that crisps beautifully and soaks up sauces.",
  },
  {
    name: "Brown Rice",
    price: formatDbPrice(5.49, "bag"),
    image: getImageForName("Brown Rice", logo),
    tabs: pickGeneratedTabs("Brown Rice"),
    badges: ["Organic", "Whole Grain"],
    inStock: true,
    description: "Hearty brown rice with a nutty bite—ideal for bowls and stir-fries.",
  },
  {
    name: "Ginger",
    price: formatDbPrice(3.99, "lb"),
    image: getImageForName("Ginger", logo),
    tabs: pickGeneratedTabs("Ginger"),
    badges: ["Organic"],
    inStock: true,
    description: "Fresh, zesty ginger root for teas, curries, and marinades.",
  },
  {
    name: "Garlic",
    price: formatDbPrice(0.99, "each"),
    image: getImageForName("Garlic", logo),
    tabs: pickGeneratedTabs("Garlic"),
    badges: ["Organic"],
    inStock: true,
    description: "Pungent garlic bulbs with tight cloves and bold flavor.",
  },
  {
    name: "Sesame Seeds",
    price: formatDbPrice(4.99, "pack"),
    image: getImageForName("Sesame Seeds", logo),
    tabs: pickGeneratedTabs("Sesame Seeds"),
    badges: ["Organic"],
    inStock: true,
    description: "Toasty sesame seeds ready to finish bowls, noodles, and salads.",
  },
  {
    name: "Soy Sauce",
    price: formatDbPrice(3.49, "bottle"),
    image: getImageForName("Soy Sauce", logo),
    tabs: pickGeneratedTabs("Soy Sauce"),
    badges: ["Organic"],
    inStock: true,
    description: "Umami-rich soy sauce brewed for balanced salt and depth.",
  },
  {
    name: "Sesame Oil",
    price: formatDbPrice(6.49, "bottle"),
    image: getImageForName("Sesame Oil", logo),
    tabs: pickGeneratedTabs("Sesame Oil"),
    badges: ["Organic"],
    inStock: true,
    description: "Aromatic toasted sesame oil that elevates stir-fries and dressings.",
  },
  {
    name: "Olive Oil",
    price: formatDbPrice(12.99, "bottle"),
    image: getImageForName("Olive Oil", logo),
    tabs: pickGeneratedTabs("Olive Oil"),
    badges: ["Organic", "Cold-Pressed"],
    inStock: true,
    description: "Smooth extra-virgin olive oil with peppery finish for everyday cooking.",
  },
  {
    name: "Dill",
    price: formatDbPrice(2.49, "bunch"),
    image: getImageForName("Dill", logo),
    tabs: pickGeneratedTabs("Dill"),
    badges: ["Organic"],
    inStock: true,
    description: "Fragrant dill fronds that brighten salads, yogurt dips, and fish.",
  },
  {
    name: "Salt",
    price: formatDbPrice(1.99, "pack"),
    image: getImageForName("Salt", logo),
    tabs: pickGeneratedTabs("Salt"),
    badges: ["Organic"],
    inStock: true,
    description: "Mineral-rich fine salt—kitchen staple for seasoning everything.",
  },
  {
    name: "Cumin",
    price: formatDbPrice(3.29, "pack"),
    image: getImageForName("Cumin", logo),
    tabs: pickGeneratedTabs("Cumin"),
    badges: ["Organic"],
    inStock: true,
    description: "Warm, earthy ground cumin for stews, chili, and roasted veggies.",
  },
  {
    name: "Sweet Potatoes",
    price: formatDbPrice(2.49, "lb"),
    image: getImageForName("Sweet Potatoes", logo),
    tabs: pickGeneratedTabs("Sweet Potatoes"),
    badges: ["Organic"],
    inStock: true,
    description: "Naturally sweet orange-flesh potatoes—great for fries or roasting.",
  },
  {
    name: "Chickpeas",
    price: formatDbPrice(2.29, "can"),
    image: getImageForName("Chickpeas", logo),
    tabs: pickGeneratedTabs("Chickpeas"),
    badges: ["Organic"],
    inStock: true,
    description: "Creamy canned chickpeas ready for hummus, curries, and salads.",
  },
  {
    name: "Tahini",
    price: formatDbPrice(7.49, "jar"),
    image: getImageForName("Tahini", logo),
    tabs: pickGeneratedTabs("Tahini"),
    badges: ["Organic"],
    inStock: true,
    description: "Silky sesame tahini ideal for dressings, hummus, and sauces.",
  },
  {
    name: "Whole-wheat Wraps",
    price: formatDbPrice(4.99, "pack"),
    image: getImageForName("Whole-wheat Wraps", logo),
    tabs: pickGeneratedTabs("Whole-wheat Wraps"),
    badges: ["Organic"],
    inStock: true,
    description: "Soft whole-wheat wraps that hold hearty fillings without tearing.",
  },
];

function stars(rating = 4) {
  return Array.from({ length: 5 }).map((_, i) =>
    i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
  );
}

export default function Organic() {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [apiProducts, setApiProducts] = useState([]);
  const [page, setPage] = useState(1);
  const { count } = useCart();

  useEffect(() => {
    let ignore = false;

    async function loadOrganicProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/organic`);
        if (!response.ok) {
          throw new Error(`Organic request failed with ${response.status}`);
        }

        const data = await response.json();
        if (!ignore) {
          setApiProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!ignore) {
          setApiProducts([]);
        }
      }
    }

    loadOrganicProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const mergedProducts = useMemo(() => {
    const dbProductsByName = new Map(
      apiProducts.map((item) => [item.name?.trim().toLowerCase(), item])
    );

    const mergedFromFrontend = products.map((product) => {
      const dbProduct = dbProductsByName.get(product.name.trim().toLowerCase());
      if (!dbProduct) return product;

      return {
        ...product,
        image: resolveImageUrl(dbProduct.imageUrl, getImageForName(product.name, product.image)),
        price: formatDbPrice(dbProduct.price, dbProduct.priceUnit) || product.price,
        inStock: dbProduct.inventory?.available ?? product.inStock,
        stock: dbProduct.inventory?.stock ?? product.stock,
        category: dbProduct.category ?? product.category,
      };
    });

    const frontendNames = new Set(
      products.map((product) => product.name.trim().toLowerCase())
    );

    const dbOnlyProducts = apiProducts
      .filter((item) => !frontendNames.has(item.name?.trim().toLowerCase()))
      .map((item) => ({
        name: item.name,
        price: formatDbPrice(item.price, item.priceUnit),
        image: resolveImageUrl(item.imageUrl, getImageForName(item.name, logo)),
        tabs: pickGeneratedTabs(item.name),
        badges: ["Organic"],
        inStock: item.inventory?.available ?? true,
        description: `${item.name} is available from the FreshRoute organic catalog.`,
        category: item.category ?? "Organic",
        stock: item.inventory?.stock ?? 0,
      }));

    return [...mergedFromFrontend, ...dbOnlyProducts];
  }, [apiProducts]);

  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    let list =
      activeTab && activeTab !== "all"
        ? mergedProducts.filter((p) => p.tabs.includes(activeTab))
        : mergedProducts;

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
  }, [activeTab, mergedProducts, priceFilter, query, sortBy]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setPriceFilter("all");
    setSortBy("none");
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [query, priceFilter, sortBy]);

  const showMemberCard = activeTab === "all" && query.trim() === "";
  const itemsPerPage = 14;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pagedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              {showMemberCard && (
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

              {pagedProducts.map((item) => (
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

            {mergedProducts.length === 0 && (
              <div className="recipes-empty">
                No products available right now. Please check back soon.
              </div>
            )}

            {mergedProducts.length > 0 && filteredProducts.length === 0 && (
              <div className="recipes-empty">
                {query.trim()
                  ? `No products match “${query.trim()}”. Try a different search or tab.`
                  : "No products match the current filters. Try adjusting category, price, or sort."}
              </div>
            )}

            <div className="recipes-pagination organic-pagination" aria-label="Pagination controls">
              <button
                type="button"
                className="page-btn"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                ←
              </button>
              <span className="organic-page-status">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                className="page-btn"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              >
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
