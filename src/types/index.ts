export type PickerType = "date" | "time" | "dateTime";

export interface PickersProps {
  onChange?: (data: string) => void;
  value: string;
  format?: string;
  show: boolean;
}

export interface InputPickerProps extends Omit<PickersProps, "show"> {
  type: PickerType;
  onHide?: () => void;
  onShow?: () => void;
}
