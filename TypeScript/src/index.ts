import express from "express";
import productRoutes from "./routes/productRoutes";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
const app = express();

app.use(express.json());

//api
app.use("/api/v1/products", productRoutes);

//Custom middleware

app.use(notFound);
app.use(errorHandlerMiddleware);

export default app;
