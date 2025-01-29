import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAccount as updateUserAccountApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserAccountApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("User successfully updated");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });
  return { updateUser, isUpdating };
}
