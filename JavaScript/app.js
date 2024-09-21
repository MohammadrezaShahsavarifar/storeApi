require("express-async-errors");
const express = require("express");

const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const productRouter = require("./routes/products");
//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="api/v1/products">Products</a>');
});
app.use("/api/v1/products", productRouter);
//errorHandling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
