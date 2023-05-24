import { Router } from "express";
import { productRouter } from "../modules/Product/routes";
import { schedullingRouter } from "../modules/scheduling/routes";
import { clientRouter } from "../modules/client/routes";
import { workerRouter } from "../modules/worker/routes";
import { shoppingCartRouter } from "../modules/ShoppingCart/routes";

export const router = Router();

router.use("/worker", workerRouter);
router.use("/product", productRouter);
router.use("/schedule", schedullingRouter);
router.use("/client", clientRouter);
router.use("/shoppingcart", shoppingCartRouter);
