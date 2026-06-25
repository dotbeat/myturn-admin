import { z } from "zod";
import { applyStatuses } from "@/utils/shared/applicant";

export const updateEntrySchema = z.object({
  status: z.enum([...applyStatuses]), // ステータス
  interviewScheduledAt: z.string(), // 1回目面談日 (yyyy-MM-dd または空)
  secondInterviewScheduledAt: z.string(), // 2回目面談日 (yyyy-MM-dd または空)
  joinDate: z.string(), // 入社予定日 (jobOfferScheduledAt / yyyy-MM-dd または空)
});

export type UpdateEntryFormData = z.infer<typeof updateEntrySchema>;
