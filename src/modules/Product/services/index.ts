import { Product } from "@prisma/client";
import { prisma } from "../../../shared/middlewares/database/connection";

export class ProductService {
  async create({ name, price, quantity, image, description }: any) {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        quantity,
        image,
        description,
      },
    });
    return product;
  }

  async update(id: string, quantity: number, userId: string) {
    const isAdminUser = await prisma.worker.findFirst({
      where: {
        id: userId,
      },
    });

    if (!isAdminUser) {
      throw new Error("You don't have the previlege required");
    }
    const productExists = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error("this product wasn't found");
    }

    const product = await prisma.product.update({
      data: {
        quantity,
      },
      where: {
        id,
      },
    });
    return product;
  }

  async getAll() {
    const products = await prisma.product.findMany();
    return products;
  }

  async getById(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    return product;
  }

  async delete(id: string) {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
