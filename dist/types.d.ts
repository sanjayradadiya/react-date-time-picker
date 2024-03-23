import { FC } from 'react';

type PickerType = "date" | "time" | "dateTime";
interface PickersProps {
    onChange?: (data: string) => void;
    value: string;
    format?: string;
    show?: boolean;
}
interface InputPickerProps extends Omit<PickersProps, "show"> {
    type: PickerType;
    onHide?: () => void;
    onShow?: () => void;
}

declare const InputPicker: FC<InputPickerProps>;

declare const DatePicker: FC<PickersProps>;

declare const TimePicker: FC<PickersProps>;

declare const DateTimePicker: FC<PickersProps>;

export { DatePicker, DateTimePicker, InputPicker, type InputPickerProps, type PickerType, type PickersProps, TimePicker };
