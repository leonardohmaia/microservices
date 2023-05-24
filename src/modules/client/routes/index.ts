import { Router } from "express";
import { ClientController } from "../controllers";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";

export const clientRouter = Router();
const clientController = new ClientController();

clientRouter.post("/login", clientController.session);
clientRouter.post("/", clientController.create);
clientRouter.get("/", isAuthenticated, clientController.getById);
clientRouter.put("/update", clientController.updateClient);
