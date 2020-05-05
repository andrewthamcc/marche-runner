import React from "react";
import { connect } from "react-redux";
import {
  addWeeks,
  addMonths,
  endOfWeek,
  endOfMonth,
  format,
  parseISO,
  startOfWeek,
  startOfMonth,
  subMonths,
  subWeeks,
} from "date-fns";

// components
import IconButton from "../Icon-Button";
import { iconType } from "../Icon";
import Button from "../Button";
import MonthCalendar from "./Month-Calendar";
import WeekCalendar from "./Week-Calendar";

// redux actions
import { setDates } from "../../actions/meals";

// models
import { Meal } from "../../models/meal";

require("./style.scss");

interface OwnProps {
  calendarView: calendarType; // type of calendar to view
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

export enum calendarType {
  month = "month",
  week = "week",
}

const Calendar: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const {
    calendarView,
    endDate,
    meals,
    setDates,
    startDate,
    selectMeal,
  } = props;

  const handleToday = () => {
    let newStartDate;
    let newEndDate;
    if (calendarView === calendarType.month) {
      newStartDate = startOfMonth(new Date());
      newEndDate = endOfMonth(new Date());
    }

    if (calendarView === calendarType.week) {
      newStartDate = startOfWeek(new Date());
      newEndDate = endOfWeek(new Date());
    }

    setDates(newStartDate, newEndDate);
  };

  const handleNext = () => {
    let newStartDate;
    let newEndDate;
    if (calendarView === calendarType.month) {
      newStartDate = addMonths(parseISO(startDate), 1);
      newEndDate = endOfMonth(newStartDate);
    }

    if (calendarView === calendarType.week) {
      newStartDate = addWeeks(parseISO(startDate), 1);
      newEndDate = addWeeks(parseISO(endDate), 1);
    }

    setDates(newStartDate, newEndDate);
  };

  const handlePrev = () => {
    let newStartDate;
    let newEndDate;

    if (calendarView === calendarType.month) {
      newStartDate = subMonths(parseISO(startDate), 1);
      newEndDate = endOfMonth(newStartDate);
    }

    if (calendarView === calendarType.week) {
      newStartDate = subWeeks(parseISO(startDate), 1);
      newEndDate = subWeeks(parseISO(endDate), 1);
    }

    setDates(newStartDate, newEndDate);
  };

  const renderTitle = () => {
    if (calendarView === calendarType.month) {
      return (
        <h3 className="header-title">
          Month:{" "}
          <span className="header-title-date">
            {format(parseISO(startDate), "MMMM yyyy")}
          </span>
        </h3>
      );
    }

    if (calendarView === calendarType.week) {
      return (
        <h3 className="header-title">
          Week:{" "}
          <span className="header-title-date">
            {format(parseISO(startDate), "MMM d")} -{" "}
            {format(parseISO(endDate), "MMM d")}
          </span>
        </h3>
      );
    }
  };

  const renderCalendar = () => {
    switch (calendarView) {
      case calendarType.month:
        return renderMonth();
      case calendarType.week:
        return renderWeek();
      default:
        return;
    }
  };

  const renderMonth = () => {
    return (
      <MonthCalendar
        endDate={endDate}
        startDate={startDate}
        meals={meals}
        selectMeal={selectMeal}
      />
    );
  };

  const renderWeek = () => {
    return (
      <WeekCalendar
        endDate={endDate}
        startDate={startDate}
        meals={meals}
        selectMeal={selectMeal}
      />
    );
  };

  return (
    <div className="calendar">
      <div className="header">
        {renderTitle()}
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
      {renderCalendar()}
    </div>
  );
};

Calendar.defaultProps = {
  calendarView: calendarType.month,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setDates })(Calendar);
