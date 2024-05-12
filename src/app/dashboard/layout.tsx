import Navbar from "@/components/Navbar";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoutes>
      <Navbar />
      <main className="max-w-screen-xl m-auto p-4">{children}</main>
    </ProtectedRoutes>
  );
}
