import React, { FC, useCallback, useEffect, useState } from "react";
import TimePicker from "../Time";
import { DateTime, Settings } from "luxon";
import DatePicker from "../Date/DatePicker";
import { DateFormat, DateTimeFormat, TimeFormat } from "../../util";
import colors from "../../../styles/colors";
import { PickersProps } from "../../../types";

interface state {
  date: string;
  time: string;
}
const DateTimePicker: FC<PickersProps> = ({
  value,
  onChange,
  format,
  show,
}) => {
  const [dateTime, setDateTime] = useState<state>({ date: "", time: "" });
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (init && show) {
      return;
    }
    const zone = Settings.defaultZone.name;
    let datePart = "";
    let timePart = "";
    if (value && value.trim() !== "") {
      const convertedDateTime = DateTime.fromFormat(
        value,
        format || DateTimeFormat,
        {
          locale: "en-US",
        }
      ).setZone(zone);
      datePart = convertedDateTime.toFormat(DateFormat);
      timePart = convertedDateTime.toFormat(TimeFormat);

      const outputFormateDateTime = convertedDateTime.toFormat(
        format || DateTimeFormat
      );
      onChange?.(outputFormateDateTime);
      setInit(true);
    }
    setDateTime({ date: datePart, time: timePart });
  }, [show, value]);

  const handleChange = useCallback(
    (data: string, key: keyof state) => {
      let outputFormateDateTime = "";
      setDateTime((prev) => {
        const prevDateTime = { ...prev, [key]: data };
        if (prevDateTime.date === "") {
          prevDateTime.date = DateTime.now().toFormat(DateFormat);
        }
        if (prevDateTime.time === "") {
          prevDateTime.time = DateTime.now().toFormat(TimeFormat);
        }
        outputFormateDateTime = DateTime.fromFormat(
          `${prevDateTime.date} ${prevDateTime.time}`,
          DateTimeFormat
        ).toFormat(format || DateTimeFormat);
        onChange?.(outputFormateDateTime);
        return prevDateTime;
      });
    },
    [onChange, format]
  );

  return (
    <>
      <DatePicker
        value={dateTime.date}
        onChange={(date) => handleChange(date, "date")}
        format="yyyy-LL-dd"
        show={show}
      />
      <div
        style={{
          height: "100%",
          width: "1px",
          backgroundColor: colors.grayFour,
          margin: "0px 20px",
        }}
      />
      <TimePicker
        value={dateTime.time}
        onChange={(time) => handleChange(time, "time")}
        show={show}
      />
    </>
  );
};

export default DateTimePicker;
