"use client";
import { useState } from "react";
import {
  DefaultValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  MagazineEditFormData,
  magazineEditFormSchema,
} from "@/schemas/magazine/edit";
import PageTitle from "@/components/common/PageTitle";
import TextField from "@/components/common/form/TextField";
import File from "@/components/common/form/File";

export default function PageBody() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initForm: DefaultValues<MagazineEditFormData> = {
    articles: new Array(5).fill(null).map(() => ({
      title: "",
      description: "",
      category: "",
      thumbnail: null,
      url: "",
    })),
  };
  const methods = useForm<MagazineEditFormData>({
    resolver: zodResolver(magazineEditFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initForm,
  });
  const articlesControl = useFieldArray({
    control: methods.control,
    name: "articles",
  });

  const onSubmit = async (data: MagazineEditFormData) => {
    setIsSubmitting(true);
    try {
      // @todo フォームデータをGraphQLミューテーションの入力形式に変換
      // @todo ジョブ更新ミューテーションを実行

      setError(null);
    } catch (err) {
      console.error("Magazine更新中にエラーが発生しました:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Magazine更新中にエラーが発生しました",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">Magazine管理</PageTitle>
      <FormProvider {...methods}>
        <form
          method="POST"
          className="flex flex-col items-center gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Table className="bg-[var(--background)]">
            <TableHead>
              <TableRow className="text-nowrap border border-[var(--myturn-support-middle)] text-center text-base">
                <TableCell className="p-2"></TableCell>
                <TableCell className="p-2">タイトル</TableCell>
                <TableCell className="p-2">説明</TableCell>
                <TableCell className="p-2">カテゴリ</TableCell>
                <TableCell className="p-2">サムネイル</TableCell>
                <TableCell className="p-2">記事URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articlesControl.fields.map((article, i) => {
                return (
                  <TableRow
                    key={article.id}
                    className="border-x border-b border-[var(--myturn-support-middle)] odd:bg-[var(--myturn-border)]"
                  >
                    <TableCell className="p-2 pl-4">{i + 1}</TableCell>
                    <TableCell className="p-2">
                      <TextField
                        name={`articles.${i}.title`}
                        className="w-72"
                        inputClass="valid:border-[var(--myturn-support-middle)]"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <TextField
                        name={`articles.${i}.description`}
                        rows={3}
                        className="w-64"
                        inputClass="valid:border-[var(--myturn-support-middle)]"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <TextField
                        name={`articles.${i}.category`}
                        className="w-28"
                        inputClass="valid:border-[var(--myturn-support-middle)]"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <File
                        name={`articles.${i}.thumbnail`}
                        accept="image/*"
                        buttonClass="text-nowrap rounded-md border border-[var(--myturn-sub-text)] bg-[var(--myturn-background)] px-2 py-1 text-sm"
                      >
                        ファイルを選択
                      </File>
                    </TableCell>
                    <TableCell className="p-2 pr-4">
                      <TextField
                        type="url"
                        name={`articles.${i}.url`}
                        className="w-48"
                        inputClass="valid:border-[var(--myturn-support-middle)]"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {error && (
            <Typography className="text-[var(--myturn-accent)]">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            className="rounded-full bg-[var(--myturn-main)] px-4 py-3 text-[var(--foreground)]"
          >
            {isSubmitting ? "更新中..." : "更新する"}
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
}
