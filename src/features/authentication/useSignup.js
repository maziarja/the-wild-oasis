import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("User successfully created");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  return { signup, isLoading };
}
