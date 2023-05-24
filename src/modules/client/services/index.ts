import { ICreateClient } from "../models";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import authConfig from "../../config/authConfig";
import { prisma } from "../../../shared/middlewares/database/connection";

export class ClientServices {
  async create({ email, password }: ICreateClient) {
    const passwordHashed = await bcrypt.hash(password, 10);
    const client = await prisma.client.create({
      data: {
        email,
        password: passwordHashed,
        role: "client",
      },
    });

    return client;
  }

  async getById(id: string) {
    const client = await prisma.client.findFirst({
      where: {
        id,
      },
    });

    return client;
  }

  async delete({ email }: Pick<ICreateClient, "email">) {
    const exists = await prisma.client.findFirst({
      where: { email },
    });

    if (!exists) {
      throw new Error("Couldn't find this user");
    }
    await prisma.client.delete({
      where: {
        email,
      },
    });
  }

  async createSession({ email, password }: ICreateClient) {
    const user = await prisma.client.findFirst({
      where: {
        email,
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
  async updateClient(
    userId: string,
    socialSecurityNumber: string,
    cellphone: string,
    creditCard: string
  ) {
    const updatedUser = await prisma.client.update({
      where: {
        id: userId,
      },
      data: {
        socialSecurityNumber,
        cellphone,
        creditCard,
      },
    });
    return updatedUser;
  }
}
