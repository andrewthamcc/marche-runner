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
import IconButton from "../../components/Icon-Button";
import { iconType } from "../../components/Icon";
import Button from "../../components/Button";

// redux actions
import { setDates } from "../../actions/meals";

// models
import { Meal } from "../../models/meal";
import { endOfWeek } from "date-fns/esm";

require("./style.scss");

interface OwnProps {
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
  const { endDate, meals, setDates, startDate, selectMeal } = props;

  // other books
  useEffect(() => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(startOfWeek(parseISO(startDate)), i);

      week.push(format(day, "yyyy-MM-dd"));
    }

    setDays(week);
  }, [startDate]);

  const handleToday = () => {
    const newStartDate = startOfWeek(new Date());
    const newEndDate = endOfWeek(new Date());

    setDates(newStartDate, newEndDate);
  };

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

  const renderCalendarDays = () => {
    return days.map((day) => (
      <div className={`day day-${format(parseISO(day), "iii")}`}>
        {" "}
        {format(parseISO(day), "iiii")}
      </div>
    ));
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
        <div className="cells-day">
          <div className="cells-day-header">
            {/* <span className="cells-day-header-dayName">
              {format(parseISO(day), "iii")}
            </span> */}
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
    <>
      <div className="week-calendar">
        <div className="header">
          <h3 className="header-title">
            Week:{" "}
            <span className="header-title-date">
              {format(parseISO(startDate), "MMM dd")} -{" "}
              {format(parseISO(endDate), "MMM dd")}
            </span>
          </h3>

          <div className="header-controls">
            <IconButton icon={iconType.chevronLeft} onClick={handlePrev} />
            <Button
              onClick={handleToday}
              border={false}
              className="header-controls-today"
            >
              Today
            </Button>
            <IconButton icon={iconType.chevronRight} onClick={handleNext} />
          </div>
        </div>
        <div className="calendar-days">{renderCalendarDays()}</div>
        <div className="cells">{renderCalendar()}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setDates })(WeekCalendar);
