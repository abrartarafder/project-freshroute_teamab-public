import { Router } from "express";
import { getOrganic } from "../controllers/OrganicController.js";

const router = Router();

router.get("/", getOrganic);

export default router;
