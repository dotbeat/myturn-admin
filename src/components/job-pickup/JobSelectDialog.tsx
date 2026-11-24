"use client";
import { useState } from "react";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { useQuery } from "@apollo/client/react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { SearchJobsWithStatsQuery } from "@/graphql-client";
import { SEARCH_JOB } from "@/server/graphql/job/queries";
import {
  industries,
  industriesAndEmpty,
  jobTypes,
  jobTypesAndEmpty,
} from "@/const/job";
import { getSelectItem } from "@/utils/shared/select";
import Select from "@/components/common/form/Select";
import TextField from "@/components/common/form/TextField";
import Table, { TableColumn } from "@/components/common/Table";

type JobSelectCondition = {
  title: string; // 求人名(部分一致)
  companyName: string; // 企業名(部分一致)
  jobType: string; // 職種
  industry: string; // 業界
};

const emptyCondition: JobSelectCondition = {
  title: "",
  companyName: "",
  jobType: "",
  industry: "",
};

// 一度に読み込む件数
const LIMIT = 20;

const columns = [
  { property: "id", label: "ID" },
  { property: "title", label: "求人名" },
  { property: "companyName", label: "企業名" },
  { property: "jobType", label: "職種", headCellClass: "text-nowrap" },
  { property: "industry", label: "業界", headCellClass: "text-nowrap" },
  { property: "action", label: "" },
] as const satisfies TableColumn[];

const toInput = (condition: JobSelectCondition, page: number) => ({
  title: condition.title.trim(),
  companyName: condition.companyName.trim(),
  jobType: condition.jobType,
  industry: condition.industry,
  status: "ACTIVE", // 公開中の求人のみ
  page,
  limit: LIMIT,
});

/** 公開中の求人を検索して1件選択するダイアログ */
export default function JobSelectDialog({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (jobId: number) => void;
}) {
  // 検索条件はダイアログを閉じても保持する
  const methods = useForm<JobSelectCondition>({
    defaultValues: emptyCondition,
  });
  const [condition, setCondition] =
    useState<JobSelectCondition>(emptyCondition);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle className="font-semibold">求人を選択</DialogTitle>
      <JobSelectDialogContent
        methods={methods}
        condition={condition}
        onSearch={setCondition}
        onSelect={onSelect}
      />
    </Dialog>
  );
}

function JobSelectDialogContent({
  methods,
  condition,
  onSearch,
  onSelect,
}: {
  methods: UseFormReturn<JobSelectCondition>;
  condition: JobSelectCondition;
  onSearch: (condition: JobSelectCondition) => void;
  onSelect: (jobId: number) => void;
}) {
  const [loadingMore, setLoadingMore] = useState(false);

  // 検索条件が変わると1ページ目から取得し直す
  const { data, previousData, loading, fetchMore } =
    useQuery<SearchJobsWithStatsQuery>(SEARCH_JOB, {
      fetchPolicy: "no-cache",
      variables: { input: toInput(condition, 1) },
    });
  // 再取得中も前回の結果を表示し続ける
  const result = (data ?? previousData)?.searchJobsWithStats;
  const jobs = result?.items ?? [];
  // pageは最後に読み込んだページ番号(追加読み込みのたびに更新される)
  const hasMore = (result?.page ?? 0) < (result?.totalPages ?? 0);

  // 次の20件を取得して一覧の末尾に追加する
  const loadMore = async () => {
    setLoadingMore(true);
    try {
      await fetchMore({
        variables: {
          input: toInput(condition, (result?.page ?? 0) + 1),
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const loadedIds = new Set(
            prev.searchJobsWithStats?.items.map((job) => job.id),
          );
          return {
            ...fetchMoreResult,
            searchJobsWithStats: {
              ...fetchMoreResult.searchJobsWithStats,
              items: [
                ...(prev.searchJobsWithStats?.items ?? []),
                // 取得の合間に求人が追加されページがずれた場合の重複を除く
                ...fetchMoreResult.searchJobsWithStats.items.filter(
                  (job) => !loadedIds.has(job.id),
                ),
              ],
            },
          };
        },
      });
    } finally {
      setLoadingMore(false);
    }
  };

  const rows = jobs.map((job) => ({
    id: job.id,
    title: (
      <Typography
        title={job.title}
        className="line-clamp-3 min-w-36 text-left text-sm"
      >
        {job.title}
      </Typography>
    ),
    companyName: (
      <Typography
        title={job.companyName}
        className="line-clamp-3 text-left text-sm"
      >
        {job.companyName}
      </Typography>
    ),
    jobType: getSelectItem(jobTypes, job.jobType)?.label ?? "",
    industry: getSelectItem(industries, job.industry)?.label ?? "",
    action: (
      <Button
        className="border border-(--myturn-sub-text) px-2 py-1 text-nowrap"
        onClick={() => onSelect(job.id)}
      >
        選択する
      </Button>
    ),
  }));

  return (
    <DialogContent>
      <FormProvider {...methods}>
        <form
          className="mb-4 flex flex-wrap items-end gap-4"
          onSubmit={(e) => {
            // ポータル描画でもReactのsubmitイベントは祖先の<form>へ伝播するため、親フォーム内に置かれても誤送信しないよう止める
            e.stopPropagation();
            methods.handleSubmit(onSearch)(e);
          }}
        >
          <TextField name="title" label="求人名" className="w-48" autoFocus />
          <TextField name="companyName" label="企業名" className="w-48" />
          <Select
            name="jobType"
            label="職種"
            items={jobTypesAndEmpty("")}
            className="w-40"
          />
          <Select
            name="industry"
            label="業界"
            items={industriesAndEmpty("")}
            className="w-40"
          />
          <Button
            type="submit"
            disabled={loading}
            className="mb-1 rounded-full bg-(--myturn-background) px-4 py-2 disabled:opacity-50"
          >
            検索
          </Button>
        </form>
      </FormProvider>

      <Typography className="mb-1 text-sm text-(--myturn-sub-text)">
        公開中の求人 {result?.totalCount ?? 0} 件
      </Typography>
      <Table
        columns={columns}
        rows={rows}
        className={loading && !loadingMore ? "opacity-60" : ""}
      />
      {result && jobs.length === 0 && (
        <Typography className="py-4 text-center text-sm text-(--myturn-sub-text)">
          該当する求人がありません
        </Typography>
      )}
      {hasMore && (
        <Box className="mt-2 flex justify-center">
          <Button
            disabled={loading}
            onClick={loadMore}
            className="rounded-full border border-(--myturn-sub-text) px-4 py-1"
          >
            {loadingMore ? "読み込み中..." : `さらに${LIMIT}件表示する`}
          </Button>
        </Box>
      )}
    </DialogContent>
  );
}
