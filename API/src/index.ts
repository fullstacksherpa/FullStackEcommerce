import express from "express";
import productsRoutes from "@routes/products.routes.js";
import authRoutes from "@src/routes/auth.routes.js";
import ordersRoutes from "@src/routes/orders.routes.js";
import { errorHandler } from "@middlewares/errorHandlerMiddleware.js";
import serverless from "serverless-http";

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
app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);

if (process.env.NODE_ENV === "dev") {
  app.listen(PORT, () => {
    console.log(`Your server is running on port, http://localhost:${PORT} `);
  });
}

export const handler = serverless(app);
