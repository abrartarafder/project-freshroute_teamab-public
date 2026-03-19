import EthicallyRaised from "../models/EthicallyRaised.js";

export async function getEthicallyRaised(req, res) {
  try {
    const items = await EthicallyRaised.find().sort({ name: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}