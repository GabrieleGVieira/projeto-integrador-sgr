"use client";
import Menu from "../components/menu";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <Menu />
      </div>
    </div>
  );
}
