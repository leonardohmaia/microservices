import { Router } from "express";
import multer from "multer";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import { ProductController } from "../controller";
import multerConfig from "../../config";

export const productRouter = Router();
const productController = new ProductController();
const upload = multer(multerConfig);

productRouter.get("/", productController.getAll);
productRouter.get("/:id", productController.getById);
productRouter.delete("/delete/:id", isAuthenticated, productController.delete);
productRouter.post(
  "/",
  isAuthenticated,
  upload.single("image"),
  productController.create
);
productRouter.patch("/patch", isAuthenticated, productController.update);
