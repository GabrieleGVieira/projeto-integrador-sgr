import { jest } from "@jest/globals";
import { createRequest } from "node-mocks-http";

jest.unstable_mockModule("../../lib/prisma", () => ({
  default: {
    sale: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

let db;
let POST;
let GET;

beforeAll(async () => {
  const prismaModule = await import("../../lib/prisma");
  db = prismaModule.default;
  const api = await import("../../app/api/sales/route");
  POST = api.POST;
  GET = api.GET;
});

describe("API /api/sale", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar uma nova venda (POST)", async () => {
    const mockSale = { id: "sale-123" };
    db.sale.create.mockResolvedValue(mockSale);

    const req = createRequest({
      method: "POST",
      body: { eventId: "event-abc", total: 150 },
    });
    req.json = async () => ({ eventId: "event-abc", total: 150 });

    const res = await POST(req);
    const data = await res.text();

    expect(res.status).toBe(200);
    expect(data).toBe(JSON.stringify("sale-123"));
    expect(db.sale.create).toHaveBeenCalledWith({
      data: { eventId: "event-abc", total: 150 },
    });
  });

  it("deve retornar todas as vendas (GET)", async () => {
    const mockSales = [
      { id: "sale-1", eventId: "event-1", total: 100 },
      { id: "sale-2", eventId: "event-2", total: 200 },
    ];
    db.sale.findMany.mockResolvedValue(mockSales);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(mockSales);
    expect(db.sale.findMany).toHaveBeenCalled();
  });

  it("deve retornar erro se falhar no POST", async () => {
    db.sale.create.mockRejectedValue(new Error("Erro ao salvar"));

    const req = createRequest({
      method: "POST",
      body: { eventId: "event-abc", total: 150 },
    });
    req.json = async () => ({ eventId: "event-abc", total: 150 });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Erro ao salvar");
    expect(json.stack).toBeDefined();
  });
});
