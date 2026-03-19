import { Router } from "express";
import { getRecipes } from "../controllers/RecipeController.js";

const router = Router();

router.get("/", getRecipes);

export default router;