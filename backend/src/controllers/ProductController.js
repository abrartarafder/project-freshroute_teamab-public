import Product from "../models/Product.js";

export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getProducts(req, res) {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
}
