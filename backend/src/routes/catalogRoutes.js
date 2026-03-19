import { Router } from "express";
import { getEthicallyRaised, getOrganic, getRecipes } from "../controllers/CatalogController.js";

const router = Router();

router.get("/ethically-raised", getEthicallyRaised);
router.get("/recipes", getRecipes);
router.get("/organic", getOrganic);

export default router;
