const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;

const db = process.env.DATABASE.replace("<password>", process.env.DB_PASS);
app.listen(port, () => {
  console.log(`your server is running on port ${port}`);
});

mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`your db is connected`);
  }
);
