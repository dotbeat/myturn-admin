import { z } from "zod";

export function ruleDateNullable(message?: string) {
  return z.preprocess(
    (value: string | null) => value || null,
    z.custom<string | null>(
      (value) => {
        if (value == null) {
          return true;
        }
        const valueAsDate = new Date(value as string);
        return !Number.isNaN(valueAsDate.getTime());
      },
      { message },
    ),
  );
}
