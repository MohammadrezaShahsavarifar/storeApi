const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product must have a name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "product must have price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is Not supported",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
