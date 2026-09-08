"use client";

import type { ReactNode } from "react";
import { useInquiryModal } from "./inquiry-modal-context";
import { Button, type Variant, type Size } from "./ui/button";

export function InquiryTriggerButton({
  variant,
  size,
  arrow,
  className,
  children,
}: {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { openModal } = useInquiryModal();
  return (
    <Button type="button" variant={variant} size={size} arrow={arrow} className={className} onClick={openModal}>
      {children}
    </Button>
  );
}
