import { Request, Response } from "express";

const listProducts = (req: Request, res: Response) => {
  res.send("getProduct list");
};

const getProductsById = (req: Request, res: Response) => {
  res.send("got product by Id");
};

const createProduct = (req: Request, res: Response) => {
  res.send("Created new Product");
};

const updateProduct = (req: Request, res: Response) => {
  res.send("updated product");
};

const deleteProduct = (req: Request, res: Response) => {
  res.send("Product deleted successfully");
};

export { listProducts, getProductsById, createProduct, updateProduct, deleteProduct };
