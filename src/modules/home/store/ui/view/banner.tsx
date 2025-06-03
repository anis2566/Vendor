"use client";
import { Sun } from "lucide-react";
import React, { useState } from "react";

function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-5 shadow-lg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-48 w-48 animate-pulse rounded-full bg-white opacity-10"></div>
        <div className="absolute top-5 right-10 h-20 w-20 animate-bounce rounded-full bg-white opacity-10 delay-300"></div>
        <div className="absolute bottom-4 left-1/3 h-24 w-24 animate-ping rounded-full bg-white opacity-10 [animation-duration:3s]"></div>
        <div className="absolute -right-10 -bottom-10 h-40 w-40 animate-pulse rounded-full bg-white opacity-10 delay-700"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center justify-center gap-4 text-center md:justify-start md:text-left">
          <div className="hidden animate-spin duration-9000 md:block">
            <Sun className="h-16 w-16 text-white" />
          </div>
          <div className="space-y-1">
            <span className="inline-flex animate-pulse rounded-md bg-white px-3 py-1 text-sm font-bold text-indigo-600 shadow-sm">
              25% OFF EVERYTHING
            </span>
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              Spring Sale Event
            </h3>
            <p className="text-base font-medium text-white/90">
              Use code{" "}
              <span className="rounded bg-white/20 px-2 py-0.5 font-bold tracking-wider text-white">
                SPRING25
              </span>{" "}
              at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
