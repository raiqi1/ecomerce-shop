import React from "react";
// import { timestampString } from './date'; // Sesuaikan dengan path file yang sesuai

function DateReview(props) {
  const timestamp = new Date(props.time);

  return (
    <div className="px-1">
      <p>
        {timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}

export default DateReview;
