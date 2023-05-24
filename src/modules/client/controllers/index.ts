import { Request, Response } from "express";
import { ClientServices } from "../services";

export class ClientController {
  async create(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const clientServices = new ClientServices();
      const client = await clientServices.create({
        email,
        password,
      });

      return response.status(200).json(client);
    } catch (err: any) {
      const message = err.message.includes("constraint");
      if (message) {
        return response.status(403).json("this email is already ");
      }
      return response.status(400).json(err.message);
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { userId } = request;
      const clientServices = new ClientServices();
      const client = await clientServices.getById(userId);
      return response.status(200).json(client);
    } catch (err: any) {
      return response.status(404).json(err.message);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { email } = request.params;
      const clientServices = new ClientServices();
      const client = await clientServices.delete({ email });
      return response.status(200).json("User deleted successfully");
    } catch (err: any) {
      return response.status(404).json(err.message);
    }
  }

  async session(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const clientServices = new ClientServices();
      const session = await clientServices.createSession({
        email,
        password,
      });
      return response.status(200).json(session);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }

  async updateClient(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { socialSecurityNumber, cellphone, creditCard } = request.body;
      const clientServices = new ClientServices();
      const updatedClient = await clientServices.updateClient(
        userId,
        socialSecurityNumber,
        cellphone,
        creditCard
      );
      return response.status(200).json(updatedClient);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
