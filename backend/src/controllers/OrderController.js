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

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ orderId: id }).lean();

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ orderId: id });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.deliveryStatus !== "Placed") {
      return res.status(409).json({ error: "Only placed orders can be cancelled" });
    }

    order.deliveryStatus = "Cancelled";
    await order.save();

    res.json(order.toObject());
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel order" });
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
