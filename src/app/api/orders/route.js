import db from "../../../lib/prisma";

export async function POST(request) {
  try {
    const data = await request.json();

    await db.order.createMany({
      data: data,
    });

    return new Response(JSON.stringify("Pedido salvo com sucesso"), {
      status: 200,
    });
  } catch (error) {
    console.error("Erro salvar pedido:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Erro desconhecido",
        stack: error.stack || "Sem detalhes da stack",
      }),
      { status: 500 }
    );
  }
}
