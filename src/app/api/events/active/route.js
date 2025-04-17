
import db from "../../../../lib/prisma"

export async function PATCH(req) {
  try {
    const { id } = await req.json();
    console.log(id)

    const updatedEvent = await db.event.update({
      where: { id },
      data: {
        active: true,
        updatedAt: new Date(),
      },
    });

    await db.event.updateMany({
      where: {
        id: {
          not: id,
        },
      },
      data: {
        active: false,
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify(updatedEvent), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
