import Organic from "../models/Organic.js";

export async function getOrganic(req, res) {
  try {
    const items = await Organic.find().sort({ name: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}