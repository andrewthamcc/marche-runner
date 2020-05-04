import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { format, isSameDay, parseISO } from "date-fns";

// components
import Layout from "../../layout";
import { ReactComponent as MealPlanIcon } from "./assets/meal-plan.svg";
import WeekCalendar from "../../components/Calendar/Week-Calendar";
import IconButton from "../../components/Icon-Button";
import { iconType } from "../../components/Icon";
import { symbolType } from "../../components/Symbol";
import BlankModal from "../../components/Blank-Modal";
import useModal from "../../utils/useModal";
import TextInput from "../../components/TextInput";
import RadioInput from "../../components/RadioInput";
import Button, { buttonColor } from "../../components/Button";

// redux actions
import { addMeal, deleteMeal, editMeal, getMeals } from "../../actions/meals";

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
  addMeal: (meal) => void; // add a meal
  deleteMeal: (id: string) => void; // delete a meal
  editMeal: (id: string, meal) => void; // edit a meal
  getMeals: (startDate: string, endDate: string) => void; // fetch meals
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

enum openModalView {
  default = "default",
  edit = "edit",
  add = "add",
}

enum mealType {
  breakfast = "Breakfast",
  lunch = "Lunch",
  dinner = "Dinner",
}

interface MealTextData {
  name: string;
  description: string;
}

const MealPlan: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [selectedMeal, setSelectedMeal] = useState<Meal>(null);
  const [modalView, setModalView] = useState<openModalView>(null);
  const [addMealTextData, setAddMealTextData] = useState<MealTextData>({
    name: "",
    description: "",
  });
  const [addMealType, setAddMealType] = useState<mealType>(mealType.dinner);
  const [addMealDate, setAddMealDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [editMealTextData, setEditMealTextData] = useState<MealTextData>({
    name: "",
    description: "",
  });
  const [editMealType, setEditMealType] = useState<mealType>(null);
  const [editMealDate, setEditMealDate] = useState<string>(null);

  // props
  const {
    addMeal,
    deleteMeal,
    editMeal,
    getMeals,
    startDate,
    endDate,
    meals,
  } = props;

  // other hooks
  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    getMeals(startDate, endDate);

    if (!open) {
      setSelectedMeal(null);
      setAddMealDate(format(new Date(), "yyyy-MM-dd"));
      setEditMealType(null);
      setModalView(null);
    }

    if (selectedMeal !== null) {
      setEditMealDate(format(parseISO(selectedMeal.date), "yyyy-MM-dd"));

      switch (selectedMeal.type) {
        case "breakfast":
          return setEditMealType(mealType.breakfast);
        case "lunch":
          return setEditMealType(mealType.lunch);
        case "dinner":
          return setEditMealType(mealType.dinner);
        default:
          return;
      }
    }

    // eslint-disable-next-line
  }, [editMeal, endDate, open, selectedMeal, startDate]);

  const handleTextChange = (e, type) => {
    const { name, value } = e.target;

    if (type === openModalView.add) {
      setAddMealTextData((addMealTextData) => ({
        ...addMealTextData,
        [name]: value,
      }));
    }

    if (type === openModalView.edit) {
      setEditMealTextData((editMealTextData) => ({
        ...editMealTextData,
        [name]: value,
      }));
    }
  };

  const handleAddMealSubmit = (e) => {
    e.preventDefault();

    const { name, description } = addMealTextData;

    const mealData = {
      name,
      date: addMealDate,
      type: addMealType.toLowerCase(),
      description,
    };

    addMeal(mealData);

    setAddMealTextData({
      name: "",
      description: "",
    });
    setAddMealType(mealType.dinner);
    closeModal();
  };

  const handleEditMealSubmit = (e) => {
    e.preventDefault();

    const { name, description } = editMealTextData;

    const mealEditData = {
      name: name,
      date: editMealDate,
      type: editMealType.toLowerCase(),
      description: description,
    };

    // delete empty or unchanged values
    if (mealEditData.name === "") {
      delete mealEditData.name;
    }

    if (mealEditData.description === "") {
      delete mealEditData.description;
    }

    if (mealEditData.type === selectedMeal.type.toLowerCase()) {
      delete mealEditData.type;
    }

    if (isSameDay(parseISO(mealEditData.date), parseISO(selectedMeal.date))) {
      delete mealEditData.date;
    }

    // don't send if data is not changed and close edit view
    if (!Object.keys(mealEditData).length) {
      setEditMealTextData({
        name: "",
        description: "",
      });
      setEditMealType(null);
      closeModal();

      return;
    }

    editMeal(selectedMeal._id, mealEditData);

    setEditMealTextData({
      name: "",
      description: "",
    });
    setEditMealType(null);
    closeModal();
  };

  const handleDelete = () => {
    deleteMeal(selectedMeal._id);
    closeModal();
  };

  const renderModalControls = () => {
    if (modalView === openModalView.add) {
      return (
        <div className="meal-plan-modal-controls">
          <IconButton
            icon={iconType.close}
            onClick={() => {
              setModalView(null);
              closeModal();
            }}
          />
        </div>
      );
    }

    return (
      <div className="meal-plan-modal-controls">
        {modalView !== openModalView.edit && (
          <IconButton
            icon={iconType.pencil}
            onClick={() => setModalView(openModalView.edit)}
          />
        )}
        <IconButton icon={iconType.trash} onClick={handleDelete} />
        <IconButton
          icon={iconType.close}
          onClick={() => {
            setModalView(null);
            closeModal();
          }}
        />
      </div>
    );
  };

  const renderModalContent = () => {
    switch (modalView) {
      case openModalView.default:
        return renderSelectedMeal();
      case openModalView.add:
        return renderAddMeal();
      case openModalView.edit:
        return renderEditMeal();
      case null:
      default:
        return;
    }
  };

  const renderAddMeal = () => {
    return (
      <div className="add-meal">
        <h3 className="add-meal-title">Add Meal</h3>
        <form
          className="add-meal-form"
          onSubmit={(e) => handleAddMealSubmit(e)}
        >
          <TextInput
            inputName="name"
            inputID="add-meal-name"
            label="Name:"
            onChange={(e) => handleTextChange(e, openModalView.add)}
            placeholder="Meal name..."
            required={true}
            value={addMealTextData.name}
          />

          <div className="add-meal-form-flex-container">
            <input
              className="add-meal-form-date-input"
              type="date"
              onChange={(e) => {
                let date = new Date(e.target.valueAsDate);
                date = new Date(
                  date.getTime() + date.getTimezoneOffset() * 60000
                );

                setAddMealDate(format(date, "yyyy-MM-dd"));
              }}
              value={addMealDate}
            />
            <div className="add-meal-form-radio-container">
              <RadioInput
                checked={addMealType === mealType.breakfast}
                className="add-meal-form-radio-input"
                inputName="dinner"
                label={mealType.breakfast}
                inputID={`add-meal-type=${mealType.breakfast}`}
                onChange={() => setAddMealType(mealType.breakfast)}
              />
              <RadioInput
                checked={addMealType === mealType.lunch}
                className="add-meal-form-radio-input"
                label={mealType.lunch}
                inputID={`add-meal-type=${mealType.lunch}`}
                inputName="lunch"
                onChange={() => setAddMealType(mealType.lunch)}
              />
              <RadioInput
                checked={addMealType === mealType.dinner}
                className="add-meal-form-radio-input"
                label={mealType.dinner}
                inputID={`add-meal-type=${mealType.dinner}`}
                inputName="dinner"
                onChange={() => setAddMealType(mealType.dinner)}
              />
            </div>
          </div>

          <TextInput
            inputName="description"
            inputID="add-meal-description"
            label="Description:"
            onChange={(e) => handleTextChange(e, openModalView.add)}
            placeholder="Ingredients, sides, recipes..."
            value={addMealTextData.description}
          />
          <Button
            className="add-meal-form-submit"
            color={buttonColor.orange}
            disabled={!addMealTextData.name}
          >
            Add Meal
          </Button>
        </form>
      </div>
    );
  };

  const renderSelectedMeal = () => {
    return (
      <div className="selected-meal">
        <p className="selected-meal-name">{selectedMeal.name}</p>
        <p className="selected-meal-date">
          <span className="title">Date:</span>{" "}
          {format(parseISO(selectedMeal.date), "MMM dd, yyyy")}
        </p>
        <p className="selected-meal-type">
          <span className="title">Meal:</span> {selectedMeal.type}
        </p>

        <p className="selected-meal-description">
          <span className="title">Description:</span> {selectedMeal.description}
        </p>
      </div>
    );
  };

  const renderEditMeal = () => {
    return (
      <div className="edit-meal">
        <h3 className="edit-meal-title">Edit Meal</h3>
        <form
          className="edit-meal-form"
          onSubmit={(e) => handleEditMealSubmit(e)}
        >
          <TextInput
            inputName="name"
            inputID="edit-meal-name"
            label="Name:"
            onChange={(e) => handleTextChange(e, openModalView.edit)}
            placeholder={selectedMeal.name}
            value={editMealTextData.name}
          />

          <div className="edit-meal-form-flex-container">
            <input
              className="edit-meal-form-date-input"
              type="date"
              onChange={(e) => {
                let date = new Date(e.target.valueAsDate);
                date = new Date(
                  date.getTime() + date.getTimezoneOffset() * 60000
                );

                setEditMealDate(format(date, "yyyy-MM-dd"));
              }}
              value={editMealDate}
            />
            <div className="edit-meal-form-radio-container">
              <RadioInput
                checked={editMealType === mealType.breakfast}
                className="edit-meal-form-radio-input"
                inputName="dinner"
                label={mealType.breakfast}
                inputID={`edit-meal-type=${mealType.breakfast}`}
                onChange={() => setEditMealType(mealType.breakfast)}
              />
              <RadioInput
                checked={editMealType === mealType.lunch}
                className="add-meal-form-radio-input"
                label={mealType.lunch}
                inputID={`edit-meal-type=${mealType.lunch}`}
                inputName="lunch"
                onChange={() => setEditMealType(mealType.lunch)}
              />
              <RadioInput
                checked={editMealType === mealType.dinner}
                className="edit-meal-form-radio-input"
                label={mealType.dinner}
                inputID={`edit-meal-type=${mealType.dinner}`}
                inputName="dinner"
                onChange={() => setEditMealType(mealType.dinner)}
              />
            </div>
          </div>

          <TextInput
            inputName="description"
            inputID="edit-meal-description"
            label="Description:"
            onChange={(e) => handleTextChange(e, openModalView.edit)}
            placeholder={selectedMeal.description}
            value={editMealTextData.description}
          />
          <Button color={buttonColor.orange} className="edit-meal-form-submit">
            Save
          </Button>
          <Button onClick={() => closeModal()} className="edit-meal-cancel">
            Cancel
          </Button>
        </form>
      </div>
    );
  };

  return (
    <Layout>
      {open && (
        <BlankModal
          isModalOpen={open}
          close={closeModal}
          className="meal-plan-modal"
        >
          {renderModalControls()}
          {renderModalContent()}
        </BlankModal>
      )}

      <div className="meal-plan">
        <div className="container">
          <div className="meal-plan-header">
            <MealPlanIcon />
            <h2 className="meal-plan-header-title">Meal Planning</h2>
          </div>

          <div className="meal-plan-calendar">
            <WeekCalendar
              endDate={endDate}
              startDate={startDate}
              meals={meals}
              selectMeal={(meal: Meal) => {
                setSelectedMeal(meal);
                setModalView(openModalView.default);
                openModal();
              }}
            />
            <IconButton
              symbol={symbolType.addOrange}
              className="meal-plan-add-button"
              onClick={() => {
                setModalView(openModalView.add);
                openModal();
              }}
            />
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

export default connect(mapStateToProps, {
  addMeal,
  deleteMeal,
  editMeal,
  getMeals,
})(MealPlan);
