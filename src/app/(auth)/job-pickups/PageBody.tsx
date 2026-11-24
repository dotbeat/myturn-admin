"use client";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import {
  Alert,
  Box,
  Link,
  Pagination,
  PaginationItem,
  Snackbar,
  Typography,
} from "@mui/material";
import { GetJobPickupPeriodsQuery } from "@/graphql-client";
import { GET_JOB_PICKUP_PERIODS } from "@/server/graphql/job-pickup/queries";
import { JobPickup, NotifyFn } from "@/types/job-pickup";
import { ConvertUrlParamEntry } from "@/utils/frontend/form";
import { toJstDateString } from "@/utils/shared/date";
import PageTitle from "@/components/common/PageTitle";
import JobPickupCreateForm from "@/components/job-pickup/JobPickupCreateForm";
import JobPickupTable from "@/components/job-pickup/JobPickupTable";
import JobPickupEditDialog from "@/components/job-pickup/JobPickupEditDialog";
import JobPickupDeleteDialog from "@/components/job-pickup/JobPickupDeleteDialog";
import { useAdminUser } from "@/lib/AdminUserProvider";

const PAGE_PATH = "/job-pickups";

export default function PageBody() {
  const { canEdit } = useAdminUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsConverter = new ConvertUrlParamEntry(searchParams);
  const page = paramsConverter.toNumber("page", 1);
  const limit = paramsConverter.toNumber("limit", 30);

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const notify = useCallback<NotifyFn>((message, severity) => {
    setToast({ open: true, message, severity });
  }, []);

  const [editingPickup, setEditingPickup] = useState<JobPickup | null>(null);
  const [deletingPickup, setDeletingPickup] = useState<JobPickup | null>(null);

  const { loading, data, refetch } = useQuery<GetJobPickupPeriodsQuery>(
    GET_JOB_PICKUP_PERIODS,
    { fetchPolicy: "no-cache", variables: { input: { page, limit } } },
  );
  const result = data?.jobPickupPeriods;
  const pickups: JobPickup[] =
    result?.items.map((item) => ({
      id: item.id,
      jobId: item.jobId,
      jobTitle: item.jobTitle,
      startDate: toJstDateString(item.startAt),
      endDate: toJstDateString(item.endAt),
      amount: item.amount,
      searchHitCount: item.searchHitCount,
      pvCount: item.pvCount,
      entryCount: item.entryCount,
      companyName: item.companyName,
      jobType: item.jobType,
      industry: item.industry,
    })) ?? [];

  // 追加した求人が一覧のどこに入るかは開始日次第のため、1ページ目に戻して再取得する
  const resetPaginateAndList = () => {
    if (page !== 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("page");
      router.push(`${PAGE_PATH}${newParams.size ? `?${newParams}` : ""}`);
    } else {
      refetch();
    }
  };

  const getPageHref = (targetPage: number | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (!targetPage || targetPage === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(targetPage));
    }
    return `${PAGE_PATH}${newParams.size ? "?" : ""}${newParams}`;
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">求人ピックアップ</PageTitle>

      {canEdit && (
        <JobPickupCreateForm onCreated={resetPaginateAndList} notify={notify} />
      )}

      <Box className="mt-8">
        <Typography className="mb-2 px-4 text-lg font-semibold">
          ピックアップ一覧 {result?.totalCount ?? 0} 件
        </Typography>
        <JobPickupTable
          pickups={pickups}
          loading={loading}
          canEdit={canEdit}
          onEdit={setEditingPickup}
          onDelete={setDeletingPickup}
        />
        <Box className="flex justify-center">
          <Pagination
            count={result?.totalPages ?? 0}
            page={page}
            shape="rounded"
            renderItem={(item) => (
              <PaginationItem
                component={item.page !== page ? Link : Box}
                {...item}
                href={getPageHref(item.page)}
              />
            )}
          />
        </Box>
      </Box>

      <JobPickupEditDialog
        pickup={editingPickup}
        onClose={() => setEditingPickup(null)}
        onUpdated={() => {
          setEditingPickup(null);
          refetch();
        }}
        notify={notify}
      />
      <JobPickupDeleteDialog
        pickup={deletingPickup}
        onClose={() => setDeletingPickup(null)}
        onDeleted={() => {
          setDeletingPickup(null);
          refetch();
        }}
        notify={notify}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
