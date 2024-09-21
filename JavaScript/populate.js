require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const Product = require("./models/product");

const jsonProducts = require("./products.json");
const db = process.env.DATABASE.replace("<password>", process.env.DB_PASS);

const start = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      },
      () => {
        console.log(`your db is connected`);
      }
    );
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
