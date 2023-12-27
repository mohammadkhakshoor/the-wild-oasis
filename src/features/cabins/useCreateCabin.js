import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAndEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreatingCabin, mutate: createCabinFn } = useMutation({
    mutationFn: (data) => createAndEditCabin(data),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreatingCabin, createCabinFn };
}
export default useCreateCabin;
