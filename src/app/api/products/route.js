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

export async function PATCH(req) {
  try {
    const { id, price, category, active } = await req.json();

    const updated = await db.product.update({
      where: { id },
      data: {
        price,
        category,
        active,
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

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await db.product.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { name, price, category, active } = await req.json();

    if (!name || !category || price == null) {
      return new Response(
        JSON.stringify({
          error: "Nome, categoria e preço são obrigatórios",
        }),
        { status: 400 }
      );
    }

    const newProduct = await db.product.create({
      data: {
        name,
        price,
        category,
        active,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Erro desconhecido",
        stack: error.stack || "Sem detalhes da stack",
      }),
      { status: 500 }
    );
  }
}
