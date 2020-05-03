import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { format, parseISO } from "date-fns";

// components
import Layout from "../../layout";
import WeekCalendar from "../../components/Week-Calendar";
import IconButton from "../../components/Icon-Button";
import { iconType } from "../../components/Icon";
import ConfirmationModal from "../../components/ConfirmationModal";
import useModal from "../../components/ConfirmationModal/useModal";

// redux actions
import { deleteMeal, getMeals } from "../../actions/meals";

// models
import { Meal } from "../../models/meal";
import { dateRange } from "../../reducers/mealReducer";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  endDate: string;
  dateRange: dateRange;
  meals: Meal[];
  startDate: string;
}

interface ReduxDispatchProps {
  deleteMeal: (id: string) => void;
  getMeals: (startDate: string, endDate: string) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const MealPlan: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [selectedMeal, setSelectedMeal] = useState<Meal>(null);

  // props
  const { deleteMeal, getMeals, startDate, endDate, meals } = props;

  // other hooks
  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    getMeals(startDate, endDate);

    // eslint-disable-next-line
  }, [startDate]);

  const handleDelete = () => {
    deleteMeal(selectedMeal._id);
    setSelectedMeal(null);
  };

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
            <IconButton icon={iconType.trash} onClick={() => openModal()} />
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
      {open && (
        <ConfirmationModal
          isModalOpen={open}
          close={closeModal}
          title={"Delete Meal?"}
          text={"Are you sure you want to delete this meal?"}
          confirm={() => handleDelete}
        />
      )}

      <div className="meal-plan">
        <div className="container">
          <h2 className="meal-plan-title">Meal Planning</h2>

          <WeekCalendar
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
  dateRange: state.mealState.dateRange,
  endDate: state.mealState.endDate,
  meals: state.mealState.meals,
  startDate: state.mealState.startDate,
});

export default connect(mapStateToProps, { deleteMeal, getMeals })(MealPlan);
