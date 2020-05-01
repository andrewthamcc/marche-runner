import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { Meal } from "../../models/meal";

require("./style.scss");

interface OwnProps {
  meals: Meal[];
}

interface ReduxStateProps {}

interface ReduxDispatchProps {}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const WeekCalendar: React.FC<Props> = (props: Props): JSX.Element => {
  const { meals } = props;

  const renderWeek = () => {
    const currentWeek = moment();
    const weekStart = currentWeek.clone().startOf("week");
    const previousWeek = currentWeek
      .clone()
      .subtract(1, "weeks")
      .startOf("week");
    const nextWeek = currentWeek.clone().add(1, "weeks").startOf("week");

    const current = [];
    const prev = [];
    const next = [];

    for (let i = 0; i < 7; i++) {
      const day = moment(weekStart).add(i, "days");

      const dayJSX = (
        <div className="week-calendar-day">
          <span className="week-calendar-day-week-day">
            {day.format("ddd")}
          </span>
          <span className="week-calendar-day-dynamic-day">
            {day.format("MMM DD")}
          </span>
        </div>
      );

      current.push(dayJSX);
    }

    return current;
  };

  return <div className="week-calendar">{renderWeek()}</div>;
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(WeekCalendar);
