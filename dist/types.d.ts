import { CSSProperties, FC } from 'react';

type PickerType = "date" | "time" | "dateTime";
interface PickerProps extends PickerBoxStylesProps {
    onChange?: (data: string) => void;
    value: string;
    /**
     * Format string to customize the display format of the value.
     * The format string follows Luxon's formatting syntax.
     * Input and output formatting will be same.
     * And value formate must be same as pass formate.
     * Default formate(date: yyyy-LL-dd (Iso date formate), time: hh:mm:ss a, dateTime: yyyy-LL-dd hh:mm:ss a)
     * a is AM and PM
     * @example "yyyy-LL-dd hh:mm:ss a Z" (for reference to Luxon formatting, You can also handle zone)
     */
    format?: string;
    show?: boolean;
    selectedStyle?: CSSProperties;
    outputZone?: string;
}
/**
 * Props for customizing the styles of the main container component that contains all the pickers.
 */
interface PickerBoxStylesProps {
    mainContainerClassName?: string;
    mainContainerStyles?: CSSProperties;
}
interface DatePickerProps extends PickerProps {
}
interface TimePickerProps extends PickerProps {
}
interface PickersProps extends Omit<PickerProps, "show"> {
    type: PickerType;
    onHide?: () => void;
    onShow?: () => void;
}

declare const Pickers: FC<PickersProps>;

declare const DatePicker: FC<DatePickerProps>;

declare const DateTimePicker: FC<PickerProps>;

declare const TimePicker: FC<TimePickerProps>;

export { DatePicker, DateTimePicker, Pickers as InputPicker, type PickersProps as InputPickerProps, type PickerProps, type PickerType, TimePicker };
