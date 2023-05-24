import { Request, Response } from "express";

import { WorkerService } from "../services";

export class WorkerController {
  async create(request: Request, response: Response) {
    try {
      const { cpf, password, permission_password } = request.body;
      const workerService = new WorkerService();
      const worker = await workerService.create({
        cpf,
        password,
        permission_password,
      });
      return response.json(worker);
    } catch (err: any) {
      return response.status(409).json("this cpf is already registered");
    }
  }

  async session(request: Request, response: Response): Promise<Response> {
    try {
      const { cpf, password } = request.body;
      const sessionService = new WorkerService();
      const session = await sessionService.session({
        cpf,
        password,
      });
      return response.status(200).json(session);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
  async getById(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = request;
      const workerService = new WorkerService();
      const worker = await workerService.getById(userId);
      return response.status(200).json(worker);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
