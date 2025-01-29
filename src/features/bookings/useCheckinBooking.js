import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckinBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isChecking, mutate: checkInBooking } = useMutation({
    mutationFn: ({ bookingId, obj }) => updateBooking(bookingId, obj),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully checked-in`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isChecking, checkInBooking };
}
