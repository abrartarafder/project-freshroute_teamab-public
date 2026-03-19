import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    productId: { type: String, default: "" },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    ingredients: [ingredientSchema],
    prepTimeMinutes: { type: Number, default: 0 },
    servings: { type: Number, default: 1 },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema, "Recipes");