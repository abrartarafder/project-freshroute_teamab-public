import { Router } from "express";
import { createOrder, deleteOrder, listOrders } from "../controllers/OrderController.js";

const router = Router();

router.get("/", listOrders);
router.post("/", createOrder);
router.delete("/:id", deleteOrder);

export default router;
