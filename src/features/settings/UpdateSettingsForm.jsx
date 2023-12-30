import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { CustomSpinner } from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, settings: { minBookingLength, maxBookingLength, maxGuestPerBooking, breakfastPrice } = {} } =
    useSettings();
  const { isUpdating, updateSettings } = useUpdateSettings();

  function handleUpdate(e, field) {
    updateSettings({ [field]: e.target.value });
  }

  if (isLoading) return <CustomSpinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
          defaultValue={minBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
          defaultValue={maxBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
          disabled={isUpdating}
          defaultValue={maxGuestPerBooking}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
