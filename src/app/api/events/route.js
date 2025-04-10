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
