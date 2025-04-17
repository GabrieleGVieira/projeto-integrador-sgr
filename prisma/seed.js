import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();
    await prisma.event.deleteMany();
    
    const festaJunina = await prisma.event.create({
      data: {
        name: "Festa Junina",
        description: "Festa junina tradicional da Obra Social Célio Lemos.",
        active: true,
      },
    });

     const festaPrimaveira = await prisma.event.create({
       data: {
         name: "Festa da Primaveira",
         description: "Evento da Obra Social Célio Lemos.",
         active: false,
       },
     });

  const produtos = await prisma.product.createMany({
    data: [
      {
        name: "Bolinho Caipira",
        price: 2.5,
        category: "Comidas",
        active: true,
      },
      { name: "Milho Verde", price: 5.0, category: "Comidas", active: true },
      { name: "Pastel", price: 4.0, category: "Comidas", active: true },
      { name: "Lanche Natural", price: 6.0, category: "Comidas", active: true },
      { name: "Buraco Quente", price: 7.0, category: "Comidas", active: true },
      { name: "Água", price: 3.0, category: "Bebidas", active: true },
      { name: "Suco", price: 5.0, category: "Bebidas", active: true },
      { name: "Refrigerante", price: 7.0, category: "Bebidas", active: true },
      { name: "Picolé", price: 2.0, category: "Doces", active: true },
      { name: "Cupcake", price: 2.5, category: "Doces", active: true },
      { name: "Maçã do Amor", price: 3.0, category: "Doces", active: true },
      { name: "Brincadeiras", price: 3.0, category: "Outros", active: true },
    ],
  });
    
  console.log("Seeding concluído com sucesso! 🌽🎉");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
