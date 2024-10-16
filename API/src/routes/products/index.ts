import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("The list of products");
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  res.send("A Product");
});

router.post("/", (req, res) => {
  res.send("New Product created");
});

export default router;
