import { CSSProperties, ReactNode } from "react";

// Define the type of picker: date, time, or dateTime
export type PickerType = "date" | "time" | "dateTime";

// Props shared across different types of pickers
export interface PickersProps extends PickerBoxStylesProps {
  // Callback function invoked when the value of the picker changes
  onChange?: (data: string) => void;
  // Current value of the picker
  value: string;
  /**
   * Format string to customize the display format of the value.
   * The format string follows Luxon's formatting syntax.
   * Input and output formatting will be same.
   * And value formate must be same as pass formate.
   * Default formate(date: yyyy-LL-dd (Iso date formate), time: hh:mm:ss a, dateTime: yyyy-LL-dd hh:mm:ss a)
   * @example "yyyy-LL-dd hh:mm:ss a Z" (for reference to Luxon formatting, You can also handle zone)
   */
  format?: string;

  // Boolean flag to control the visibility of the picker
  show?: boolean;
  // Custom class name for the picker component
  className?: string;
}

/**
 * Props for customizing the styles of the main container component that contains all the pickers.
 */
export interface PickerBoxStylesProps {
  // Custom class name for the main container component
  mainContainerClassName?: string;
  // Inline styles for the main container component
  mainContainerStyles?: CSSProperties;
}

// Props for the main container component that holds pickers
export interface PickerBoxProps extends PickerBoxStylesProps {
  // Child elements to be rendered within the picker box
  children: ReactNode;
}

// Props specific to the TimeComponent picker
export interface TimeComponentProps extends PickersProps {
  // Inline styles for the selected time element
  selectedTimeStyle?: CSSProperties;
}

// Props specific to the InputPicker picker
export interface InputPickerProps extends Omit<PickersProps, "show"> {
  // Type of picker: date, time, or dateTime
  type: PickerType;
  // Callback function invoked when the picker is hidden
  onHide?: () => void;
  // Callback function invoked when the picker is shown
  onShow?: () => void;
}
