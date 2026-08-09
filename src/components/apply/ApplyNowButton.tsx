"use client";

import { type ReactNode } from "react";
import { useApply } from "./ApplyContext";

export default function ApplyNowButton({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { openApply } = useApply();
  return (
    <button
      type="button"
      onClick={() => {
        openApply();
        onClick?.();
      }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
