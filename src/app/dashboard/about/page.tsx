"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMetaMask } from "@/contexts/useMetaMaskContext";
import { RedirectType, redirect } from "next/navigation";
import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AboutPage() {
  const { wallet } = useMetaMask();

  if (!wallet?.chainId) {
    redirect("/sign-in", RedirectType.replace);
  }
  return (
    <div className="max-h-screen flex justify-center items-center flex-col">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="text-4xl font-bold">{wallet.balance} ETH</div>
            <p className="text-gray-500 dark:text-gray-400">
              Chain Id : {wallet.chainId}
            </p>
            <p className="text-gray-500 dark:text-gray-400 break-all">
              Account Address: {wallet.accounts[0]}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
