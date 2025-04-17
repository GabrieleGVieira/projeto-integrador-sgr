import db from "../../../lib/prisma";

export async function GET() {
  try {
    const events = await db.event.findMany();

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Erro desconhecido",
        stack: error.stack || "Sem detalhes da stack",
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { id, name, description} = await req.json();

    const updated = await db.event.update({
      where: { id },
      data: {
        name,
        description,
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { name, description } = await req.json();

    if (!name || !description) {
      return new Response(
        JSON.stringify({
          error: "Nome de descrição são obrigatórios",
        }),
        { status: 400 }
      );
    }

    const newEvent = await db.event.create({
      data: {
        name,
        description,
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "Erro desconhecido",
        stack: error.stack || "Sem detalhes da stack",
      }),
      { status: 500 }
    );
  }
}
