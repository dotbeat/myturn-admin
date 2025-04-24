import { z } from "zod";

export function ruleDateNullable(message?: string) {
  return z.preprocess(
    (value) => (value ? new Date(value as string) : null),
    z.date({ message }).nullable(),
  ); // 登録日(開始)
}
