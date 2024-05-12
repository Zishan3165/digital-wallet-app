"use client";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "./animation_ln8irneu.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  renderer: "svg",
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function LoaderAnimation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    isClient && (
      <div className="flex justify-center items-center h-screen">
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
    )
  );
}
