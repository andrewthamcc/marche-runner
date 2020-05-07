import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { format, isSameDay, parseISO } from "date-fns";
import convertTime from "../../utils/convertTime";

// components
import Layout from "../../layout";
import { ReactComponent as MealPlanIcon } from "./assets/meal-plan.svg";
import Calendar, { calendarType } from "../../components/Calendar";
import IconButton from "../../components/Icon-Button";
import { iconType } from "../../components/Icon";
import { symbolType } from "../../components/Symbol";
import BlankModal from "../../components/Modal/Blank-Modal";
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
  const [selectedMeal, setSelectedMeal] = useState<Meal>(null); // selected meal from calendar
  const [modalView, setModalView] = useState<openModalView>(null); // modal view (default, add, edit)
  const [addMealTextData, setAddMealTextData] = useState<MealTextData>({
    name: "",
    description: "",
  }); // add text data
  const [addMealType, setAddMealType] = useState<mealType>(mealType.dinner); // add meal type
  const [addMealDate, setAddMealDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  ); // add date
  const [editMealTextData, setEditMealTextData] = useState<MealTextData>({
    name: "",
    description: "",
  }); // edit text data
  const [editMealType, setEditMealType] = useState<mealType>(null); // edit meal type
  const [editMealDate, setEditMealDate] = useState<string>(null); // edit meal date

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
      setEditMealDate(null);
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
      closeModal();

      return;
    }

    editMeal(selectedMeal._id, mealEditData);

    setEditMealTextData({
      name: "",
      description: "",
    });
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
        return renderForm();
      case openModalView.edit:
        return renderForm();
      case null:
      default:
        return;
    }
  };

  const renderSelectedMeal = () => {
    return (
      <div className="selected-meal">
        <p className="selected-meal-name">{selectedMeal.name}</p>
        <p className="selected-meal-date">
          <span className="title">Date:</span>{" "}
          {format(convertTime(parseISO(selectedMeal.date)), "MMM dd, yyyy")}
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

  const renderForm = () => {
    return (
      <>
        <h3 className="modal-form-title">
          {modalView === openModalView.add ? "Add Meal" : "Edit Meal"}
        </h3>
        <form
          className="modal-form"
          onSubmit={(e) =>
            modalView === openModalView.add
              ? handleAddMealSubmit(e)
              : handleEditMealSubmit(e)
          }
        >
          <TextInput
            inputName="name"
            inputID="modal-form-name"
            label="Name:"
            onChange={(e) =>
              modalView === openModalView.add
                ? handleTextChange(e, openModalView.add)
                : handleTextChange(e, openModalView.edit)
            }
            placeholder={
              modalView === openModalView.add
                ? "Meal name..."
                : selectedMeal.name
            }
            value={
              modalView === openModalView.add
                ? addMealTextData.name
                : editMealTextData.name
            }
          />

          <div className="modal-form-flex-container">
            <input
              className="modal-form-date-input"
              type="date"
              onChange={(e) => {
                const date = convertTime(new Date(e.target.valueAsDate));

                modalView === openModalView.add
                  ? setAddMealDate(format(date, "yyyy-MM-dd"))
                  : setEditMealDate(format(date, "yyyy-MM-dd"));
              }}
              value={
                modalView === openModalView.add ? addMealDate : editMealDate
              }
            />
            <div className="modal-form-radio-container">
              <RadioInput
                checked={
                  modalView === openModalView.add
                    ? addMealType === mealType.breakfast
                    : editMealType === mealType.breakfast
                }
                className="modal-form-radio-input"
                inputName="dinner"
                label={mealType.breakfast}
                inputID={`form-meal-type-${mealType.breakfast}`}
                onChange={() =>
                  modalView === openModalView.add
                    ? setAddMealType(mealType.breakfast)
                    : setEditMealType(mealType.breakfast)
                }
              />
              <RadioInput
                checked={
                  modalView === openModalView.add
                    ? addMealType === mealType.lunch
                    : editMealType === mealType.lunch
                }
                className="modal-form-radio-input"
                label={mealType.lunch}
                inputID={`form-meal-type-${mealType.lunch}`}
                inputName="lunch"
                onChange={() =>
                  modalView === openModalView.add
                    ? setAddMealType(mealType.lunch)
                    : setEditMealType(mealType.lunch)
                }
              />
              <RadioInput
                checked={
                  modalView === openModalView.add
                    ? addMealType === mealType.dinner
                    : editMealType === mealType.dinner
                }
                className="modal-form-radio-input"
                label={mealType.dinner}
                inputID={`form-meal-type-${mealType.dinner}`}
                inputName="dinner"
                onChange={() =>
                  modalView === openModalView.add
                    ? setAddMealType(mealType.dinner)
                    : setEditMealType(mealType.dinner)
                }
              />
            </div>
          </div>

          <TextInput
            inputName="description"
            inputID="modal-form-description"
            label="Description:"
            onChange={(e) =>
              modalView === openModalView.add
                ? handleTextChange(e, openModalView.add)
                : handleTextChange(e, openModalView.edit)
            }
            placeholder={
              modalView === openModalView.add
                ? "Ingredients, sides, recipes..."
                : selectedMeal.description
            }
            value={
              modalView === openModalView.add
                ? addMealTextData.description
                : editMealTextData.description
            }
          />
          <Button color={buttonColor.orange} className="modal-form-submit">
            Save
          </Button>

          {modalView === openModalView.edit && (
            <Button onClick={() => closeModal()} className="modal-form-cancel">
              Cancel
            </Button>
          )}
        </form>
      </>
    );
  };

  return (
    <Layout>
      {open && (
        <BlankModal
          isModalOpen={open}
          close={closeModal}
          className={`meal-plan-modal ${
            modalView !== openModalView.default ? "edit" : ""
          }`}
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
        </div>

        <div className="meal-plan-calendar">
          <Calendar
            calendarView={calendarType.month}
            endDate={endDate}
            meals={meals}
            selectMeal={(meal: Meal) => {
              setSelectedMeal(meal);
              setModalView(openModalView.default);
              openModal();
            }}
            startDate={startDate}
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
