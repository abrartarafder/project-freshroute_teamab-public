import { Router } from "express";
import { getEthicallyRaised } from "../controllers/EthicallyRaisedController.js";

const router = Router();

router.get("/", getEthicallyRaised);

export default router;