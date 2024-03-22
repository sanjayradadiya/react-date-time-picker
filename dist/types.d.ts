import { FC } from 'react';

type PickerType = "date" | "time" | "dateTime";
interface PickersProps {
    onChange?: (data: string) => void;
    value: string;
    format?: string;
    show: boolean;
}
interface InputPickerProps extends Omit<PickersProps, "show"> {
    type: PickerType;
    onHide?: () => void;
    onShow?: () => void;
}

declare const InputPicker: FC<InputPickerProps>;

export { InputPicker, type InputPickerProps, type PickerType, type PickersProps };
