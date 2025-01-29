import { useQuery } from "@tanstack/react-query";
import { user } from "../../services/apiAuth";

export function useUser() {
  const { data: users, isLoading } = useQuery({
    queryFn: user,
    queryKey: ["user"],
  });
  const isAuthorize = users?.role === "authenticated";
  return { users, isAuthorize, isLoading };
}
