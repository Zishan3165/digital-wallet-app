"use client";
import dynamic from "next/dynamic";

const LoaderAnimation = dynamic(
  () => import("@/components/ui/Loader/LoaderAnimation"),
  {
    ssr: false,
  }
);

export default function loading() {
  return <LoaderAnimation />;
}
