import React, { useEffect, useState } from "react";
import {
  addDays,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfWeek,
} from "date-fns";

// models
import { Meal } from "../../../models/meal";

require("./style.scss");

interface Props {
  endDate: string; // calendar ending date
  meals: Meal[]; // meals within this period
  selectMeal: (meal) => void; // passthrough for event handler when selecting meal
  startDate: string; // calendar starting date
}

const MonthCalendar: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [days, setDays] = useState([]);

  // props
  const { endDate, meals, startDate, selectMeal } = props;

  // other books
  useEffect(() => {
    const monthDays = [];
    let day = startOfWeek(parseISO(startDate));

    while (day <= endOfWeek(parseISO(endDate))) {
      monthDays.push(format(day, "yyyy-MM-dd"));
      day = addDays(day, 1);
    }

    setDays(monthDays);
  }, [endDate, startDate]);

  const renderCalendarDays = () => {
    const days = [];
    const start = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={`day day-${format(addDays(start, i), "iiii")}`} key={i}>
          <span className="day-standard">
            {format(addDays(start, i), "iiii")}
          </span>
          <span className="day-mobile">
            {format(addDays(start, i), "EEEEEE")}
          </span>
        </div>
      );
    }

    return days;
  };

  const renderCalendar = () => {
    return days.map((day, index) => {
      const dailyMeals = meals.filter((meal) =>
        isSameDay(parseISO(meal.date), parseISO(day))
      );

      const displayMeals = dailyMeals.map((meal) => (
        <div
          className={`meal-type ${meal.type}`}
          key={meal._id}
          onClick={() => selectMeal(meal)}
          tabIndex={0}
        >
          {meal.name}
        </div>
      ));

      return (
        <div
          className={`cells-day ${
            !isSameMonth(parseISO(startDate), parseISO(day)) ? "disable" : ""
          }`}
          key={index}
        >
          <div className="cells-day-header">
            <div
              className={`cells-day-header-date
              ${isSameDay(new Date(), parseISO(day)) ? "current" : ""}`}
            >
              <span className="cells-day-header-date-standard">
                {format(parseISO(day), "MMM do")}
              </span>
              <span className="cells-day-header-date-mobile">
                {format(parseISO(day), "d")}
              </span>
            </div>
          </div>

          <div className="cells-day-meals">{displayMeals}</div>
        </div>
      );
    });
  };

  return (
    <div className="month-calendar">
      <div className="calendar-days">{renderCalendarDays()}</div>
      <div className="cells">{renderCalendar()}</div>
    </div>
  );
};

export default MonthCalendar;
