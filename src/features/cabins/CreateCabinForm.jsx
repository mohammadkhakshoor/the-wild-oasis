import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createAndEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Spinnerme } from "../../ui/Spinner";
import FormRow, { Error } from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, handleOpenForm }) {
  const { id: editId, ...otherValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEditSession ? otherValues : {},
  });

  const { isLoading: isCreatingCabin, mutate: createCabinFn } = useMutation({
    mutationFn: (data) => createAndEditCabin(data),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      handleOpenForm(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { isLoading: isEdittingCabin, mutate: EditCabinFn } = useMutation({
    mutationFn: ({ data, editId }) => createAndEditCabin(data, editId),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      handleOpenForm(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const isWorking = isEdittingCabin || isCreatingCabin;
  function onSubmit(data) {
    if (isEditSession) {
      EditCabinFn({ data: { ...data }, editId });
    } else {
      createCabinFn({ ...data, image: data.image[0] });
    }
    // mutate({ ...data, image: data.image[0] });
  }
  // function onError(errs) {
  //   console.log(errs);
  // }

  if (isWorking) {
    return <Spinnerme />;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="text"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "this field is required",
            validate: (value) => {
              return +value <= +getValues().regularPrice || "should be less than regular price";
            },
          })}
        />
      </FormRow>
      <FormRow label="Description for website">
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
        {errors?.image?.message && <Error>{errors?.image?.message}</Error>}
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
