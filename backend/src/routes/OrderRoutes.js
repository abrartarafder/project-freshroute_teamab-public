import { Router } from "express";
import {
  cancelOrder,
  createOrder,
  deleteOrder,
  getOrderById,
  listOrders,
} from "../controllers/OrderController.js";

const router = Router();

router.get("/", listOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.patch("/:id/cancel", cancelOrder);
router.delete("/:id", deleteOrder);

export default router;
