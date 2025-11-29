"use client";

import { initializeDb } from "@/lib/db";
import { useEffect } from "react";

export function DbProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeDb();
  }, []);

  return <>{children}</>;
}