import type { SelectHTMLAttributes } from "react";
import { Field } from "./form-field";

export function Select({
  label,
  hint,
  required,
  id,
  options,
  placeholder = "Vyberte…",
  ...rest
}: {
  label?: string;
  hint?: string;
  required?: boolean;
  id?: string;
  options: string[];
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Field label={label} hint={hint} required={required} htmlFor={id}>
      <div className="relative">
        <select
          id={id}
          defaultValue=""
          className="w-full appearance-none font-body text-body-lg text-strong bg-transparent border-0 border-b border-border-strong rounded-none py-3 pr-7 min-h-12 outline-none cursor-pointer transition-colors duration-150 focus:border-signal-500 focus:border-b-2"
          {...rest}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <span
          aria-hidden
          className="absolute right-0.5 top-1/2 -mt-1.5 w-2 h-2 border-r border-b border-muted rotate-45 pointer-events-none"
        />
      </div>
    </Field>
  );
}
