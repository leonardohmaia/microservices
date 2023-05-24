import { Router } from "express";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import { ShoppingCartController } from "../controller";

export const shoppingCartRouter = Router();

const shoppingCartController = new ShoppingCartController();

shoppingCartRouter.post(
  "/create",
  isAuthenticated,
  shoppingCartController.create
);

shoppingCartRouter.get("/", shoppingCartController.getAll);
shoppingCartRouter.get(
  "/user",
  isAuthenticated,
  shoppingCartController.getByClient
);
shoppingCartRouter.patch(
  "/patch",
  isAuthenticated,
  shoppingCartController.updateProductQuantity
);
shoppingCartRouter.delete(
  "/deleteall",
  isAuthenticated,
  shoppingCartController.deleteAll
);
shoppingCartRouter.delete(
  "/delete/:productId",
  isAuthenticated,
  shoppingCartController.deleteProduct
);
