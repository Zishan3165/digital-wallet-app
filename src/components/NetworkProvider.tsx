"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";

export default function NetworkProvider({ children }: React.PropsWithChildren) {
  useEffect(() => {
    const handleOnline = () => {
      toast({
        title: "You are online",
      });
    };
    const handleOffline = () => {
      toast({
        title: "You are offline",
        variant: "destructive",
      });
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{children}</>;
}
