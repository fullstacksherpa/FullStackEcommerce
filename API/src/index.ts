import express from "express";
import productsRoutes from "@routes/products.routes";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World?");
});

app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Your server is running on port, http://localhost:${PORT} `);
});
