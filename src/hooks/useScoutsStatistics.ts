import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_SCOUTS_STATISTICS = gql`
  query GetScoutsStatistics($period: String) {
    scoutsStatistics(period: $period) {
      totalScoutCount
      acceptedCount
    }
  }
`;

export function useScoutsStatistics(period: string) {
  const { data, loading, error, refetch } = useQuery(GET_SCOUTS_STATISTICS, {
    variables: { period },
  });

  const refetchStatistics = (newPeriod: string) => {
    refetch({ period: newPeriod });
  };

  return {
    totalScoutCount: data?.scoutsStatistics?.totalScoutCount || 0,
    acceptedCount: data?.scoutsStatistics?.acceptedCount || 0,
    loading,
    error,
    refetchStatistics,
  };
}