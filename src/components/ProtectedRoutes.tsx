"use client";
import { useMetaMask } from "@/contexts/useMetaMaskContext";
import { RedirectType, redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
import dynamic from "next/dynamic";

const LoaderAnimation = dynamic(
  () => import("@/components/ui/Loader/LoaderAnimation"),
  {
    ssr: false,
  }
);

export default function ProtectedRoutes({ children }: PropsWithChildren) {
  const { wallet, isConnecting } = useMetaMask();

  if (isConnecting) {
    return <LoaderAnimation />;
  }

  if (!wallet?.chainId) {
    redirect("/sign-in", RedirectType.replace);
  }

  return <>{children}</>;
}
