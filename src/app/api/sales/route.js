import db from "../../../lib/prisma";

export async function POST(request) {
  try {
    const data = await request.json();

    const sales = await db.sale.create({
      data: {
        eventId: data.eventId,
        total: data.total,
      },
    });
    return new Response(JSON.stringify(sales.id), {
      status: 200,
    });
  } catch (error) {
    console.log("Erro ao salvar vendas", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Erro desconhecido",
        stack: error.stack || "Sem detalhes da stack",
      }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sales = await db.sale.findMany();
    return new Response(JSON.stringify(sales), { status: 200 });
  } catch (error) {
    console.log("Erro ao buscar vendas:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Erro desconhecido",
        stack: error.stack || "Sem detalhes da stack",
      }),
      { status: 500 }
    );
  }
}
