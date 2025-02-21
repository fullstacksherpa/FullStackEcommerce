import { Router } from "express";
import {
  listProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@controllers/products.controller.js";
import { validateData } from "@src/middlewares/validationMiddleware.js";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { productsTable } from "@src/db/productsSchema.js";
import { verifySeller, verifyToken } from "@src/middlewares/authMiddleware.js";

export const createProductSchema = createInsertSchema(productsTable).omit({ id: true });

export const updateProductSchema = createInsertSchema(productsTable).omit({ id: true }).partial();

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductsById);
router.post("/", verifyToken, verifySeller, validateData(createProductSchema), createProduct);
router.put("/:id", verifyToken, verifySeller, validateData(updateProductSchema), updateProduct);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default router;
