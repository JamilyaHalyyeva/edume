import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Math Class",
    start: new Date(2024, 3, 1, 9, 0, 0),
    end: new Date(2024, 3, 1, 10, 0, 0),
  },
  {
    title: "Biology Class",
    start: new Date(2024, 3, 2, 11, 0, 0),
    end: new Date(2024, 3, 2, 12, 0, 0),
  },
  {
    title: "History Class",
    start: new Date(2024, 3, 3, 13, 0, 0),
    end: new Date(2024, 3, 3, 14, 0, 0),
  },
  {
    title: "Biology Lab",
    start: new Date(2024, 3, 4, 9, 30, 0),
    end: new Date(2024, 3, 4, 11, 0, 0),
  },
  {
    title: "Chemistry Class",
    start: new Date(2024, 3, 5, 14, 0, 0),
    end: new Date(2024, 3, 5, 15, 30, 0),
  },
  {
    title: "English Literature",
    start: new Date(2024, 3, 5, 10, 0, 0),
    end: new Date(2024, 3, 5, 11, 0, 0),
  },
  {
    title: "Physics Seminar",
    start: new Date(2024, 3, 7, 15, 0, 0),
    end: new Date(2024, 3, 7, 16, 0, 0),
  },
  {
    title: "Computer Science Workshop",
    start: new Date(2024, 3, 22, 13, 10, 0),
    end: new Date(2024, 3, 22, 15, 30, 0),
  },
  {
    title: "Biology Lab",
    start: new Date(2024, 3, 19, 9, 30, 0),
    end: new Date(2024, 3, 19, 11, 0, 0),
  },
  {
    title: "Chemistry Class",
    start: new Date(2024, 3, 29, 14, 0, 0),
    end: new Date(2024, 3, 29, 15, 30, 0),
  },
  {
    title: "Presentation",
    start: new Date(2024, 3, 24, 10, 0, 0),
    end: new Date(2024, 3, 24, 14, 30, 0),
  },
  {
    title: "English Class",
    start: new Date(2024, 3, 15, 10, 0, 0),
    end: new Date(2024, 3, 15, 11, 0, 0),
  },
  {
    title: "Physics Seminar",
    start: new Date(2024, 3, 10, 10, 20, 0),
    end: new Date(2024, 3, 10, 13, 30, 0),
  },
  {
    title: "Computer Science Workshop",
    start: new Date(2024, 3, 18, 16, 0, 0),
    end: new Date(2024, 3, 18, 18, 30, 0),
  },
];

const CalendarChart = () => {
  return (
    <div className="h-[20rem]">
      <Calendar
        localizer={localizer}
        events={events} // Dummy events
        startAccessor="start"
        endAccessor="end"
        defaultView="week" // Default to weekly view
        views={["month", "week", "day"]} // Allow switching between views
        style={{ height: "100%" }} // Full height for the calendar
        min={new Date(1970, 1, 1, 9, 0)} // Earliest visible time: 9 AM
        max={new Date(1970, 1, 1, 18, 0)} // Latest visible time: 6 PM
      />
    </div>
  );
};

export default CalendarChart;
