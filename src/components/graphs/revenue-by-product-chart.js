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

export default function RevenueByProductChart({ orders, products }) {
  const groupedData = groupRevenueByProduct(orders, products);

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4"> Receita por Produto</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={groupedData.sort((a, b) => b.totalRevenue - a.totalRevenue)}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => `R$ ${parseFloat(value).toFixed(2)}`}
            />
            <Bar dataKey="totalRevenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function groupRevenueByProduct(orders, products) {
  const idToName = Object.fromEntries(products.map((p) => [p.id, p.name]));
  const grouped = {};

  orders.forEach((order) => {
    const name = idToName[order.productId] || "Produto desconhecido";
    if (!grouped[name]) {
      grouped[name] = 0;
    }
    grouped[name] += order.totalPrice;
  });

  return Object.entries(grouped).map(([name, totalRevenue]) => ({
    name,
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
  }));
}
