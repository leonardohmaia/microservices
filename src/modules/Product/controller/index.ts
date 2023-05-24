import { Prisma, Product } from "@prisma/client";
import { Request, Response } from "express";
import { ProductService } from "../services";

export class ProductController {
  async create(request: Request, response: Response) {
    try {
      const productService = new ProductService();
      const {
        name,
        price,
        quantity,
        description,
      }: Omit<Product, "id" | "createdAt"> = request.body;
      let imageFilename = request.file!.filename;
      let image = imageFilename.replace(/[\n\r\s\t]+/g, "");
      const product = await productService.create({
        name,
        price: price,
        quantity: Number(quantity),
        image,
        description,
      });
      return response.json(product);
    } catch (err: any) {
      return response.json(err.message);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id, quantity } = request.body;
      const userId = request.userId;
      const productService = new ProductService();
      const product = await productService.update(id, quantity, userId);
      return response.json(product);
    } catch (err: any) {
      return response.json(err.message);
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const productService = new ProductService();
      const products = await productService.getAll();
      return response.json(products);
    } catch (err: any) {
      return response.json(err.message);
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const productService = new ProductService();
      const product = await productService.getById(id);
      return response.json(product);
    } catch (err: any) {
      return response.json(err.message);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const productService = new ProductService();
      await productService.delete(id);
      return response.json("deleted sucessfully");
    } catch (err: any) {
      return response.json(err.message);
    }
  }
}
