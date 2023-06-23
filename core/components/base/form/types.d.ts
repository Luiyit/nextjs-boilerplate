import type { ControllerProps as CP } from 'react-hook-form';

export interface FieldDataType {
  field: ControllerRenderProps<FieldValues>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}

interface ControllerProps extends Omit<CP, "render"> {
  label?: string;
  fieldData: FieldDataType;
}

export type Type =  "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";