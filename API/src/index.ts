import express from "express";
import productsRoutes from "@routes/products.routes";
import { errorHandler } from "@middlewares/errorHandlerMiddleware";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

//Centralized error handler at the end of all routes
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World?");
});

app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Your server is running on port, http://localhost:${PORT} `);
});
