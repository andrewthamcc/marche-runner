import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addDays,
  addMonths,
  endOfWeek,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfWeek,
  startOfMonth,
  subMonths,
} from "date-fns";

// components
import IconButton from "../../Icon-Button";
import { iconType } from "../../Icon";
import Button from "../../Button";

// redux actions
import { setDates } from "../../../actions/meals";

// models
import { Meal } from "../../../models/meal";

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

const MonthCalendar: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [days, setDays] = useState([]);

  // props
  const { endDate, meals, setDates, startDate, selectMeal } = props;

  // other books
  useEffect(() => {
    const calendarRows = [];
    let day = startOfWeek(parseISO(startDate));

    while (day <= endOfWeek(parseISO(endDate))) {
      calendarRows.push(format(day, "yyyy-MM-dd"));
      day = addDays(day, 1);
    }

    setDays(calendarRows);
  }, [endDate, startDate]);

  const handleToday = () => {
    const newStartDate = startOfMonth(new Date());
    const newEndDate = endOfMonth(new Date());

    setDates(newStartDate, newEndDate);
  };

  const handleNext = () => {
    const newStartDate = addMonths(parseISO(startDate), 1);
    const newEndDate = endOfMonth(newStartDate);

    setDates(newStartDate, newEndDate);
  };

  const handlePrev = () => {
    const newStartDate = subMonths(parseISO(startDate), 1);
    const newEndDate = endOfMonth(newStartDate);

    setDates(newStartDate, newEndDate);
  };

  const renderCalendarDays = () => {
    const days = [];
    const start = format(startOfWeek(new Date()), "yyyy-MM-dd");

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={`day day-${format(addDays(parseISO(start), i), "iiii")}`}
          key={i}
        >
          <span className="day-standard">
            {format(addDays(parseISO(start), i), "iiii")}
          </span>
          <span className="day-mobile">
            {format(addDays(parseISO(start), i), "EEEEEE")}
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
      <div className="header">
        <h3 className="header-title">
          Month:{" "}
          <span className="header-title-date">
            {format(parseISO(startDate), "MMMM yyyy")}
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
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setDates })(MonthCalendar);
