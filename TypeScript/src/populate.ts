import { config } from "dotenv";
import mongoose from "mongoose";
import Product from "./models/product";
import jsonProducts from "./products.json";
config({ path: "config.env" });

const db = process.env.DATABASE!.replace("<password>", process.env.DB_PASS!);

const start = async () => {
  try {
    await mongoose.connect(db).then(() => {
      console.log(`Yor Db connected`);
    });
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
