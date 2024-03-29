import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { DateTime } from "luxon";
import "../../../styles/calendar.css"; // Corrected spelling of "calendar"

interface Props {
  value: string | undefined | null; // Corrected type to string
  onChange: (value: string) => void;
  selectedTimeStyle?: CSSProperties;
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar: React.FC<Props> = ({ value, onChange }) => {
  // Added onChange to Props destructuring
  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());

  useEffect(() => {
    if (Boolean(value)) {
      setSelectedDate(DateTime.fromISO(value!));
    } else {
      setSelectedDate(DateTime.now());
    }
  }, [value]);

  // Function to handle date selection
  const handleDateClick = useCallback(
    (day: DateTime) => {
      setSelectedDate(day);
      onChange(day.toISODate()!);
    },
    [onChange]
  );

  // Function to generate days of the month
  const generateDays = useCallback((): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const today = DateTime.now();
    const firstDayOfMonth = selectedDate.startOf("month").startOf("week");

    for (let i = 0; i < 42; i++) {
      const day = firstDayOfMonth.plus({ days: i });
      const isCurrentMonth = day.month === selectedDate.month;

      let className = "day";
      if (isCurrentMonth && day.hasSame(selectedDate, "day")) {
        className += " selected";
      }
      if (day.hasSame(today, "day")) {
        className += " today";
      }

      days.push(
        <div key={i} className={className} onClick={() => handleDateClick(day)}>
          {day.day}
        </div>
      );

      if (isCurrentMonth && day.day === selectedDate.endOf("month").day) {
        break;
      }
    }

    return days;
  }, [handleDateClick, selectedDate]);

  return (
    <div className="calendar">
      <div className="header">
        <p
          onClick={() => setSelectedDate(selectedDate.minus({ months: 1 }))}
          className="pointer"
        >
          &lt;
        </p>
        <span>
          {selectedDate.toLocaleString({ month: "short", year: "numeric" })}
        </span>
        <span
          onClick={() => setSelectedDate(DateTime.now())}
          className="today pointer"
        >
          Today
        </span>
        <p
          onClick={() => setSelectedDate(selectedDate.plus({ months: 1 }))}
          className="pointer"
        >
          &gt;
        </p>
      </div>
      <div className="weekdays">
        {weekdays.map(
          (
            day,
            index // Added key to weekdays
          ) => (
            <div key={index} className="weekday">
              {day}
            </div>
          )
        )}
      </div>
      <div className="days">{generateDays()}</div>
    </div>
  );
};

export default Calendar;
