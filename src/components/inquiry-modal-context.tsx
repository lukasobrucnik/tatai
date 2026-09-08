"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { InquiryModal } from "./inquiry-modal";
import { InquiryForm } from "./inquiry-form";

type InquiryModalContextValue = { openModal: () => void };

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null);

// One <InquiryForm> instance lives here, shared by every trigger (hero,
// header, anywhere else). Whoever fills it in — via the popup or by
// scrolling to #kontakt — submits the exact same fields under the exact
// same rules, so a backend only ever has to handle one shape of payload.
export function InquiryModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <InquiryModalContext.Provider value={{ openModal: () => setOpen(true) }}>
      {children}
      <InquiryModal open={open} onClose={() => setOpen(false)}>
        <InquiryForm />
      </InquiryModal>
    </InquiryModalContext.Provider>
  );
}

export function useInquiryModal() {
  const ctx = useContext(InquiryModalContext);
  if (!ctx) throw new Error("useInquiryModal must be used within InquiryModalProvider");
  return ctx;
}
