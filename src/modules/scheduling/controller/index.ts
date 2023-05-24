import { Request, Response } from "express";
import { SchedulingService } from "../services";

export class SchedulingController {
  async create(request: Request, response: Response) {
    try {
      const { client, schedule, cellphone, address, hour, services } =
        request.body;

      const scheduleService = new SchedulingService();
      const scheduleData = await scheduleService.create({
        client,
        schedule,
        hour,
        cellphone,
        address,
        services,
      });

      return response.status(200).json(scheduleData);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
  async getAll(request: Request, response: Response) {
    try {
      const scheduleServices = new SchedulingService();
      const userId = request.userId;
      const schedules = await scheduleServices.getAll(userId);
      return response.status(200).json(schedules);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }

  async updateSchedule(request: Request, response: Response) {
    try {
      const scheduleServices = new SchedulingService();
      const { scheduleId } = request.body;
      const userId = request.userId;
      const schedules = await scheduleServices.updateStatus(userId, scheduleId);
      return response.status(200).json(schedules.status);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
