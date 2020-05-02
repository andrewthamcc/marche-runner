import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { format, parseISO } from "date-fns";

// components
import Layout from "../../layout";
import WeekCalendar from "../../components/Week-Calendar";
import IconButton from "../../components/Icon-Button";
import { iconType } from "../../components/Icon";

// redux actions
import { getMeals } from "../../actions/meals";

// models
import { Meal } from "../../models/meal";
import { dateRange } from "../../reducers/mealReducer";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  currentDate: string;
  endDate: string;
  dateRange: dateRange;
  meals: Meal[];
  startDate: string;
}

interface ReduxDispatchProps {
  getMeals: (startDate: string, endDate: string) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const MealPlan: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [selectedMeal, setSelectedMeal] = useState<Meal>(null);

  // props
  const { currentDate, getMeals, startDate, endDate, meals } = props;

  // other hooks
  useEffect(() => {
    getMeals(startDate, endDate);

    // eslint-disable-next-line
  }, [startDate]);

  const renderSelectedMeal = () => {
    return (
      <>
        <div className="meal-plan-selected-meal-header">
          <p className="meal-plan-selected-meal-name">{selectedMeal.name} </p>
          <div className="meal-plan-selected-meal-header-controls">
            <IconButton
              icon={iconType.pencil}
              onClick={() => console.log("Editing...")}
            />
            <IconButton
              icon={iconType.trash}
              onClick={() => console.log("Deleting...")}
            />
          </div>
        </div>
        <hr />
        <p className="meal-plan-selected-meal-date">
          <span className="title">Date:</span>{" "}
          {format(parseISO(selectedMeal.date), "MMM dd, yyyy")}
        </p>
        <p className="meal-plan-selected-meal-type">
          <span className="title">Meal:</span> {selectedMeal.type}
        </p>
        <div className="meal-plan-selected-meal-description">
          <span className="title">Description:</span>
          <br />
          {selectedMeal.description && (
            <p className="meal-plan-selected-meal-description">
              {selectedMeal.description}
            </p>
          )}
        </div>
      </>
    );
  };

  return (
    <Layout>
      <div className="meal-plan">
        <div className="container">
          <h2 className="meal-plan-title">Meal Planning</h2>

          <WeekCalendar
            currentDate={currentDate}
            endDate={endDate}
            startDate={startDate}
            meals={meals}
            selectMeal={(meal: Meal) => setSelectedMeal(meal)}
          />

          <div className="meal-plan-selected-meal">
            {selectedMeal && renderSelectedMeal()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  currentDate: state.mealState.currentDay,
  dateRange: state.mealState.dateRange,
  endDate: state.mealState.endDate,
  meals: state.mealState.meals,
  startDate: state.mealState.startDate,
});

export default connect(mapStateToProps, { getMeals })(MealPlan);
