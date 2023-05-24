import { prisma } from "../../../shared/middlewares/database/connection";
import { IShoppingCart } from "../models";

export class ShoppingCartService {
  async addProductOnShoppingCart({
    clientId,
    productId,
    quantity,
  }: IShoppingCart) {
    const alreadyExists = await prisma.productsCartOnClient.findFirst({
      where: {
        productId,
        clientId,
      },
    });

    if (alreadyExists) {
      const updatedCart = await prisma.productsCartOnClient.update({
        where: {
          productId_clientId: {
            productId,
            clientId,
          },
        },
        data: {
          quantity: alreadyExists.quantity + quantity,
        },
      });

      return updatedCart;
    }

    const shoppingCart = await prisma.productsCartOnClient.create({
      data: {
        quantity,
        productId,
        clientId,
      },
    });

    return shoppingCart;
  }
  async deleteAll(clientId: string) {
    await prisma.productsCartOnClient.deleteMany({
      where: {
        clientId,
      },
    });
  }

  async updateProductQuantity(
    clientId: string,
    productId: string,
    quantity: number
  ) {
    const product = await prisma.productsCartOnClient.findFirst({
      where: {
        clientId,
        productId,
      },
    });

    if (!product) {
      throw new Error("cannot find this product");
    }

    const updatedProduct = await prisma.productsCartOnClient.update({
      where: {
        productId_clientId: {
          productId,
          clientId,
        },
      },
      data: {
        quantity: product.quantity + quantity,
      },
    });

    return updatedProduct;
  }

  async getAll() {
    const shoppingCarts = await prisma.productsCartOnClient.findMany();
    return shoppingCarts;
  }

  async getShoppingCartByClient(clientId: string) {
    const shoppingCarts = await prisma.productsCartOnClient.findMany({
      where: {
        clientId,
      },
      orderBy: {
        product: {
          name: "asc",
        },
      },
      include: {
        product: true,
      },
    });

    if (!shoppingCarts) {
      throw new Error("No shopping cart found");
    }
    return shoppingCarts;
  }
  async deleteProduct(clientId: string, productId: string) {
    const product = await prisma.productsCartOnClient.findFirst({
      where: {
        clientId,
        productId,
      },
    });
    if (!product) {
      throw new Error("Product wasn't found");
    }
    await prisma.productsCartOnClient.delete({
      where: {
        productId_clientId: {
          clientId,
          productId,
        },
      },
    });
  }
}
