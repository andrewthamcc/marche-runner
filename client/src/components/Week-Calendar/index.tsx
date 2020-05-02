import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addDays,
  addWeeks,
  format,
  isSameDay,
  parseISO,
  startOfWeek,
  subWeeks,
} from "date-fns";

// components
import Button from "../../components/Button";

// redux actions
import { setDates } from "../../actions/meals";

// models
import { Meal } from "../../models/meal";

require("./style.scss");

interface OwnProps {
  currentDate: string; // current date
  endDate: string; // calendar ending date
  meals: Meal[]; // meals within this period
  selectMeal: (meal) => void; // passthrough for event handler when selecting meal
  startDate: string; // calendar starting date
}

interface ReduxStateProps {}

interface ReduxDispatchProps {
  setDates: (startDate, endDate) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const WeekCalendar: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [days, setDays] = useState([]);

  // props
  const {
    currentDate,
    endDate,
    meals,
    setDates,
    startDate,
    selectMeal,
  } = props;

  // other books
  useEffect(() => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(startOfWeek(parseISO(startDate)), i);

      week.push(format(day, "yyyy-MM-dd"));
    }

    setDays(week);
  }, [startDate]);

  const handleNext = () => {
    const newStartDate = addWeeks(parseISO(startDate), 1);
    const newEndDate = addWeeks(parseISO(endDate), 1);

    setDates(newStartDate, newEndDate);
  };

  const handlePrev = () => {
    const newStartDate = subWeeks(parseISO(startDate), 1);
    const newEndDate = subWeeks(parseISO(endDate), 1);

    setDates(newStartDate, newEndDate);
  };

  const renderCalendar = () => {
    return days.map((day) => {
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
        <div className="week-calendar-day">
          <div className="week-calendar-day-header">
            <span className="week-calendar-day-header-dayName">
              {format(parseISO(day), "iii")}
            </span>
            <span
              className={`week-calendar-day-header-date 
              ${
                isSameDay(parseISO(currentDate), parseISO(day)) ? "current" : ""
              }`}
            >
              {format(parseISO(day), "MMM do")}
            </span>
          </div>

          <div className="week-calendar-day-meals">{displayMeals}</div>
        </div>
      );
    });
  };

  return (
    <>
      <Button onClick={handlePrev}>Previous</Button>
      <Button onClick={handleNext}>Next</Button>
      <div className="week-calendar">{renderCalendar()}</div>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setDates })(WeekCalendar);
