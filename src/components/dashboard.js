"use client";

import SalesByEventChart from "./graphs/sales-by-event-chart";
import SalesEvolutionChart from "./graphs/sales-evolution-chart";
import TopProductsChart from "./graphs/top-products-chart";
import RevenueByProductChart from "./graphs/revenue-by-product-chart";
import AverageTicketByEventChart from "./graphs/avarage-ticket-by-event-chart";
import OrdersPerEventChart from "./graphs/orders-per-event-chart";

export default function DashboardCharts({ sales, events, orders, products }) {
  return (
    <div className="grid gap-6 px-4 pb-8 lg:grid-cols-2 xl:grid-cols-3">
      <SalesByEventChart events={events} sales={sales} />
      <SalesEvolutionChart sales={sales} />
      <AverageTicketByEventChart sales={sales} events={events} />
      <TopProductsChart orders={orders} products={products} />
      <RevenueByProductChart orders={orders} products={products} />
      <OrdersPerEventChart orders={orders} sales={sales} events={events} />
    </div>
  );
}
