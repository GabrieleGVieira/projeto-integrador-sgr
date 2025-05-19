import { jest } from "@jest/globals";
import { createRequest } from "node-mocks-http";

jest.unstable_mockModule("../../lib/prisma", () => ({
  default: {
    event: {
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}));

let db;
let PATCH;

beforeAll(async () => {
  const prismaModule = await import("../../lib/prisma");
  db = prismaModule.default;
  const api = await import("../../app/api/events/active/route"); // ajuste o caminho conforme o seu projeto
  PATCH = api.PATCH;
});

describe("API PATCH /api/events/active", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve ativar o evento especificado e desativar os demais", async () => {
    const eventId = "event-123";

    const mockUpdatedEvent = {
      id: eventId,
      active: true,
      updatedAt: new Date().toISOString(),
    };

    // mocka o update do evento ativo
    db.event.update.mockResolvedValue(mockUpdatedEvent);

    // mocka o updateMany para os demais eventos
    db.event.updateMany.mockResolvedValue({ count: 5 });

    const req = createRequest({
      method: "PATCH",
      body: { id: eventId },
    });
    req.json = async () => ({ id: eventId });

    const res = await PATCH(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(mockUpdatedEvent);

    expect(db.event.update).toHaveBeenCalledWith({
      where: { id: eventId },
      data: expect.objectContaining({
        active: true,
        updatedAt: expect.any(Date),
      }),
    });

    expect(db.event.updateMany).toHaveBeenCalledWith({
      where: {
        id: { not: eventId },
      },
      data: expect.objectContaining({
        active: false,
        updatedAt: expect.any(Date),
      }),
    });
  });

  it("deve retornar erro 500 se falhar", async () => {
    const errorMessage = "Erro inesperado";

    db.event.update.mockRejectedValue(new Error(errorMessage));

    const req = createRequest({
      method: "PATCH",
      body: { id: "event-999" },
    });
    req.json = async () => ({ id: "event-999" });

    const res = await PATCH(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe(errorMessage);
  });
});
