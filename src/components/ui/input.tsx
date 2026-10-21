import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
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
  const { label, hint, required, id: idProp, multiline, ...rest } = props;
  // Bez id label s polem nesouvisí: čtečka obrazovky pole nepojmenuje a klepnutí
  // na popisek na telefonu do pole neskočí. useId, protože formulář je na
  // stránce dvakrát (v sekci Kontakt a v modalu).
  const uid = useId();
  const id = idProp ?? uid;
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
