import React, { useEffect } from "react";
import { connect } from "react-redux";

// components
import Layout from "../../layout";
import WeekCalendar from "../../components/Week-Calendar";

// redux actions
import { getMeals } from "../../actions/meals";

// models
import { Meal } from "../../models/meal";
import { dateRange } from "../../reducers/mealReducer";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  meals: Meal[];
  startDate: string;
  endDate: string;
  dateRange: dateRange;
}

interface ReduxDispatchProps {
  getMeals: (startDate: string, endDate: string) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const MealPlan: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const { getMeals, startDate, endDate, meals } = props;

  // other hooks
  useEffect(() => {
    getMeals(startDate, endDate);
  }, []);

  return (
    <Layout>
      <div className="meal-plan">
        <div className="container">
          <h2 className="meal-plan-title">Meal Plan</h2>

          <WeekCalendar meals={meals} />
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  meals: state.mealState.meals,
  startDate: state.mealState.startDate,
  endDate: state.mealState.endDate,
  dateRange: state.mealState.dateRange,
});

export default connect(mapStateToProps, { getMeals })(MealPlan);
