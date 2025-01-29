import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/login", { replace: true });
      toast.success("Loged out");
      queryClient.removeQueries();
    },
    onError: (err) => {
      toast.error("user could not log out successfully");
      console.log(err.message);
    },
  });
  return { logout, isLoading };
}
