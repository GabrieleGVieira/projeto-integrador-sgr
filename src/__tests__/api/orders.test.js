import { jest } from "@jest/globals";
import { createRequest } from "node-mocks-http";

jest.unstable_mockModule("../../lib/prisma", () => ({
  default: {
    order: {
      createMany: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

let db;
let POST, GET;

beforeAll(async () => {
  const prismaModule = await import("../../lib/prisma");
  db = prismaModule.default;

  const api = await import("../../app/api/orders/route");
  POST = api.POST;
  GET = api.GET;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("API /api/orders", () => {
  describe("POST", () => {
    it("deve salvar múltiplos pedidos com sucesso e retornar status 200", async () => {
      db.order.createMany.mockResolvedValue({ count: 2 }); // createMany retorna objeto com count

      const orders = [
        { id: "1", product: "Prod1", quantity: 2 },
        { id: "2", product: "Prod2", quantity: 5 },
      ];
      const req = createRequest({
        method: "POST",
        body: orders,
      });
      req.json = async () => orders;

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toBe("Pedido salvo com sucesso");
      expect(db.order.createMany).toHaveBeenCalledWith({ data: orders });
    });

    it("deve retornar erro 500 se falhar ao salvar pedidos", async () => {
      const error = new Error("Erro ao salvar pedidos");
      db.order.createMany.mockRejectedValue(error);

      const orders = [{ id: "1", product: "Prod1", quantity: 2 }];
      const req = createRequest({
        method: "POST",
        body: orders,
      });
      req.json = async () => orders;

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Erro ao salvar pedidos");
      expect(data.stack).toBeDefined();
    });
  });

  describe("GET", () => {
    it("deve retornar todos os pedidos com status 200", async () => {
      const mockOrders = [
        { id: "1", product: "Prod1", quantity: 2 },
        { id: "2", product: "Prod2", quantity: 5 },
      ];
      db.order.findMany.mockResolvedValue(mockOrders);

      const res = await GET();
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual(mockOrders);
      expect(db.order.findMany).toHaveBeenCalled();
    });

    it("deve retornar erro 500 se falhar ao buscar pedidos", async () => {
      const error = new Error("Erro ao buscar pedidos");
      db.order.findMany.mockRejectedValue(error);

      const res = await GET();
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Erro ao buscar pedidos");
      expect(data.stack).toBeDefined();
    });
  });
});
