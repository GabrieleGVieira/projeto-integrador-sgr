"use client";

import useData from "../../hooks/data";
import EventsTable from "@/components/events-table";

export default function Eventos() {
  const { events, reloadEvents} = useData({
    loadEvents: true,
  });

  return <EventsTable events={events} reloadEvents={reloadEvents} />;
}
