import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constans";

export function useGetBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // 1) FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // 2) SORT
  const sortValue = searchParams.get("sortBy") || "totalPrice-desc";
  const sortBy = !sortValue
    ? null
    : {
        field: "sortBy",
        value: sortValue,
        method: "order",
      };
  // 3) PAGINATION

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : null;
  // QUERY
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  const bookings = data?.data;
  const count = data?.count;

  // PREFETCHING
  const numOfPages = Math.ceil(count / PAGE_SIZE);
  if (currentPage < numOfPages) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
    });
  }

  return { isLoading, bookings, count, error };
}
