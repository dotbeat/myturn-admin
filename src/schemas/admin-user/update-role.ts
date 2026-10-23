import { z } from "zod";
import { AdminRole } from "@/graphql-client";

export const updateRoleSchema = z.object({
  role: z.nativeEnum(AdminRole),
});

export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;
