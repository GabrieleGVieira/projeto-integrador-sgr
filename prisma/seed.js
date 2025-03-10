import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Limpando o banco de dados
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


  // Criando produtos típicos da festa junina
  const produtos = await prisma.product.createMany({
    data: [
      { name: "Bolinho Caipira", price: 2.5, category: "comidas" },
      { name: "Milho Verde", price: 5.0, category: "comidas" },
      { name: "Pastel", price: 4.0, category: "comidas" },
      { name: "Lanche Natural", price: 6.0, category: "comidas" },
      { name: "Buraco Quente", price: 3.0, category: "comidas" },
      { name: "Água", price: 3.0, category: "bebidas" },
      { name: "Suco", price: 3.0, category: "bebidas" },
      { name: "Refrigerante", price: 3.0, category: "bebidas" },
      { name: "Picolé", price: 3.0, category: "doces" },
      { name: "Cupcake", price: 3.0, category: "doces" },
      { name: "Maçã do Amor", price: 3.0, category: "doces" },
      { name: "Brincadeiras", price: 3.0, category: "outros" },
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
