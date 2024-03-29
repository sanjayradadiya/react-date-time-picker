import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { DateTime, Settings } from "luxon";
import { TimeFormat } from "../../util";
import TimeComponent from "./TimeComponent";
import { TimeComponentProps } from "../../../types";
import PickerBox from "../PickerBox/PickerBox";
export interface Time {
  hh: string;
  mm: string;
  ss: string;
  a: string;
  zone?: string;
}

const TimePicker: FC<TimeComponentProps> = ({
  value,
  onChange,
  format,
  show,
  mainContainerClassName,
  mainContainerStyles,
  selectedTimeStyle,
}) => {
  const [time, setTime] = useState<Time>({
    hh: "01",
    mm: "00",
    ss: "00",
    a: "AM",
    zone: "",
  });
  const [scroll, setScroll] = useState(0);

  const handleInitialTime = useCallback(() => {
    const currentTime = DateTime.now().setLocale("en-US");
    const zone = Settings.defaultZone.name;

    let formattedTime: DateTime<true> | DateTime<false> = currentTime;

    if (value && value.trim() !== "") {
      // Get time according to zone
      const inputTime = DateTime.fromFormat(`${value}`, format || TimeFormat, {
        locale: "en-US",
      });

      // Convert To Time current zone
      formattedTime = inputTime.setZone(zone);
    }

    const outputFormateTime = formattedTime.toFormat(format || TimeFormat);
    const timeObj = {
      hh: formattedTime.toFormat("hh"),
      mm: formattedTime.toFormat("mm"),
      ss: formattedTime.toFormat("ss"),
      a: formattedTime.toFormat("a"),
      zone: formattedTime.toFormat("z"),
    };

    setTime(timeObj);
    // Show the short form of the zone
    if (value && value.trim() !== "") {
      onChange?.(outputFormateTime);
    }

    // Scrolling when set initial time.
    setScroll((prev) => prev + 1);
  }, [format, onChange, value]);

  useLayoutEffect(() => {
    handleInitialTime();
  }, [show]);

  useEffect(() => {}, [show]);
  const handleTime = useCallback(
    (key: keyof Time, value: string) => {
      setTime((prev) => {
        const prevClone = { ...prev, [key]: value };
        const { mm, hh, ss, zone, a } = prevClone;
        const hours = DateTime.fromFormat(`${hh} ${a}`, "hh a").hour;

        const formattedTime = DateTime.fromObject(
          {
            minute: parseInt(mm),
            second: parseInt(ss),
            hour: hours,
          },
          { zone }
        ).toFormat(format || TimeFormat);
        const dateTimeObj = DateTime.fromFormat(formattedTime, TimeFormat);
        const outputFormateTime = dateTimeObj.toFormat(format || TimeFormat);
        onChange?.(outputFormateTime);
        return prevClone;
      });
    },
    [format, setTime, onChange]
  );

  return (
    <PickerBox
      mainContainerClassName={mainContainerClassName}
      mainContainerStyles={mainContainerStyles}
    >
      <TimeComponent
        value={time}
        onChange={handleTime}
        scroll={scroll}
        selectedTimeStyle={selectedTimeStyle}
      />
    </PickerBox>
  );
};

export default TimePicker;
