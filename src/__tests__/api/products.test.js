import { jest } from "@jest/globals";
import { createRequest } from "node-mocks-http";

// Mock do Prisma
jest.unstable_mockModule("../../lib/prisma", () => ({
  default: {
    product: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

let db;
let GET, POST, PATCH, DELETE;

beforeAll(async () => {
  const prismaModule = await import("../../lib/prisma");
  db = prismaModule.default;

  const api = await import("../../app/api/products/route");
  GET = api.GET;
  POST = api.POST;
  PATCH = api.PATCH;
  DELETE = api.DELETE;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("API /api/products", () => {
  describe("GET", () => {
    it("deve retornar todos os produtos com status 200", async () => {
      const mockProducts = [
        { id: "1", name: "Prod1" },
        { id: "2", name: "Prod2" },
      ];
      db.product.findMany.mockResolvedValue(mockProducts);

      const res = await GET();
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual(mockProducts);
      expect(db.product.findMany).toHaveBeenCalled();
    });

    it("deve retornar erro 500 se ocorrer exceção", async () => {
      const error = new Error("Erro no banco");
      db.product.findMany.mockRejectedValue(error);

      const res = await GET();
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Erro no banco");
      expect(data.stack).toBeDefined();
    });
  });

  describe("POST", () => {
    it("deve criar um produto e retornar status 201", async () => {
      const newProduct = {
        id: "123",
        name: "Produto X",
        price: 10,
        category: "cat1",
        active: true,
      };
      db.product.create.mockResolvedValue(newProduct);

      const req = createRequest({
        method: "POST",
        body: newProduct,
      });
      req.json = async () => newProduct;

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data).toEqual(newProduct);
      expect(db.product.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: newProduct.name,
            price: newProduct.price,
            category: newProduct.category,
            active: newProduct.active,
          }),
        })
      );
    });

    it("deve retornar 400 se faltar nome, categoria ou preço", async () => {
      const invalidProduct = { name: "", price: null, category: "" };

      const req = createRequest({
        method: "POST",
        body: invalidProduct,
      });
      req.json = async () => invalidProduct;

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("Nome, categoria e preço são obrigatórios");
      expect(db.product.create).not.toHaveBeenCalled();
    });

    it("deve retornar erro 500 se criar produto falhar", async () => {
      const error = new Error("Erro ao criar");
      db.product.create.mockRejectedValue(error);

      const product = {
        name: "Nome",
        price: 10,
        category: "cat",
        active: true,
      };
      const req = createRequest({
        method: "POST",
        body: product,
      });
      req.json = async () => product;

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Erro ao criar");
      expect(data.stack).toBeDefined();
    });
  });

  describe("PATCH", () => {
    it("deve atualizar um produto e retornar status 200", async () => {
      const updatedProduct = {
        id: "123",
        price: 20,
        category: "cat2",
        active: false,
      };
      db.product.update.mockResolvedValue(updatedProduct);

      const req = createRequest({
        method: "PATCH",
        body: updatedProduct,
      });
      req.json = async () => updatedProduct;

      const res = await PATCH(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual(updatedProduct);
      expect(db.product.update).toHaveBeenCalledWith({
        where: { id: updatedProduct.id },
        data: expect.objectContaining({
          price: updatedProduct.price,
          category: updatedProduct.category,
          active: updatedProduct.active,
          updatedAt: expect.any(Date),
        }),
      });
    });

    it("deve retornar erro 500 se atualização falhar", async () => {
      const error = new Error("Erro update");
      db.product.update.mockRejectedValue(error);

      const updateData = {
        id: "123",
        price: 20,
        category: "cat2",
        active: false,
      };
      const req = createRequest({
        method: "PATCH",
        body: updateData,
      });
      req.json = async () => updateData;

      const res = await PATCH(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Erro update");
    });
  });

  describe("DELETE", () => {
    it("deve deletar produto e retornar sucesso", async () => {
      db.product.delete.mockResolvedValue({});

      const req = createRequest({
        method: "DELETE",
        body: { id: "123" },
      });
      req.json = async () => ({ id: "123" });

      const res = await DELETE(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(db.product.delete).toHaveBeenCalledWith({ where: { id: "123" } });
    });

    it("deve retornar erro 500 se falhar a exclusão", async () => {
      const error = new Error("Erro delete");
      db.product.delete.mockRejectedValue(error);

      const req = createRequest({
        method: "DELETE",
        body: { id: "123" },
      });
      req.json = async () => ({ id: "123" });

      const res = await DELETE(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Erro delete");
    });
  });
});
