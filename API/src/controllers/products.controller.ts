import { Request, Response } from "express";
import { db } from "@db/index";
import { productsTable } from "@src/db/productsSchema";
import { asyncHandler } from "@src/utils/asyncHandler";
import { eq } from "drizzle-orm";

const listProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await db.select().from(productsTable);
  res.json(products);
});

const getProductsById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, Number(id)));

  if (!product) {
    res.status(404).send({ message: "Product not found" });
  } else {
    res.json(product);
  }
});

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body || !req.body.name || !req.body.price) {
    return res.status(400).json({ message: "Name and price are required." });
  }

  if (typeof req.body.name !== "string" || typeof req.body.price !== "number") {
    return res.status(400).json({
      message: "Invalid data types. Name should be a string and price should be a number.",
    });
  }

  const [product] = await db.insert(productsTable).values(req.body).returning();

  res.status(201).json({ message: "Product created successfully", product });
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  console.log(id);
  const updatedFields = req.body;
  if (!updateProduct) {
    res.status(404).json({ message: `Please provide update product fields correctly` });
  }

  const [product] = await db
    .update(productsTable)
    .set(updatedFields)
    .where(eq(productsTable.id, id))
    .returning();

  if (product) {
    res.status(200).json({ message: "Product updated successfully", product: product });
  } else {
    res.status(404).json({ message: `Product with ID ${id} is not updated` });
  }
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const [deletedProduct] = await db
    .delete(productsTable)
    .where(eq(productsTable.id, Number(id)))
    .returning();
  if (deletedProduct) {
    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } else {
    res.status(404).json({ message: `Product with ID ${id} not found` });
  }
});

export { listProducts, getProductsById, createProduct, updateProduct, deleteProduct };
