import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAndEditCabin } from "../../services/apiCabins";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEdittingCabin, mutate: EditCabinFn } = useMutation({
    mutationFn: ({ data, editId }) => createAndEditCabin(data, editId),
    onSuccess: () => {
      toast.success("Cabin Edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEdittingCabin, EditCabinFn };
}
export default useEditCabin;
