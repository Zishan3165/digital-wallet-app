"use client";
import { useMetaMask } from "@/contexts/useMetaMaskContext";
import { RedirectType, redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

export default function ProtectedRoutes({ children }: PropsWithChildren) {
  const { wallet } = useMetaMask();

  if (!wallet.chainId) {
    redirect("/sign-in", RedirectType.replace);
  }

  return <>{children}</>;
}
