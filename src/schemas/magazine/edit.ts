import { z } from "zod";

const magazineItemSchema = z.object({
  articleId: z.coerce.number().min(1),
  title: z.string().trim().nonempty("タイトルを入力してください"),
  description: z.string().trim().nonempty("説明を入力してください"),
  category: z.string().trim().nonempty("カテゴリを入力してください"),
  thumbnail: z.custom<FileList | null>().refine((files) => {
    const file = files?.item(0);
    return (
      file == null || (file instanceof File && file.type.startsWith("image/"))
    );
  }, "画像ファイルを選択してください"),
  articleUrl: z.string().trim().url("URLを入力してください"),
});

export const magazineEditFormSchema = z.object({
  articles: z.array(magazineItemSchema).length(5),
});

export type MagazineEditFormData = z.infer<typeof magazineEditFormSchema>;
