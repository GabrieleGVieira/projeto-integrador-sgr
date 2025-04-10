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

export default function OrdersPerEventChart({ orders, sales, events }) {
  const data = calculateOrdersPerEvent(orders, sales, events);

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">
            Quantidade de Pedidos por Evento
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data.sort((a, b) => b.count - a.count)}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value) => `${value} pedidos`} />
            <Bar dataKey="count" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function calculateOrdersPerEvent(orders, sales, events) {
  const saleIdToEventId = Object.fromEntries(
    sales.map((s) => [s.id, s.eventId])
  );
  const eventIdToName = Object.fromEntries(events.map((e) => [e.id, e.name]));
  const counts = {};

  orders.forEach((order) => {
    const eventId = saleIdToEventId[order.saleId];
    const eventName = eventIdToName[eventId] || "Evento desconhecido";
    counts[eventName] = (counts[eventName] || 0) + 1;
  });

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
  }));
}
