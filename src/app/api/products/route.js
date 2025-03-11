import db from "../../../lib/prisma";

export async function GET() {
  try {
    const products = await db.product.findMany();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produtos aqui:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Erro desconhecido",
        stack: error.stack || "Sem detalhes da stack",
      }),
      { status: 500 }
    );
  }
}
