import { NextResponse } from "next/server";
import db from "../../../lib/prisma";
import ExcelJS from "exceljs";

export async function POST(req) {
  try {
    const { products = [], events = [] } = await req.json();

    const workbook = new ExcelJS.Workbook();

    const productSheet = workbook.addWorksheet("Produtos");
    const filteredProducts = await db.product.findMany({
      where: products.length ? { id: { in: products } } : {},
    });

    productSheet.columns = [
      { header: "ID", key: "id" },
      { header: "Nome", key: "name" },
      { header: "Preço", key: "price" },
      { header: "Categoria", key: "category" },
      { header: "Data de Criação", key: "createdAt" },
    ];
    productSheet.addRows(filteredProducts);

    const eventSheet = workbook.addWorksheet("Eventos");
    const filteredEvents = await db.event.findMany({
      where: events.length ? { id: { in: events } } : {},
    });

    eventSheet.columns = [
      { header: "ID", key: "id" },
      { header: "Nome", key: "name" },
      { header: "Descrição", key: "description" },
      { header: "Ativo", key: "active" },
      { header: "Data de Criação", key: "createdAt" },
    ];
    eventSheet.addRows(
      filteredEvents.map((event) => ({
        id: event.id,
        name: event.name || "",
        description: event.description,
        active: event.active ? "ATIVO" : "INATIVO",
        createdAt: event.createdAt,
      }))
    );

    const ordersSheet = workbook.addWorksheet("Pedidos");
    const filteredOrders = await db.order.findMany({
      where: {
        ...(products.length ? { productId: { in: products } } : {}),
        ...(events.length
          ? {
              sale: {
                eventId: { in: events },
              },
            }
          : {}),
      },
      include: {
        product: true,
        sale: {
          include: { event: true },
        },
      },
    });

    ordersSheet.columns = [
      { header: "ID", key: "id" },
      { header: "Produtos", key: "productName" },
      { header: "Eventos", key: "eventName" },
      { header: "Quantidade", key: "quantity" },
      { header: "Preço Unitário", key: "unitPrice" },
      { header: "Preço Total", key: "totalPrice" },
      { header: "ID de Venda", key: "saleId" },
      { header: "Data de Criação", key: "createdAt" },
    ];

    ordersSheet.addRows(
      filteredOrders.map((order) => ({
        id: order.id,
        productName: order.product?.name || "",
        eventName: order.sale?.event?.name || "",
        quantity: order.quantity,
        unitPrice: order.unitPrice,
        totalPrice: order.totalPrice,
        saleId: order.saleId,
        createdAt: order.createdAt,
      }))
    );

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=relatorio.xlsx",
      },
    });
  } catch (error) {
    console.log("Erro ao gerar Excel:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
