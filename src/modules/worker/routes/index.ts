import { Router } from "express";
import { WorkerController } from "../controller";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";

export const workerRouter = Router();

const workerController = new WorkerController();

workerRouter.post("/login", workerController.session);

workerRouter.post("/create", workerController.create);
workerRouter.get("/", isAuthenticated, workerController.getById);
