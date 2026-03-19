import Recipe from "../models/Recipe.js";

export async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find().sort({ name: 1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}