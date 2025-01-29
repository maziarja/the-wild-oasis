import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isloading: isEditing } = useMutation({
    mutationKey: ["cabins"],
    mutationFn: ({ newCabinData, id }) => createEditCabins(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin successfuly edited");
      queryClient.invalidateQueries("[cabins]");
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}
