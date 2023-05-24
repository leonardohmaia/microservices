import { Request, Response } from "express";
import { ShoppingCartService } from "../services";

export class ShoppingCartController {
  async create(request: Request, response: Response) {
    try {
      const shoppingCartService = new ShoppingCartService();
      const { product, quantity } = request.body;
      const clientId = request.userId;
      const shoppingCart = await shoppingCartService.addProductOnShoppingCart({
        clientId,
        productId: product,
        quantity,
      });
      return response.status(200).json(shoppingCart);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const shoppingCartService = new ShoppingCartService();
      const cart = await shoppingCartService.getAll();
      return response.status(200).json(cart);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }

  async getByClient(request: Request, response: Response) {
    try {
      const clientId = request.userId;
      const shoppingCart = new ShoppingCartService();
      const cart = await shoppingCart.getShoppingCartByClient(clientId);
      return response.status(200).json(cart);
    } catch (err: any) {
      return response.status(404).json(err.message);
    }
  }

  async deleteAll(request: Request, response: Response) {
    try {
      const clientId = request.userId;
      const shoppingCart = new ShoppingCartService();
      const cart = await shoppingCart.deleteAll(clientId);
      return response.status(200).json("deleted successfully");
    } catch (err: any) {
      return response.status(404).json(err.message);
    }
  }

  async updateProductQuantity(request: Request, response: Response) {
    try {
      const clientId = request.userId;
      const { productId, quantity } = request.body;
      const shoppingCart = new ShoppingCartService();
      const product = await shoppingCart.updateProductQuantity(
        clientId,
        productId,
        quantity
      );
      return response.status(200).json(product);
    } catch (err: any) {
      return response.status(404).json(err.message);
    }
  }

  async deleteProduct(request: Request, response: Response) {
    try {
      const clientId = request.userId;
      const { productId } = request.params;
      const shoppingCart = new ShoppingCartService();
      await shoppingCart.deleteProduct(clientId, productId);
      return response.status(200).json("product deleted");
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
