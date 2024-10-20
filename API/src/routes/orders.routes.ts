import { Router } from "express";
import { createOrder } from "@controllers/orders.controllers.js";
import { insertOrderItemSchema } from "@src/db/ordersSchema.js";
import { validateData } from "@src/middlewares/validationMiddleware.js";
import { verifyToken } from "@src/middlewares/authMiddleware.js";

const router = Router();

router.post("/", verifyToken, validateData(insertOrderItemSchema), createOrder);

export default router;
