"use client";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MagazineType } from "@/graphql-client";
import {
  MagazineEditFormData,
  magazineEditFormSchema,
} from "@/schemas/magazine/edit";
import { UPDATE_MAGAZINE } from "@/server/graphql/magazine/mutations";
import { GET_MAGAZINE } from "@/server/graphql/magazine/query";
import { blobToDataUrl } from "@/utils/frontend/file";
import PageTitle from "@/components/common/PageTitle";
import TextField from "@/components/common/form/TextField";
import File from "@/components/common/form/File";

type EditingMagazineItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  articleUrl: string;
  thumbnailUrl: string;
  thumbnailBase64: string;
  thumbnailMimeType: string;
};

export default function PageBody() {
  const [error, setError] = useState<string | null>(null);

  // 取得した保存済みサムネイル画像のURL
  const [thumbnailSrcs, setThumbnailSrcs] = useState<Record<number, string>>(
    {},
  );
  // 入力中のサムネイル画像
  const [thumbnails, setThumbnails] = useState<
    Record<number, { dataUrl: string; type: string }>
  >({});

  // トースト通知の状態
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // トースト通知を閉じる
  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  // トースト通知を表示
  const showToast = (
    message: string,
    severity: "success" | "error" | "info" | "warning",
  ) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  // Magazineデータ更新
  const [updateArticles, { loading: isUpdating }] = useMutation(
    UPDATE_MAGAZINE,
    {
      onCompleted: () => {
        // 更新成功時のトースト表示
        showToast("記事情報が更新されました", "success");
      },
      onError: (error) => {
        console.error("更新中にエラーが発生しました:", error);
        setError(error.message || "更新中にエラーが発生しました");
        // エラー時のトースト表示
        showToast("更新中にエラーが発生しました", "error");
      },
    },
  );

  const initFormArticles: MagazineEditFormData["articles"] = new Array(5)
    .fill(null)
    .map((article, i) => ({
      articleId: i + 1,
      title: "",
      description: "",
      category: "",
      thumbnail: null,
      articleUrl: "",
    }));
  const methods = useForm<MagazineEditFormData>({
    resolver: zodResolver(magazineEditFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: { articles: initFormArticles },
  });
  const articlesControl = useFieldArray({
    control: methods.control,
    name: "articles",
  });

  // Magazineデータ取得
  useQuery(GET_MAGAZINE, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const fetchedMagazine: Pick<
        MagazineType,
        | "id"
        | "title"
        | "description"
        | "category"
        | "thumbnailUrl"
        | "articleUrl"
      >[] = data.magazines;
      const initThumbnailSrcs: Record<number, string> = {};
      fetchedMagazine.forEach((article) => {
        initThumbnailSrcs[article.id] = article.thumbnailUrl;
      });
      setThumbnailSrcs(initThumbnailSrcs);

      const articles = fetchedMagazine.map((item) => ({
        articleId: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        thumbnail: null,
        articleUrl: item.articleUrl,
      }));
      initFormArticles.splice(0, articles.length, ...articles);
      methods.setValue("articles", initFormArticles);
    },
  });

  const changeOneOfThumbnail = async (articleId: number, file: File | null) => {
    const editingThumbnails = { ...thumbnails };
    if (file) {
      editingThumbnails[articleId] = {
        dataUrl: await blobToDataUrl(file),
        type: file.type,
      };
      setThumbnails(editingThumbnails);
    } else {
      delete editingThumbnails[articleId];
      setThumbnails(editingThumbnails);
    }
  };

  // フォームデータをGraphQLミューテーションの入力形式に変換する関数
  const convertFormDataToUpdateInput = async (data: MagazineEditFormData) => {
    // 記事情報の処理
    const articlesInput = await Promise.all(
      data.articles.map(async (article) => {
        const articleData: EditingMagazineItem = {
          id: article.articleId,
          title: article.title,
          description: article.description,
          category: article.category,
          articleUrl: article.articleUrl,
          thumbnailUrl: thumbnailSrcs[article.articleId] ?? "",
          thumbnailBase64: "",
          thumbnailMimeType: "",
        };

        const thumbnail = thumbnails[article.articleId];
        if (thumbnail) {
          // data:image/jpeg;base64, の部分を削除
          articleData.thumbnailBase64 = thumbnail.dataUrl.split(",")[1];
          articleData.thumbnailMimeType = thumbnail.type;
        }

        return articleData;
      }),
    );

    // 更新用の入力データを作成
    return { magazines: articlesInput };
  };

  const onSubmit = async (data: MagazineEditFormData) => {
    try {
      // フォームデータをGraphQLミューテーションの入力形式に変換
      const updateInput = await convertFormDataToUpdateInput(data);
      // 更新ミューテーションを実行
      await updateArticles({
        variables: { input: updateInput },
      });

      setError(null);
    } catch (err) {
      console.error("Magazine更新中にエラーが発生しました:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Magazine更新中にエラーが発生しました",
      );
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
                      <input
                        type="hidden"
                        name={`articles.${i}.articleId`}
                        value={article.articleId}
                      />
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
                        onChangeFiles={({ file }) =>
                          changeOneOfThumbnail(article.articleId, file)
                        }
                      >
                        ファイルを選択
                      </File>
                    </TableCell>
                    <TableCell className="p-2 pr-4">
                      <TextField
                        type="url"
                        name={`articles.${i}.articleUrl`}
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
            {isUpdating ? "更新中..." : "更新する"}
          </Button>
        </form>
      </FormProvider>

      {/* トースト通知 */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
