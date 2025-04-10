"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesByEventChart({ events, sales }) {
  const salesByEvent = events.map((event) => {
    const total = sales
      .filter((sale) => sale.eventId === event.id)
      .reduce((acc, sale) => acc + sale.total, 0);

    return {
      name: event.name,
      total,
    };
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vendas por Evento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByEvent}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
