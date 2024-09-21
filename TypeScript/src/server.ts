import mongoose from "mongoose";
import app from "./index";
import { config } from "dotenv";

config({ path: "config.env" });

const port = process.env.PORT || 3000;
const db = process.env.DATABASE!.replace("<password>", process.env.DB_PASS!);

mongoose
  .connect(db)
  .then(() => {
    console.log(`Your Db has been connected`);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.listen(port, () => {
  console.log(`Your Server Is On Port ${port}`);
});
