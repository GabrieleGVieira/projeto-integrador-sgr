"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "../ui/card";

export default function SalesEvolutionChart({ sales }) {
  const groupedData = groupSalesByDate(sales);

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">
          Evolução das Vendas ao Longo do Tempo
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={groupedData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#6366f1"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function groupSalesByDate(sales) {
  const grouped = {};

  sales.forEach((sale) => {
    const date = new Date(sale.createdAt).toISOString().split("T")[0]; // yyyy-mm-dd
    if (!grouped[date]) {
      grouped[date] = 0;
    }
    grouped[date] += sale.total;
  });

  return Object.entries(grouped).map(([date, total]) => ({
    date,
    total,
  }));
}
