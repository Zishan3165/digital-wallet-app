"use client";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";

export default function DashboardPage() {
  return (
    <ProtectedRoutes>
      <div>Dashboard Page</div>
    </ProtectedRoutes>
  );
}
