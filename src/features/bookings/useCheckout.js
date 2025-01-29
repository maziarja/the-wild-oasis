import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOutBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkOutBooking } = useMutation({
    mutationFn: ({ bookingId, obj }) => updateBooking(bookingId, obj),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully checked-out`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCheckingOut, checkOutBooking };
}
