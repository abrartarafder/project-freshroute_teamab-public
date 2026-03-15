import { useEffect, useState } from "react";

const STORAGE_KEY = "fr-cart-v1";
const CART_EVENT = "fr-cart-updated";

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizeCart = (cart) => {
  if (!cart || typeof cart !== "object") return { items: [] };
  if (!Array.isArray(cart.items)) return { items: [] };
  return { items: cart.items };
};

const readCart = () => {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    return normalizeCart(JSON.parse(raw));
  } catch (error) {
    return { items: [] };
  }
};

const writeCart = (cart) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
};

export const makeCartId = (group, name) => `${group}:${slugify(name)}`;

export const getCartCount = (items = []) =>
  items.reduce((sum, item) => {
    if (item.group === "recipe-grocery") return sum;
    return sum + (Number(item.quantity) || 0);
  }, 0);

export const getCartSubtotal = (items = []) =>
  items.reduce(
    (sum, item) => sum + (Number(item.unitPrice) || 0) * (Number(item.quantity) || 0),
    0
  );

export const getCart = () => readCart();

export const addItem = (item, quantity = 1) => {
  if (!item || !item.id) return;
  const cart = readCart();
  const nextQty = Math.max(1, Number(quantity) || 1);
  const existingIndex = cart.items.findIndex((entry) => entry.id === item.id);

  if (existingIndex >= 0) {
    const existing = cart.items[existingIndex];
    cart.items[existingIndex] = {
      ...existing,
      quantity: Math.max(1, (Number(existing.quantity) || 0) + nextQty),
    };
  } else {
    cart.items.push({
      ...item,
      quantity: nextQty,
    });
  }

  writeCart(cart);
};

export const setItemQuantity = (id, quantity) => {
  const cart = readCart();
  const nextQty = Math.max(0, Number(quantity) || 0);
  cart.items = cart.items
    .map((entry) => (entry.id === id ? { ...entry, quantity: nextQty } : entry))
    .filter((entry) => (Number(entry.quantity) || 0) > 0);
  writeCart(cart);
};

export const removeItem = (id) => {
  const cart = readCart();
  cart.items = cart.items.filter((entry) => entry.id !== id);
  writeCart(cart);
};

export const clearCart = () => {
  writeCart({ items: [] });
};

const ingredientBaseWeights = [1.125, 0.4, 0.5, 0.5, 0.35, 0.6];

const cleanIngredient = (value) =>
  value
    .replace(/^[\d/.\s]+/g, "")
    .replace(/,$/, "")
    .trim();

const makeRecipeGroceryId = (recipeTitle, index) =>
  `${makeCartId("recipe-grocery", recipeTitle)}-${index}`;

const buildRecipeGroceries = (recipe, servings) => {
  const baseServings = recipe.servings || 1;
  const quantity = Math.max(1, Number(servings) || 1);
  const scale = quantity / baseServings;

  return (recipe.ingredients ?? []).map((ingredient, index) => {
    const baseWeight = ingredientBaseWeights[index % ingredientBaseWeights.length];
    const weight = Number((baseWeight * scale).toFixed(3));
    const unitPrice = Number((2.4 + index * 0.85).toFixed(2));
    return {
      id: makeRecipeGroceryId(recipe.title, index),
      name: cleanIngredient(ingredient) || ingredient,
      image: recipe.image,
      unitPrice,
      priceLabel: `$${unitPrice}/lb`,
      unitLabel: "lb",
      group: "recipe-grocery",
      quantity: weight,
      meta: {
        parentRecipe: recipe.title,
        ingredientIndex: index,
      },
    };
  });
};

export const addRecipeToCart = (recipe, servings = 1) => {
  if (!recipe?.title) return;
  const quantity = Math.max(1, Number(servings) || 1);
  addItem(
    {
      id: makeCartId("recipe", recipe.title),
      name: recipe.title,
      image: recipe.image,
      unitPrice: Number((recipe.price?.match(/[\d.]+/) ?? [0])[0]),
      priceLabel: recipe.price,
      unitLabel: "serving",
      group: "recipe",
      meta: {
        baseServings: recipe.servings || 1,
        ingredients: recipe.ingredients ?? [],
      },
    },
    quantity
  );

  const groceries = buildRecipeGroceries(recipe, quantity);
  groceries.forEach((item) => addItem(item, item.quantity));
};

export const updateRecipeQuantity = (recipeId, recipeTitle, servings, recipe) => {
  const cart = readCart();
  const nextServings = Math.max(1, Number(servings) || 1);

  cart.items = cart.items
    .map((entry) =>
      entry.id === recipeId ? { ...entry, quantity: nextServings } : entry
    )
    .filter((entry) => entry.group !== "recipe-grocery" || entry.meta?.parentRecipe !== recipeTitle);

  if (recipe) {
    const groceries = buildRecipeGroceries(recipe, nextServings);
    cart.items.push(...groceries);
  }

  writeCart(cart);
};

export const removeRecipeAndGroceries = (recipeTitle, recipeId) => {
  const cart = readCart();
  cart.items = cart.items.filter((entry) => {
    if (entry.group === "recipe" && entry.id === recipeId) return false;
    if (entry.group === "recipe-grocery" && entry.meta?.parentRecipe === recipeTitle) return false;
    return true;
  });
  writeCart(cart);
};

export const useCart = () => {
  const [cart, setCart] = useState(() => readCart());

  useEffect(() => {
    const handleUpdate = () => setCart(readCart());
    window.addEventListener(CART_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(CART_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const items = cart.items ?? [];
  return {
    cart,
    items,
    count: getCartCount(items),
    subtotal: getCartSubtotal(items),
  };
};
