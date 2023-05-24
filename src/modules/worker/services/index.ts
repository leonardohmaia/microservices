import { IWorker } from "../models";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import authConfig from "../../config/authConfig";
import { prisma } from "../../../shared/middlewares/database/connection";

export class WorkerService {
  async create({ cpf, password, permission_password }: IWorker) {
    if (permission_password !== process.env.PERMISSION_PASSWORD) {
      throw new Error("You don't have privilege required");
    }
    const passwordHashed = await bcrypt.hash(password, 10);
    const user = await prisma.worker.create({
      data: {
        cpf,
        password: passwordHashed,
        role: "worker",
      },
    });

    return user;
  }

  async session({ cpf, password }: Omit<IWorker, "permission_password">) {
    const user = await prisma.worker.findFirst({
      where: {
        cpf,
      },
    });

    if (!user) {
      throw new Error("email/password incorrent");
    }

    const passwordConfirmed = await bcrypt.compare(password, user.password);

    if (!passwordConfirmed) {
      throw new Error("email/password incorrect");
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return {
      user,
      token,
    };
  }

  async getById(userId: string) {
    const worker = await prisma.worker.findFirst({
      where: {
        id: userId,
      },
    });
    return worker;
  }
}
