import React, { useEffect, useState } from "react";
import { addDays, format, isSameDay, parseISO, startOfWeek } from "date-fns";

// models
import { Meal } from "../../../models/meal";

require("./style.scss");

interface Props {
  endDate: string; // calendar ending date
  meals: Meal[]; // meals within this period
  selectMeal: (meal) => void; // passthrough for event handler when selecting meal
  startDate: string; // calendar starting date
}

const WeekCalendar: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [days, setDays] = useState([]);

  // props
  const { endDate, meals, startDate, selectMeal } = props;

  // other books
  useEffect(() => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(startOfWeek(parseISO(startDate)), i);

      week.push(format(day, "yyyy-MM-dd"));
    }

    setDays(week);
  }, [endDate, startDate]);

  const renderCalendarDays = () => {
    return days.map((day, index) => (
      <div className={`day day-${format(parseISO(day), "iii")}`} key={index}>
        {" "}
        {format(parseISO(day), "iiii")}
      </div>
    ));
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
        <div className="cells-day" key={index}>
          <div className="cells-day-header">
            <span
              className={`cells-day-header-date 
              ${isSameDay(new Date(), parseISO(day)) ? "current" : ""}`}
            >
              {format(parseISO(day), "MMM do")}
            </span>
          </div>

          <div className="cells-day-meals">{displayMeals}</div>
        </div>
      );
    });
  };

  return (
    <div className="week-calendar">
      <div className="calendar-days">{renderCalendarDays()}</div>
      <div className="cells">{renderCalendar()}</div>
    </div>
  );
};

export default WeekCalendar;
