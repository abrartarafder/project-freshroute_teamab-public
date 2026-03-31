import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import AppNavbar from "../components/navbar.jsx";
import { addRecipeToCart, useCart } from "../utils/cartStore.js";
import logo from "../assets/logo_clear.png";
import "./Landing.css";
import "./Recipes.css";

const resolveImageUrl = (raw, fallback) => {
  if (typeof raw === "string" && raw.trim()) {
    const cleaned = raw.replace(/^public\//, "");
    return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  }
  return fallback;
};

const imgQuinoa = "/recipes/quinoa-peppers.png";
const imgSalmon = "/recipes/salmon-kale.png";
const imgLentil = "/recipes/lentil-stew.png";
const imgTofu = "/recipes/tofu-stirfry.png";
const imgChili = "/recipes/bean-chili.png";
const imgBeef = "/recipes/beef-stirfry.png";
const imgBuddha = "/recipes/buddha-bowl.png";
const imgWrap = "/recipes/med-wrap.png";
const imageByName = new Map(
  [
    ["quinoa-stuffed bell peppers", imgQuinoa],
    ["baked salmon with kale & quinoa salad", imgSalmon],
    ["lentil & vegetable stew", imgLentil],
    ["tofu stir-fry with brown rice & veggies", imgTofu],
    ["vegetable & black bean chili", imgChili],
    ["grass-fed beef & vegetable stir-fry", imgBeef],
    ["roasted veggie buddha bowl", imgBuddha],
    ["mediterranean chickpea wrap", imgWrap],
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

const formatServingPrice = (price) => {
  if (typeof price !== "number") return "";
  const formatted = Number.isInteger(price) ? price.toFixed(0) : price.toFixed(2);
  return `$${formatted}/Serving`;
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

const seedRecipes = [
  {
    title: "Quinoa-Stuffed Bell Peppers",
    description:
      "Organic bell peppers stuffed with a mix of quinoa, black beans, corn, and creamy avocado.",
    price: "$6.50/Serving",
    rating: 5,
    tags: ["Vegan", "Gluten Free", "Popular"],
    image: imgQuinoa,
    ingredients: [
      "1 cup quinoa",
      "4 bell peppers",
      "1 cup black beans",
      "1/2 cup corn",
      "1 avocado",
      "1 lime",
      "1 tsp salt",
      "1 tsp cumin",
    ],
    ingredientDetails: [
      { productName: "Quinoa", quantity: 1, unit: "cup" },
      { productName: "Bell Pepper", quantity: 4, unit: "each" },
      { productName: "Black Beans", quantity: 1, unit: "cup" },
      { productName: "Corn", quantity: 0.5, unit: "cup" },
      { productName: "Avocado", quantity: 1, unit: "each" },
      { productName: "Limes", quantity: 1, unit: "each" },
      { productName: "Salt", quantity: 1, unit: "tsp" },
      { productName: "Cumin", quantity: 1, unit: "tsp" },
    ],
    servings: 2,
    categories: ["featured", "popular"],
  },
  {
    title: "Baked Salmon with Kale & Quinoa Salad",
    description:
      "Wild-caught salmon paired with kale, quinoa, and roasted vegetables. Omega-3 rich and satisfying.",
    price: "$7.00/Serving",
    rating: 5,
    tags: ["Omega-3", "High Protein", "New"],
    image: imgSalmon,
    ingredients: [
      "2 salmon fillets",
      "2 cups kale",
      "1 cup quinoa",
      "1 cup carrots",
      "1 cup tomatoes",
      "1 tbsp olive oil",
      "1 lemon",
      "1 tbsp dill",
    ],
    ingredientDetails: [
      { productName: "Atlantic Salmon", quantity: 2, unit: "fillet" },
      { productName: "Kale", quantity: 2, unit: "cup" },
      { productName: "Quinoa", quantity: 1, unit: "cup" },
      { productName: "Carrots", quantity: 1, unit: "cup" },
      { productName: "Tomatoes", quantity: 1, unit: "cup" },
      { productName: "Olive Oil", quantity: 1, unit: "tbsp" },
      { productName: "Lemons", quantity: 1, unit: "each" },
      { productName: "Dill", quantity: 1, unit: "tbsp" },
    ],
    servings: 2,
    categories: ["featured", "new"],
  },
  {
    title: "Lentil & Vegetable Stew",
    description:
      "Hearty stew made with organic lentils, root vegetables, and rich vegetable broth.",
    price: "$3.50/Serving",
    rating: 4,
    tags: ["Fiber", "Plant Protein", "Popular"],
    image: imgLentil,
    ingredients: [
      "1 cup dry lentils",
      "1 onion, 2 carrots, 2 celery stalks",
      "2 cups vegetable broth",
      "Tomato paste, garlic, thyme",
    ],
    servings: 4,
    categories: ["popular"],
  },
  {
    title: "Tofu Stir-Fry with Brown Rice & Veggies",
    description:
      "Stir-fried tofu with bell peppers, carrots, broccoli, and snow peas served over brown rice.",
    price: "$5.20/Serving",
    rating: 4,
    tags: ["Vegan", "High Protein"],
    image: imgTofu,
    ingredients: [
      "14 oz tofu",
      "1 bell pepper",
      "1 cup carrots",
      "1 cup broccoli",
      "2 cups brown rice",
      "2 tbsp soy sauce",
      "1 tbsp ginger",
      "1 tbsp sesame oil",
    ],
    ingredientDetails: [
      { productName: "Tofu", quantity: 14, unit: "oz" },
      { productName: "Bell Pepper", quantity: 1, unit: "each" },
      { productName: "Carrots", quantity: 1, unit: "cup" },
      { productName: "Broccoli", quantity: 1, unit: "cup" },
      { productName: "Brown Rice", quantity: 2, unit: "cup" },
      { productName: "Soy Sauce", quantity: 2, unit: "tbsp" },
      { productName: "Ginger", quantity: 1, unit: "tbsp" },
      { productName: "Sesame Oil", quantity: 1, unit: "tbsp" },
    ],
    servings: 3,
    categories: ["featured"],
  },
  {
    title: "Vegetable & Black Bean Chili",
    description:
      "Slow-simmered chili with black beans, tomatoes, bell peppers, and spices. Cozy and filling.",
    price: "$3.80/Serving",
    rating: 4,
    tags: ["Gluten Free", "Dairy Free", "New"],
    image: imgChili,
    ingredients: [
      "2 cups black beans",
      "1 bell pepper, 1 onion",
      "1 can crushed tomatoes",
      "Chili powder, cumin, paprika",
    ],
    servings: 4,
    categories: ["new"],
  },
  {
    title: "Grass-Fed Beef & Vegetable Stir-Fry",
    description:
      "Grass-fed beef with organic veggies and snap peas, served with brown rice or cauliflower rice.",
    price: "$7.50/Serving",
    rating: 5,
    tags: ["Grass-Fed", "Iron Rich", "New", "Popular"],
    image: imgBeef,
    ingredients: [
      "12 oz ground beef (80/20)",
      "1 bell pepper",
      "1 cup broccoli",
      "1 cup carrots",
      "1 cup brown rice",
      "2 tbsp soy sauce",
      "2 cloves garlic",
      "1 tbsp sesame seeds",
    ],
    ingredientDetails: [
      { productName: "Ground Beef (80/20)", quantity: 12, unit: "oz" },
      { productName: "Bell Pepper", quantity: 1, unit: "each" },
      { productName: "Broccoli", quantity: 1, unit: "cup" },
      { productName: "Carrots", quantity: 1, unit: "cup" },
      { productName: "Brown Rice", quantity: 1, unit: "cup" },
      { productName: "Soy Sauce", quantity: 2, unit: "tbsp" },
      { productName: "Garlic", quantity: 2, unit: "clove" },
      { productName: "Sesame Seeds", quantity: 1, unit: "tbsp" },
    ],
    servings: 2,
    categories: ["popular", "new", "featured"],
  },
  {
    title: "Roasted Veggie Buddha Bowl",
    description:
      "Roasted sweet potato, broccoli, and chickpeas over quinoa with tahini drizzle.",
    price: "$5.40/Serving",
    rating: 4,
    tags: ["Vegan", "Gluten Free"],
    image: imgBuddha,
    ingredients: [
      "1 cup quinoa",
      "1 cup sweet potatoes",
      "1 cup broccoli",
      "1 cup chickpeas",
      "2 tbsp tahini",
      "1 lemon",
      "2 cloves garlic",
    ],
    ingredientDetails: [
      { productName: "Quinoa", quantity: 1, unit: "cup" },
      { productName: "Sweet Potatoes", quantity: 1, unit: "cup" },
      { productName: "Broccoli", quantity: 1, unit: "cup" },
      { productName: "Chickpeas", quantity: 1, unit: "cup" },
      { productName: "Tahini", quantity: 2, unit: "tbsp" },
      { productName: "Lemons", quantity: 1, unit: "each" },
      { productName: "Garlic", quantity: 2, unit: "clove" },
    ],
    servings: 3,
    categories: ["featured"],
  },
  {
    title: "Mediterranean Chickpea Wrap",
    description:
      "Whole-wheat wrap with herbed chickpeas, cucumbers, tomatoes, and feta yogurt sauce.",
    price: "$4.60/Serving",
    rating: 4,
    tags: ["High Fiber", "Vegetarian"],
    image: imgWrap,
    ingredients: [
      "1 cup chickpeas",
      "2 whole-wheat wraps",
      "1 cucumber",
      "1 cup tomatoes",
      "1 tbsp dill",
      "1 lemon",
    ],
    ingredientDetails: [
      { productName: "Chickpeas", quantity: 1, unit: "cup" },
      { productName: "Whole-wheat Wraps", quantity: 2, unit: "each" },
      { productName: "Cucumber", quantity: 1, unit: "each" },
      { productName: "Tomatoes", quantity: 1, unit: "cup" },
      { productName: "Dill", quantity: 1, unit: "tbsp" },
      { productName: "Lemons", quantity: 1, unit: "each" },
    ],
    servings: 2,
    categories: ["featured"],
  },
];

export default function Recipes() {
  const [query, setQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [apiRecipes, setApiRecipes] = useState([]);
  const { count } = useCart();
  const [page, setPage] = useState(1);
  const [servingsByTitle, setServingsByTitle] = useState(() =>
    Object.fromEntries(seedRecipes.map((r) => [r.title, r.servings]))
  );

  useEffect(() => {
    let ignore = false;

    async function loadRecipes() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/recipes`);
        if (!response.ok) {
          throw new Error(`Recipes request failed with ${response.status}`);
        }

        const data = await response.json();
        if (!ignore) {
          setApiRecipes(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!ignore) {
          setApiRecipes([]);
        }
      }
    }

    loadRecipes();

    return () => {
      ignore = true;
    };
  }, []);

  const mapDbRecipe = (item) => {
    const ingredientsArray = Array.isArray(item.ingredients) ? item.ingredients : [];
    const ingredientDetails = ingredientsArray.map((ingredient) => ({
      productName: ingredient.productName || ingredient.name || "Ingredient",
      quantity: ingredient.quantity ?? 1,
      unit: ingredient.unit || "",
    }));

    const tags = Array.isArray(item.tags)
      ? item.tags
      : item.tags
        ? [item.tags]
        : [item.prepTimeMinutes ? `${item.prepTimeMinutes} min prep` : "Chef's pick"];

    const ingredients = ingredientDetails.map((ingredient) => {
      const qty = ingredient.quantity ?? "";
      const unit = ingredient.unit ? ` ${ingredient.unit}` : "";
      return `${qty}${unit} ${ingredient.productName}`.trim();
    });

    return {
      title: item.name || "Recipe",
      description: item.description || "Recipe details are coming soon.",
      price: typeof item.price === "number" ? formatServingPrice(item.price) : "$0.00/Serving",
      rating: 4,
      tags,
      image: resolveImageUrl(item.imageUrl, getImageForName(item.name, logo)),
      ingredients: ingredients.length ? ingredients : ingredientsArray,
      ingredientDetails,
      servings: item.servings || 1,
      categories:
        Array.isArray(item.categories) && item.categories.length
          ? item.categories
          : pickGeneratedTabs(item.name || "recipe"),
    };
  };

  const mergedRecipes = useMemo(() => {
    const dbRecipesByName = new Map(
      apiRecipes.map((item) => [item.name?.trim().toLowerCase(), item])
    );

    const mergedFromFrontend = seedRecipes.map((recipe) => {
      const dbRecipe = dbRecipesByName.get(recipe.title.trim().toLowerCase());
      if (!dbRecipe) return recipe;

      const mapped = mapDbRecipe(dbRecipe);
      return {
        ...recipe,
        ...mapped,
        title: mapped.title || recipe.title,
        price: mapped.price || recipe.price,
        description: mapped.description || recipe.description,
        ingredients: mapped.ingredients?.length ? mapped.ingredients : recipe.ingredients,
        ingredientDetails: mapped.ingredientDetails?.length
          ? mapped.ingredientDetails
          : recipe.ingredientDetails,
        servings: mapped.servings || recipe.servings,
        categories: mapped.categories?.length ? mapped.categories : recipe.categories,
        tags: mapped.tags?.length ? mapped.tags : recipe.tags,
        image: mapped.image || recipe.image,
        rating: mapped.rating || recipe.rating,
      };
    });

    const frontendTitles = new Set(seedRecipes.map((r) => r.title.trim().toLowerCase()));

    const dbOnlyRecipes = apiRecipes
      .filter((item) => !frontendTitles.has(item.name?.trim().toLowerCase()))
      .map((item) => mapDbRecipe(item));

    return [...mergedFromFrontend, ...dbOnlyRecipes];
  }, [apiRecipes]);

  useEffect(() => {
    setServingsByTitle((prev) => {
      const next = { ...prev };
      mergedRecipes.forEach((recipe) => {
        if (next[recipe.title] == null) {
          next[recipe.title] = recipe.servings || 1;
        }
      });
      return next;
    });
  }, [mergedRecipes]);

  const setServings = (title, value) => {
    setServingsByTitle((prev) => ({
      ...prev,
      [title]: Math.max(1, value),
    }));
  };

  const filteredRecipes = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = mergedRecipes.filter((r) =>
      activeTab && activeTab !== "all" ? r.categories?.includes(activeTab) : true
    );

    if (priceFilter !== "all") {
      list = list.filter((r) => {
        const price = priceToNumber(r.price);
        if (priceFilter === "under5") return price < 5;
        if (priceFilter === "5to65") return price >= 5 && price <= 6.5;
        if (priceFilter === "over65") return price > 6.5;
        return true;
      });
    }

    if (q) {
      list = list.filter((r) => {
        const haystack = [r.title, r.description, r.price, ...(r.tags ?? [])]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
    } else if (sortBy === "alpha") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [activeTab, mergedRecipes, priceFilter, query, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, query, priceFilter, sortBy]);

  const itemsPerPage = 14;
  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pagedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setPriceFilter("all");
    setSortBy("none");
    setPage(1);
  };

  const renderTabLabel = (tab) => {
    if (tab === "featured") return "Featured";
    if (tab === "popular") return "Popular";
    if (tab === "new") return "New";
    return "All";
  };

  return (
    <div className="page-shell recipes-shell">
      <div className="page-main">
        <AppNavbar
          userName="John"
          activeKey="recipes"
          cartCount={count}
          onSearch={(q) => setQuery(q)}
          searchPlaceholder="Search Recipes"
        />

        <section className="recipes-hero">
          <Container className="recipes-hero-container">
            <div className="recipes-hero-eyebrow">Recipes</div>
            <h1 className="recipes-hero-title">Meals Ready To Go</h1>
            {query.trim() && (
              <div className="recipes-results">
                Showing {filteredRecipes.length} result
                {filteredRecipes.length === 1 ? "" : "s"} for “{query.trim()}”
              </div>
            )}
            <div
              className="recipes-tabs"
              role="tablist"
              aria-label="Recipe category tabs"
            >
              {TAB_KEYS.map((tab) => {
                const label = renderTabLabel(tab);
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    id={`tab-${tab}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab}`}
                    tabIndex={isActive ? 0 : -1}
                    className={`recipes-tab ${isActive ? "active" : ""}`}
                    onClick={() => handleTabSwitch(tab)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        const dir = e.key === "ArrowRight" ? 1 : -1;
                        const currentIdx = TAB_KEYS.indexOf(activeTab);
                        const nextIdx =
                          (currentIdx + dir + TAB_KEYS.length) % TAB_KEYS.length;
                        handleTabSwitch(TAB_KEYS[nextIdx]);
                      }
                    }}
                  >
                    {label}
                  </button>
                );
              })}
              <div
                className="recipes-inline-controls"
                role="region"
                aria-label="Filter and sort recipes"
              >
                <div className="recipes-control">
                  <label htmlFor="price-filter" className="control-label">
                    Price
                  </label>
                  <select
                    id="price-filter"
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
                  <label htmlFor="sort-recipes" className="control-label">
                    Sort
                  </label>
                  <select
                    id="sort-recipes"
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

        <section
          className="recipes-grid-section"
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          <Container className="recipes-grid-container">
            <Row className="g-4">
              {pagedRecipes.map((recipe) => (
                <Col key={recipe.title} lg={4} md={6} sm={12}>
                  <article
                    className="recipe-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRecipe(recipe)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedRecipe(recipe);
                      }
                    }}
                  >
                    <div className="recipe-img-wrap">
                      <img src={recipe.image} alt={recipe.title} />
                    </div>
                    <div className="recipe-body">
                      <h3 className="recipe-title">{recipe.title}</h3>
                      <p className="recipe-desc">{recipe.description}</p>
                      <div className="recipe-meta">
                        <span className="recipe-price">{recipe.price}</span>
                        <div className="recipe-rating" aria-label={`${recipe.rating} stars`}>
                          {"★".repeat(recipe.rating)}
                          {"☆".repeat(5 - recipe.rating)}
                        </div>
                      </div>
                      <div className="recipe-tags">
                        {recipe.tags.map((tag) => (
                          <span key={tag} className="recipe-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="recipe-actions">
                        <Button
                          variant="outline-success"
                          className="recipe-cta ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecipe(recipe);
                          }}
                        >
                          View details
                        </Button>
                        <Button
                          variant="success"
                          className="recipe-cta"
                          onClick={(e) => {
                            e.stopPropagation();
                            addRecipeToCart(
                              recipe,
                              servingsByTitle[recipe.title] ?? recipe.servings
                            );
                          }}
                        >
                          <FaShoppingCart aria-hidden="true" />
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </article>
                </Col>
              ))}
            </Row>

            {filteredRecipes.length === 0 && (
              <div className="recipes-empty">
                {query.trim()
                  ? `No recipes match “${query.trim()}”. Try a different search or clear filters.`
                  : "No recipes match the current filters. Try adjusting category, price, or sort."}
              </div>
            )}

            {mergedRecipes.length === 0 && (
              <div className="recipes-empty">
                No recipes are available right now. Please check back soon.
              </div>
            )}

            <div className="recipes-pagination">
              <button
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
      </div>

      <footer className="footer">
        <div className="container footer-container">
          <img src={logo} alt="FreshRoute Logo" className="footer-logo" />
        </div>
      </footer>

      <Modal
        show={Boolean(selectedRecipe)}
        onHide={() => setSelectedRecipe(null)}
        centered
        size="lg"
        className="recipe-modal"
      >
        {selectedRecipe && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedRecipe.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="recipe-modal-grid">
                <div className="recipe-modal-image">
                  <img src={selectedRecipe.image} alt={selectedRecipe.title} />
                  <p className="recipe-modal-desc">{selectedRecipe.description}</p>
                </div>
                <div className="recipe-modal-body">
                  <h5>Ingredients</h5>
                  <ul className="recipe-modal-list">
                    {selectedRecipe.ingredients.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="recipe-modal-note">
                    Default serving size is {selectedRecipe.servings}. Adjust quantities to scale up or down.
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="recipe-modal-footer">
              <div className="modal-actions">
                <div className="servings-control" aria-label="Adjust servings">
                  <span className="servings-label">Servings</span>
                  <div className="servings-stepper">
                    <button
                      type="button"
                      aria-label="Decrease servings"
                      onClick={() =>
                        setServings(
                          selectedRecipe.title,
                          (servingsByTitle[selectedRecipe.title] ?? selectedRecipe.servings) - 1
                        )
                      }
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={servingsByTitle[selectedRecipe.title] ?? selectedRecipe.servings}
                      onChange={(e) =>
                        setServings(selectedRecipe.title, Number(e.target.value) || 1)
                      }
                      aria-label="Servings count"
                    />
                    <button
                      type="button"
                      aria-label="Increase servings"
                      onClick={() =>
                        setServings(
                          selectedRecipe.title,
                          (servingsByTitle[selectedRecipe.title] ?? selectedRecipe.servings) + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  variant="success"
                  className="recipe-cta modal-action"
                  onClick={() =>
                    addRecipeToCart(
                      selectedRecipe,
                      servingsByTitle[selectedRecipe.title] ?? selectedRecipe.servings
                    )
                  }
                >
                  <FaShoppingCart style={{ marginRight: 6 }} />
                  Add {servingsByTitle[selectedRecipe.title] ?? selectedRecipe.servings} to cart
                </Button>
              </div>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
