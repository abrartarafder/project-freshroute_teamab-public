import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "..", "..", "BackEndData");

async function readJson(filename) {
  const filePath = path.join(dataDir, filename);
  const json = await fs.readFile(filePath, "utf-8");
  return JSON.parse(json);
}

export async function getEthicallyRaised(req, res) {
  try {
    const data = await readJson("backend-ethically_raised.json");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load ethically raised catalog", details: err.message });
  }
}

export async function getRecipes(req, res) {
  try {
    const data = await readJson("backend-recipes.json");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load recipes catalog", details: err.message });
  }
}

export async function getOrganic(req, res) {
  try {
    const data = await readJson("backend-organic.json");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load organic catalog", details: err.message });
  }
}
