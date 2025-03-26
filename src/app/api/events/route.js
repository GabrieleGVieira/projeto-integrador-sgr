import db from "../../../lib/prisma";

export async function GET() {
  try {
    const event = await db.event.findFirst({ where: { active: true } });
    if (!event) {
      return new Response(
        JSON.stringify({ message: "Nenhum evento ativo encontrado." }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(event), { status: 200 });
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
