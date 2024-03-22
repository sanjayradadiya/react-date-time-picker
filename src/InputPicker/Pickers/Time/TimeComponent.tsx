import React, { FC, useCallback, useEffect, useMemo } from "react";
import { Time } from ".";
import "../../../styles/time-components.css";

interface Props {
  value: Time;
  show: boolean;
  scroll: number;
  onChange: (key: keyof Time, value: string) => void;
}

const Headers: Record<keyof Time, string> = {
  hh: "HH",
  mm: "MM",
  ss: "SS",
  a: "A/P",
  zone: "Zone",
};
const TimeComponent: FC<Props> = ({ value, onChange, show, scroll }) => {
  useEffect(() => {
    handleScroll();
  }, [scroll]);

  // Initial render scroll till selected hh:mm:ss
  const handleScroll = useCallback(() => {
    const elements: { [key: string]: HTMLElement | null } = {};
    Object.keys(value).forEach((key) => {
      elements[key] = document.getElementById(
        `${key}${value[key as keyof Time]}`
      );
    });

    Object.entries(elements).forEach(([key, childElement]) => {
      const parent = document.getElementById(key);
      if (childElement && parent) {
        parent.scrollTo({
          top: childElement.offsetTop - 56 ,
        });
      }
    });
  }, [value]);

  // Generate two-digit padded strings for hours, minutes, and seconds
  const { hoursArray, minuteOrSecondArray, meridiemArray } = useMemo(
    () => ({
      hoursArray: Array.from({ length: 12 }, (_, index) =>
        (index + 1).toString().padStart(2, "0")
      ),
      minuteOrSecondArray: Array.from({ length: 60 }, (_, index) =>
        index.toString().padStart(2, "0")
      ),
      meridiemArray: ["AM", "PM"],
    }),
    []
  );

  const timeComponents: { dataArray: string[]; key: keyof Time }[] = [
    { dataArray: hoursArray, key: "hh" },
    { dataArray: minuteOrSecondArray, key: "mm" },
    { dataArray: minuteOrSecondArray, key: "ss" },
    { dataArray: meridiemArray, key: "a" },
  ];

  if (!show) {
    return <></>;
  }
  return (
    <>
      <div className={`main-container`}>
        {timeComponents.map(({ dataArray, key }) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0px 3px",
              }}
            >
              <p
                className="header"
                style={{ width: "100%", textAlign: "center" }}
              >
                {Headers[key]}
              </p>
              <div className="wrapper" key={key} id={key}>
                {dataArray.map((item) => {
                  return (
                    <p
                      id={`${key}${item}`}
                      key={item}
                      onClick={() => onChange(key, item)}
                      className={`digitBox ${
                        item === value[key] && "selected"
                      }`}
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default TimeComponent;