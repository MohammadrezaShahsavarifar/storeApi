import Router from "express";
import {
  getAllProductStatic,
  getAllProducts,
} from "../controllers/productController";
const router = Router();

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductStatic);

export default router;
