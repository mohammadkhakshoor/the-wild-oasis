import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAndEditCabin } from "../../services/apiCabins";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditingCabin, mutate: EditCabinFn } = useMutation({
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
  return { isEditingCabin, EditCabinFn };
}
export default useEditCabin;
