import { z } from "zod";
import { updateTicketSchema } from "./update-accept-ticket";

export const createTicketSchema = updateTicketSchema.extend({
  companyId: z.coerce.number().int().min(1, "企業を選択してください"),
});

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;
