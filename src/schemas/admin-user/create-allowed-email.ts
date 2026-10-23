import { z } from "zod";
import { AdminRole } from "@/graphql-client";

export const createAllowedEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません"),
  initialRole: z.nativeEnum(AdminRole),
});

export type CreateAllowedEmailFormData = z.infer<
  typeof createAllowedEmailSchema
>;
