import { jest } from "@jest/globals";
import { createRequest } from "node-mocks-http";

jest.unstable_mockModule("../../lib/prisma", () => ({
  default: {
    event: {
      findMany: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
  },
}));

let db;
let GET, PATCH, POST;

beforeAll(async () => {
  const prismaModule = await import("../../lib/prisma");
  db = prismaModule.default;

  const api = await import("../../app/api/events/route");
  GET = api.GET;
  PATCH = api.PATCH;
  POST = api.POST;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("API /api/events", () => {
  describe("GET", () => {
    it("deve retornar todos os eventos com status 200", async () => {
      const mockEvents = [
        { id: "1", name: "Evento 1", description: "Desc 1" },
        { id: "2", name: "Evento 2", description: "Desc 2" },
      ];
      db.event.findMany.mockResolvedValue(mockEvents);

      const res = await GET();
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual(mockEvents);
      expect(db.event.findMany).toHaveBeenCalled();
    });

    it("deve retornar erro 500 se falhar ao buscar eventos", async () => {
      const error = new Error("Erro ao buscar eventos");
      db.event.findMany.mockRejectedValue(error);

      const res = await GET();
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Erro ao buscar eventos");
      expect(data.stack).toBeDefined();
    });
  });

  describe("PATCH", () => {
    it("deve atualizar um evento e retornar status 200", async () => {
      const updatedEvent = {
        id: "1",
        name: "Evento Atualizado",
        description: "Nova descrição",
      };
      db.event.update.mockResolvedValue(updatedEvent);

      const req = createRequest({
        method: "PATCH",
        body: updatedEvent,
      });
      req.json = async () => updatedEvent;

      const res = await PATCH(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual(updatedEvent);
      expect(db.event.update).toHaveBeenCalledWith({
        where: { id: updatedEvent.id },
        data: expect.objectContaining({
          name: updatedEvent.name,
          description: updatedEvent.description,
          updatedAt: expect.any(Date),
        }),
      });
    });

    it("deve retornar erro 500 se falhar ao atualizar evento", async () => {
      const error = new Error("Erro ao atualizar evento");
      db.event.update.mockRejectedValue(error);

      const req = createRequest({
        method: "PATCH",
        body: { id: "1", name: "Nome", description: "Desc" },
      });
      req.json = async () => ({ id: "1", name: "Nome", description: "Desc" });

      const res = await PATCH(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Erro ao atualizar evento");
    });
  });

  describe("POST", () => {
    it("deve criar um novo evento com status 201", async () => {
      const newEventInput = { name: "Novo Evento", description: "Descrição" };
      const newEventCreated = {
        ...newEventInput,
        id: "123",
        active: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      db.event.create.mockResolvedValue(newEventCreated);

      const req = createRequest({
        method: "POST",
        body: newEventInput,
      });
      req.json = async () => newEventInput;

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data).toEqual(newEventCreated);
      expect(db.event.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: newEventInput.name,
          description: newEventInput.description,
          active: false,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      });
    });

    it("deve retornar erro 400 se faltar nome ou descrição", async () => {
      const req = createRequest({
        method: "POST",
        body: { name: "Evento sem descrição" },
      });
      req.json = async () => ({ name: "Evento sem descrição" });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("Nome de descrição são obrigatórios");
    });

    it("deve retornar erro 500 se falhar ao criar evento", async () => {
      const error = new Error("Erro ao criar evento");
      db.event.create.mockRejectedValue(error);

      const newEventInput = { name: "Novo Evento", description: "Descrição" };
      const req = createRequest({
        method: "POST",
        body: newEventInput,
      });
      req.json = async () => newEventInput;

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe("Erro ao criar evento");
      expect(data.stack).toBeDefined();
    });
  });
});
