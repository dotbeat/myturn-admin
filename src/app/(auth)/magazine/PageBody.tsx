"use client";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client/react";
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
import { GetMagazineQuery } from "@/graphql-client";
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
import { useAdminUser } from "@/lib/AdminUserProvider";

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
  const { canEdit } = useAdminUser();
  const [error, setError] = useState<string | null>(null);

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
  const { data: magazineData } = useQuery<GetMagazineQuery>(GET_MAGAZINE, {
    fetchPolicy: "network-only",
  });

  // 取得した保存済みサムネイル画像のURL
  const thumbnailSrcs = useMemo(() => {
    const srcs: Record<number, string> = {};
    magazineData?.magazines.forEach((article) => {
      srcs[article.id] = article.thumbnailUrl;
    });
    return srcs;
  }, [magazineData]);

  // 取得した記事をフォームの初期値に反映する
  useEffect(() => {
    if (!magazineData) return;
    const articles = magazineData.magazines.map((item) => ({
      articleId: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      thumbnail: null,
      articleUrl: item.articleUrl,
    }));
    initFormArticles.splice(0, articles.length, ...articles);
    methods.setValue("articles", initFormArticles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magazineData]);

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
          <Table className="bg-(--background)">
            <TableHead>
              <TableRow className="border border-(--myturn-support-middle) text-center text-base text-nowrap">
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
                    className="border-x border-b border-(--myturn-support-middle) odd:bg-(--myturn-border)"
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
                        disabled={!canEdit}
                        className="w-72"
                        inputClass="valid:border-(--myturn-support-middle)"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <TextField
                        name={`articles.${i}.description`}
                        rows={3}
                        disabled={!canEdit}
                        className="w-64"
                        inputClass="valid:border-(--myturn-support-middle)"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <TextField
                        name={`articles.${i}.category`}
                        disabled={!canEdit}
                        className="w-28"
                        inputClass="valid:border-(--myturn-support-middle)"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Box>
                        {canEdit && (
                          <File
                            name={`articles.${i}.thumbnail`}
                            accept="image/*"
                            buttonClass="text-nowrap rounded-md border border-(--myturn-sub-text) bg-(--myturn-background) px-2 py-1 text-sm"
                            onChangeFiles={({ file }) =>
                              changeOneOfThumbnail(article.articleId, file)
                            }
                          >
                            ファイルを選択
                          </File>
                        )}
                        {/* 入力画像のプレビュー */}
                        {thumbnails[article.articleId] && (
                          <Box className="mt-2 max-w-40">
                            <img
                              src={thumbnails[article.articleId].dataUrl}
                              alt="記事のサムネイル"
                              className="w-full object-contain"
                            />
                          </Box>
                        )}
                        {/* 保存済み画像の表示 */}
                        {!thumbnails[article.articleId] &&
                          thumbnailSrcs[article.articleId] && (
                            <Box className="mt-2 max-w-40">
                              <img
                                src={thumbnailSrcs[article.articleId]}
                                alt="記事のサムネイル"
                                className="w-full object-contain"
                              />
                            </Box>
                          )}
                      </Box>
                    </TableCell>
                    <TableCell className="p-2 pr-4">
                      <TextField
                        type="url"
                        name={`articles.${i}.articleUrl`}
                        disabled={!canEdit}
                        className="w-48"
                        inputClass="valid:border-(--myturn-support-middle)"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {error && (
            <Typography className="text-(--myturn-accent)">{error}</Typography>
          )}
          {canEdit && (
            <Button
              type="submit"
              className="rounded-full bg-(--myturn-main) px-4 py-3 text-(--foreground)"
            >
              {isUpdating ? "更新中..." : "更新する"}
            </Button>
          )}
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
