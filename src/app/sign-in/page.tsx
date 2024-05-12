"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMetaMask } from "@/contexts/useMetaMaskContext";
import { RedirectType, redirect } from "next/navigation";
import { WalletIcon } from "lucide-react";
import dynamic from "next/dynamic";

const LoaderAnimation = dynamic(
  () => import("@/components/ui/Loader/LoaderAnimation"),
  {
    ssr: false,
  }
);

export default function SignInPage() {
  const { connectMetaMask, wallet, isConnecting } = useMetaMask();

  if (isConnecting) {
    return <LoaderAnimation />;
  }

  if (wallet?.chainId) {
    redirect("/dashboard", RedirectType.replace);
  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <Card className="mx-auto my-auto max-w-md space-y-6 p-4 m-4 min-w-[300px]">
        <div className="flex gap-1 justify-center">
          <WalletIcon className="h-8 w-8" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DWAPP
          </span>
        </div>
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 text-pretty">
            Connect your MetaMask wallet to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => connectMetaMask()} className="w-full">
            Sign in with MetaMask
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
