import { Container, Row, Col, Button, Modal, Badge } from "react-bootstrap";
import { useMemo, useState } from "react";
import AppNavbar from "../components/navbar.jsx";
import logo from "../assets/logo_clear.png";
import "./Landing.css";
import "./Recipes.css";

import imgQuinoa from "../assets/recipes/quinoa-peppers.png";
import imgSalmon from "../assets/recipes/salmon-kale.png";
import imgLentil from "../assets/recipes/lentil-stew.png";
import imgTofu from "../assets/recipes/tofu-stirfry.png";
import imgChili from "../assets/recipes/bean-chili.png";
import imgBeef from "../assets/recipes/beef-stirfry.png";
import imgBuddha from "../assets/recipes/buddha-bowl.png";
import imgWrap from "../assets/recipes/med-wrap.png";

const TAB_KEYS = ["featured", "popular", "new", "all"];

const priceToNumber = (price) => Number((price.match(/[\d.]+/) ?? [0])[0]);

const recipes = [
  {
    title: "Quinoa-Stuffed Bell Peppers",
    description:
      "Organic bell peppers stuffed with a mix of quinoa, black beans, corn, and creamy avocado.",
    price: "$6.50/Serving",
    rating: 5,
    tags: ["Vegan", "Gluten Free", "Popular"],
    image: imgQuinoa,
    ingredients: [
      "1 cup cooked quinoa",
      "4 bell peppers, tops removed",
      "1 cup black beans",
      "1/2 cup corn",
      "1 avocado, diced",
      "Lime juice, salt, cumin",
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
      "2 cups chopped kale",
      "1 cup cooked quinoa",
      "Roasted carrots & tomatoes",
      "Olive oil, lemon, dill",
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
      "14 oz firm tofu",
      "2 cups mixed vegetables",
      "2 cups cooked brown rice",
      "Soy sauce, ginger, sesame oil",
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
      "12 oz sliced beef",
      "2 cups mixed vegetables",
      "1 cup cooked brown rice",
      "Soy sauce, garlic, sesame seeds",
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
      "1 cup cooked quinoa",
      "1 cup roasted sweet potato",
      "1 cup roasted broccoli",
      "1 cup roasted chickpeas",
      "Tahini, lemon, garlic",
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
      "Whole-wheat wraps",
      "1 cup cucumber & tomato",
      "1/4 cup feta",
      "Yogurt, dill, lemon",
    ],
    servings: 2,
    categories: ["featured"],
  },
];

export default function Recipes() {
  const [query, setQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [servingsByTitle, setServingsByTitle] = useState(() =>
    Object.fromEntries(recipes.map((r) => [r.title, r.servings]))
  );

  const setServings = (title, value) => {
    setServingsByTitle((prev) => ({
      ...prev,
      [title]: Math.max(1, value),
    }));
  };

  const filteredRecipes = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = recipes.filter((r) =>
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
  }, [activeTab, priceFilter, query, sortBy]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setPriceFilter("all");
    setSortBy("none");
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
              {filteredRecipes.map((recipe) => (
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
                          onClick={(e) => e.stopPropagation()}
                        >
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

            {recipes.length === 0 && (
              <div className="recipes-empty">
                No recipes are available right now. Please check back soon.
              </div>
            )}

            <div className="recipes-pagination">
              <button className="page-btn" aria-label="Previous page">
                ←
              </button>
              <button className="page-btn" aria-label="Next page">
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
              <Modal.Title>
                {selectedRecipe.title}
                <Badge bg="success" className="recipe-servings">
                  {servingsByTitle[selectedRecipe.title] ?? selectedRecipe.servings} servings
                </Badge>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="recipe-modal-grid">
                <div className="recipe-modal-image">
                  <img src={selectedRecipe.image} alt={selectedRecipe.title} />
                </div>
                <div className="recipe-modal-body">
                  <p className="recipe-modal-desc">{selectedRecipe.description}</p>
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
            <Modal.Footer>
              <Button
                className="btn-theme-yellow modal-action"
                onClick={() => setSelectedRecipe(null)}
              >
                Close
              </Button>
              <Button variant="success" className="modal-action">
                Add {servingsByTitle[selectedRecipe.title] ?? selectedRecipe.servings} to cart
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
