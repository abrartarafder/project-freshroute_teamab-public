import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

app.get("/", (req, res) => {
  res.send("FreshRoute API is running");
});

app.use("/api/products", productRoutes);
app.use("/api", catalogRoutes);

export default app;
