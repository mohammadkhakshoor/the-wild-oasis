import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

import { useForm } from "react-hook-form";
import { CustomSpinner } from "../../ui/Spinner";
import FormRow, { Error } from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...otherValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEditSession ? otherValues : {},
  });

  const { isCreatingCabin, createCabinFn } = useCreateCabin();
  const { isEditingCabin, EditCabinFn } = useEditCabin();

  const isWorking = isEditingCabin || isCreatingCabin;
  function onSubmit(data) {
    if (isEditSession) {
      EditCabinFn(
        { data: { ...data }, editId },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } else {
      createCabinFn(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    }
    // mutate({ ...data, image: data.image[0] });
  }
  // function onError(errs) {
  //   console.log(errs);
  // }

  if (isWorking) {
    return <CustomSpinner />;
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
