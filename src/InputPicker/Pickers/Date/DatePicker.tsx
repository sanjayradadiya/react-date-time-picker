import React, { FC, useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { DateTime } from "luxon";
import { Value } from "react-calendar/dist/cjs/shared/types";
import '../../../styles/react-calendar.css';
import { DateFormat } from "../../util";
import { PickersProps } from "../../../types";

const DatePicker: FC<PickersProps> = ({ onChange, value, format, show }) => {
  const [date, setDate] = useState<string | null>();

  useEffect(() => {
    let initDate = DateTime.now().toFormat(format || DateFormat);
    if (value && value.trim() !== "") {
      initDate = value;
    }
    handleSetDate(initDate);
  }, [show]);

  const handleSetDate = useCallback((dateValue: any) => {
    const formattedDate = DateTime.fromFormat(dateValue, format || DateFormat)
      .startOf("day")
      .toISO();

    setDate(formattedDate);
  }, []);

  const handleOnChange = useCallback(
    (data: Value) => {
      if (data) {
        const parsedDate = DateTime.fromISO(
          new Date(data.toString()).toISOString()
        ).startOf("day");
        const formattedDate = parsedDate.toFormat(format || DateFormat);
        handleSetDate(formattedDate);
        onChange?.(formattedDate);
      }
    },
    [onChange, format]
  );
  return <>{show && <Calendar onChange={handleOnChange} value={date} />}</>;
};

export default DatePicker;
