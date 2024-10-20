import { Router } from "express";
import { createOrder, getOrder, listOrders, updateOrder } from "@controllers/orders.controllers.js";
import { insertOrderItemSchema, updateOrderSchema } from "@src/db/ordersSchema.js";
import { validateData } from "@src/middlewares/validationMiddleware.js";
import { verifyToken } from "@src/middlewares/authMiddleware.js";

const router = Router();

router.post("/", verifyToken, validateData(insertOrderItemSchema), createOrder);

router.get("/", verifyToken, listOrders);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
