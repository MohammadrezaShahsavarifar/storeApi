import Product from "../models/product";
import { Request, Response, NextFunction } from "express";

export const getAllProductStatic = async (req: Request, res: Response) => {
  const products = await Product.find({}).sort("name price");
  res.status(200).json({ nbHits: products.length, products });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  interface QueryObject {
    featured?: boolean;
    company?: string;
    name?: { $regex: string; $options: string } | string;
    // other properties...
  }
  const queryObject: QueryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company as string;
  }
  if (name) {
    queryObject.name = name as string;
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    if (typeof numericFilters === "string") {
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ["price", "rating"];
      const parsedFilters = filters.split(",").map((item) => {
        const [field, operator, value] = item.split(":");
        return { field, operator, value };
      });
      // Ensure filters is used correctly as an array of objects
      // ... existing code ...
    }
  }

  let result = Product.find(queryObject);
  // sort
  if (typeof sort === "string") {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (typeof fields === "string") {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};
