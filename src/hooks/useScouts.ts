import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { ScoutFilterFormData } from "@/schemas/scout/filter";

const GET_SCOUTS = gql`
  query GetScoutsForAdmin(
    $filter: ScoutFilterInput
    $page: Float
    $limit: Float
  ) {
    scoutsForAdmin(filter: $filter, page: $page, limit: $limit) {
      scouts {
        id
        userId
        user {
          id
          name
          avatarUrl
        }
        companyId
        company {
          id
          name
          industry
        }
        jobId
        job {
          id
          title
          jobType
        }
        title
        content
        status
        acceptedAt
        createdAt
        updatedAt
      }
      totalCount
      totalPages
    }
  }
`;

export function useScouts(
  filter: ScoutFilterFormData,
  page: number,
  limit: number,
) {
  const { data, loading, error, refetch } = useQuery(GET_SCOUTS, {
    variables: {
      filter: {
        scoutDateStart: filter.scoutDateStart || undefined,
        scoutDateEnd: filter.scoutDateEnd || undefined,
        companyName: filter.companyName || undefined,
        jobTitle: filter.jobTitle || undefined,
        industry: filter.industry || undefined,
        status: filter.status || undefined,
      },
      page,
      limit,
    },
  });

  const scouts =
    data?.scoutsForAdmin?.scouts?.map((scout: any) => ({
      id: scout.id,
      userId: scout.user?.id || scout.userId,
      userName: scout.user?.name || "不明",
      userAvatar: scout.user?.avatarUrl,
      companyId: scout.company?.id || scout.companyId,
      companyName: scout.company?.name || "不明",
      jobId: scout.job?.id || scout.jobId,
      jobTitle: scout.job?.title || "不明",
      industry: scout.company?.industry,
      jobType: scout.job?.jobType,
      status: scout.status,
      createdAt: scout.createdAt,
    })) || [];

  return {
    scouts,
    totalCount: data?.scoutsForAdmin?.totalCount || 0,
    totalPages: data?.scoutsForAdmin?.totalPages || 1,
    loading,
    error,
    refetch,
  };
}
