import { useQuery } from "@tanstack/react-query";

export function useDataFetch(
  queryKey: string[],
  fetchFunction: () => void,
  enabled: boolean
) {
  const { data, isLoading, refetch, isFetching, isPending, error } = useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    staleTime: Infinity,
    enabled,
  });

  const manualRefresh = async () => {
    const result = await refetch();
    return result.data !== data;
  };

  return { data, isLoading, error, isPending, isFetching, manualRefresh };
}
