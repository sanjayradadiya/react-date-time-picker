import Pickers from "./Pickers";
import DatePicker from "./Pickers/components/Date/DatePicker";
import TimePickerComponent from "./Pickers/components/Time/TimePicker";
import DateTimePicker from "./Pickers/components/DateTime/DateTimePicker";
import {
  PickerType,
  PickerProps,
  PickersProps,
  TimePickerProps,
} from "./types";
import { FC } from "react";

export { Pickers as InputPicker, DatePicker, DateTimePicker };
export type { PickerType, PickerProps, PickersProps as InputPickerProps };

export const TimePicker: FC<TimePickerProps> = TimePickerComponent;
