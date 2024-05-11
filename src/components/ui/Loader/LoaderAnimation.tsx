"use client";
import React from "react";
import animationData from "./animation_ln8irneu.json";
import Lottie from "react-lottie";

export default function LoaderAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
}
