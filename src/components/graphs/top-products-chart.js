"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "../ui/card";

export default function TopProductsChart({ orders, products }) {
  const groupedData = groupOrdersByProduct(orders, products);

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={groupedData.sort((a, b) => b.quantity - a.quantity)}
            layout="vertical"
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="quantity" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function groupOrdersByProduct(orders, products) {
  const idToName = Object.fromEntries(products.map((p) => [p.id, p.name]));
  const grouped = {};

  orders.forEach((order) => {
    const name = idToName[order.productId] || "Produto desconhecido";
    if (!grouped[name]) {
      grouped[name] = 0;
    }
    grouped[name] += order.quantity;
  });

  return Object.entries(grouped).map(([name, quantity]) => ({
    name,
    quantity,
  }));
}
