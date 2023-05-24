import { PrismaClient, Schedule } from "@prisma/client";
import { prisma } from "../../../shared/middlewares/database/connection";

export class SchedulingService {
  async create({
    client,
    schedule,
    cellphone,
    address,
    hour,
    services,
  }: Omit<Schedule, "id" | "status" | "createdAt">) {
    const thisDate = new Date();
    const inputDate = new Date(`${schedule}T${hour}`);

    if (inputDate.getTime() < thisDate.getTime()) {
      throw new Error("Cannot schedule this date");
    }

    const scheduling = await prisma.schedule.create({
      data: {
        client,
        schedule: new Date(schedule),
        hour,
        cellphone,
        address,
        services,
        status: true,
      },
    });
    return scheduling;
  }
  async getAll(userId: string) {
    const isWorker = await prisma.worker.findFirst({
      where: {
        id: userId,
      },
    });

    if (!isWorker) {
      throw new Error("You don't have the privilege required");
    }
    const schedules = await prisma.schedule.findMany({
      where: {
        status: true,
      },
      orderBy: {
        schedule: "asc",
      },
    });
    return schedules;
  }

  async updateStatus(userId: string, scheduleId: string) {
    const isWorker = await prisma.worker.findFirst({
      where: {
        id: userId,
      },
    });

    if (!isWorker) {
      throw new Error("You don't have the privilege required");
    }
    const schedules = await prisma.schedule.update({
      where: {
        id: scheduleId,
      },

      data: {
        status: false,
      },
    });
    return schedules;
  }
}
