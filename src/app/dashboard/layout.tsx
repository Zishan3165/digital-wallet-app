import Navbar from "@/components/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl m-auto p-4">{children}</div>
    </>
  );
}
