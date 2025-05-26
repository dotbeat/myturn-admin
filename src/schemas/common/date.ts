import { z } from "zod";

export function ruleDateNullable(message?: string) {
  return z.custom<string | null>(
    (value: string | null) => {
      if (value == null) {
        return true;
      }
      const valueAsDate = new Date(value);
      return !Number.isNaN(valueAsDate.getTime());
    },
    { message },
  );
}
