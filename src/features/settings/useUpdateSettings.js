import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  let queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => updateSettingApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("settings are successfully updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateSettings };
}
