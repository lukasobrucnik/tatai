import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Field, inputSkin } from "./form-field";

type BaseProps = {
  label?: string;
  hint?: string;
  required?: boolean;
  id?: string;
};

type SingleLine = BaseProps & InputHTMLAttributes<HTMLInputElement> & { multiline?: false };
type MultiLine = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

export function Input(props: SingleLine | MultiLine) {
  const { label, hint, required, id, multiline, ...rest } = props;
  if (multiline) {
    const { rows = 5, ...textareaRest } = rest as TextareaHTMLAttributes<HTMLTextAreaElement>;
    return (
      <Field label={label} hint={hint} required={required} htmlFor={id}>
        <textarea id={id} rows={rows} className={`${inputSkin} resize-y`} {...textareaRest} />
      </Field>
    );
  }
  return (
    <Field label={label} hint={hint} required={required} htmlFor={id}>
      <input id={id} className={inputSkin} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
    </Field>
  );
}
