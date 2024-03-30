import React, { FC, useCallback, useRef, useState } from "react";
import { InputPickerProps } from "../types";
import Wrapper from "./Wrapper";
import TimePicker from "./Pickers/Time";
import DatePicker from "./Pickers/Date/DatePicker";
import DateTimePicker from "./Pickers/DateTime/DateTimePicker";
import { Clock, Calendar } from "../icons";

const InputPicker: FC<InputPickerProps> = ({
  value,
  onChange,
  format,
  type,
  onHide,
  onShow,
  selectedStyle,
  mainContainerClassName,
  mainContainerStyles,
}) => {
  const [show, setShow] = useState(false);
  const parentRef = useRef<HTMLSpanElement>(null);

  const onShowPicker = useCallback(() => {
    onShow?.();
    setShow(true);
  }, [onShow]);

  const onHidePicker = useCallback(() => {
    onHide?.();
    setShow(false);
  }, [onHide]);

  const Pickers = {
    date: DatePicker,
    time: TimePicker,
    dateTime: DateTimePicker,
  }[type];

  const Icon = {
    date: Calendar,
    time: Clock,
    dateTime: Calendar,
  }[type];

  return (
    <>
      <span ref={parentRef} onClick={onShowPicker}>
        <Icon />
      </span>
      <Wrapper show={show} setShow={onHidePicker} parentRef={parentRef}>
        {show && (
          <Pickers
            value={value}
            onChange={onChange}
            format={format}
            show={show}
            selectedStyle={selectedStyle}
            mainContainerClassName={mainContainerClassName}
            mainContainerStyles={mainContainerStyles}
          />
        )}
      </Wrapper>
    </>
  );
};

export default InputPicker;
