import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    priceUnit: { type: String, required: true },
    currency: { type: String, default: "CAD" },
    category: { type: String, required: true },
    inventory: {
      available: { type: Boolean, default: true },
      stock: { type: Number, default: 0 },
    },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Organic", productSchema, "Organic");