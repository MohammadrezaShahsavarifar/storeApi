import { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  featured: boolean;
  rating: number;
  createdAt: Date;
  company: string;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "name cant be empty"],
    trim: true,
    maxLength: [25, "name cant be more than 25 char"],
  },
  price: {
    type: Number,
    required: [true, "price cant be empty"],
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

const Product = model<IProduct>("Product", productSchema);

export default Product;
