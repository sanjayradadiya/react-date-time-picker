import React from "react";
import "../../../styles/weeks.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Weeks = React.memo(() => {
  return (
    <div className="weekdays">
      {weekdays.map((day, index) => (
        <div key={index} className="weekday">
          {day}
        </div>
      ))}
    </div>
  );
});
export default Weeks;
