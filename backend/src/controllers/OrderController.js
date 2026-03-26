import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }
    const order = await Order.create(payload);
    res.status(201).json(order);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Order already exists" });
    }
    res.status(500).json({ error: "Failed to save order" });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.deleteOne({ orderId: id });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
