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

export default function AverageTicketByEventChart({ sales, events }) {
  const data = calculateAverageTicketByEvent(sales, events);

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">
          Receita Média por Evento
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data.sort((a, b) => b.average - a.average)}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => `R$ ${parseFloat(value).toFixed(2)}`}
            />
            <Bar dataKey="average" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function calculateAverageTicketByEvent(sales, events) {
  const idToName = Object.fromEntries(events.map((e) => [e.id, e.name]));
  const grouped = {};

  sales.forEach((sale) => {
    const name = idToName[sale.eventId] || "Evento desconhecido";
    if (!grouped[name]) {
      grouped[name] = { total: 0, count: 0 };
    }
    grouped[name].total += sale.total;
    grouped[name].count += 1;
  });

  return Object.entries(grouped).map(([name, { total, count }]) => ({
    name,
    average: parseFloat((total / count).toFixed(2)),
  }));
}
