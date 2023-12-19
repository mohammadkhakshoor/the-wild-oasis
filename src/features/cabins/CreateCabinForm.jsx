import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Spinnerme } from "../../ui/Spinner";
import FormRow, { Error } from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  console.log(errors);
  const { isLoading: isCreatingCabin, mutate } = useMutation({
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
    console.log(data.image[0].name);
    console.log(data);
  }
  // function onError(errs) {
  //   console.log(errs);
  // }

  if (isCreatingCabin) {
    return <Spinnerme />;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isCreatingCabin}
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
          disabled={isCreatingCabin}
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
          disabled={isCreatingCabin}
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
          disabled={isCreatingCabin}
          {...register("discount", {
            required: "this field is required",
            validate: (value) => {
              console.log(value, +getValues().regularPrice);
              return +value <= +getValues().regularPrice || "should be less than regular price";
            },
          })}
        />
      </FormRow>
      <FormRow label="Description for website">
        <Textarea
          type="number"
          disabled={isCreatingCabin}
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
          disabled={isCreatingCabin}
          {...register("image", {
            required: "this field is required",
          })}
        />
        {errors?.image?.message && <Error>{errors?.image?.message}</Error>}
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
