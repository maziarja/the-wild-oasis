import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isloading: isCreating } = useMutation({
    mutationKey: ["cabins"],
    mutationFn: createEditCabins,
    onSuccess: () => {
      toast.success("cabin successfuly added");
      queryClient.invalidateQueries("[cabins]");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
