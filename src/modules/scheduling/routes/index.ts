import { Router } from "express";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import { SchedulingController } from "../controller";

export const schedullingRouter = Router();

const schedulingController = new SchedulingController();

schedullingRouter.post("/", schedulingController.create);
schedullingRouter.get("/", isAuthenticated, schedulingController.getAll);
schedullingRouter.patch(
  "/update",
  isAuthenticated,
  schedulingController.updateSchedule
);
