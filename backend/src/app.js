import express from "express";
import cors from "cors";
import organicRoutes from "./routes/OrganicRoutes.js";
import ethicallyRaisedRoutes from "./routes/EthicallyRaisedRoutes.js";
import recipeRoutes from "./routes/RecipeRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

app.get("/", (req, res) => {
  res.send("FreshRoute API is running");
});

app.use("/api/organic", organicRoutes);
app.use("/api/ethically-raised", ethicallyRaisedRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/orders", orderRoutes);

export default app;
