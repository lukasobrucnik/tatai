"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type NavContextValue = {
  active: string;
  setActive: (id: string) => void;
};

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("home");
  return <NavContext.Provider value={{ active, setActive }}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
