import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";

// components
import ConfirmationModal from "../../components/ConfirmationModal";
import useModal from "../../components/ConfirmationModal/useModal";
import Icon, { iconType, iconColor } from "../../components/Icon";
import Button, { buttonColor } from "../../components/Button";
import TextInput, { textInputType } from "../../components/TextInput";
import LoadingSpinner from "../../components/Loader";

// redux actions
import { getUserProfile, editUserProfile } from "../../actions/user";
import { deleteUserProfile } from "../../actions/auth";

// models
import { UserModel } from "../../models/user";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  user: UserModel;
  loading: boolean;
}

interface NewUserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

interface NewPassword {
  newPassword: string;
  confirmPassword: string;
}

interface ReduxDispatchProps {
  getUserProfile: () => void;
  editUserProfile: (data) => void;
  deleteUserProfile: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Profile: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [editView, setEditView] = useState<boolean>(false);
  const [newUserInfo, setNewUserInfo] = useState<NewUserInfo>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [password, setPassword] = useState<NewPassword>({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<string>("");

  // modal hook and useHistory
  const { open, openModal, closeModal } = useModal();
  const history = useHistory();

  const {
    getUserProfile,
    editUserProfile,
    deleteUserProfile,
    user,
    loading,
  } = props;
  const { firstName, lastName, email, date } = user;

  useEffect(() => {
    // load the user data from redux
    getUserProfile();

    // eslint-disable-next-line
  }, []);

  // handle change of form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewUserInfo((newUserInfo) => ({
      ...newUserInfo,
      [name]: value,
    }));
  };

  // handle change of password input
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    // clear errors
    if (errors) {
      setErrors("");
    }

    setPassword((password) => ({
      ...password,
      [name]: value,
    }));
  };

  // save changes from user edits
  const saveChanges = () => {
    const { newPassword, confirmPassword } = password;
    if (newPassword !== confirmPassword) {
      setErrors("Passwords do not match!");
      return;
    }

    const { firstName, lastName, email } = newUserInfo;

    const newUserData = {
      firstName,
      lastName,
      email,
      password: newPassword,
    };

    // remove empty and undefined values
    Object.keys(newUserData).forEach((data) => {
      if (
        newUserData[data] === null ||
        newUserData[data] === "" ||
        !newUserData[data]
      ) {
        delete newUserData[data];
      }
    });

    // don't send if data is not changed and close edit view
    if (!Object.keys(newUserData).length) {
      discardChanges();
      return;
    }

    editUserProfile(newUserData);
    setEditView(false);
  };

  // cancel changes
  const discardChanges = () => {
    setEditView(false);

    setNewUserInfo({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  // delete profile
  const deleteProfile = () => {
    closeModal();

    deleteUserProfile();
    history.push("/");
  };

  const renderStandardView = () => {
    return (
      <>
        <div className="profile-firstname">
          <span>First Name:</span> {firstName}
        </div>
        <div className="profile-lastname">
          <span>Last Name:</span> {lastName}
        </div>
        <div className="profile-email">
          <span>Email Address:</span> {email}
        </div>
      </>
    );
  };

  const renderEditView = () => {
    return (
      <>
        <TextInput
          label="First Name:"
          placeholder={firstName}
          inputID="profile-firstname"
          inputName="firstName"
          value={newUserInfo.firstName}
          onChange={(e) => handleChange(e)}
          className="profile-edit-input"
        />
        <TextInput
          label="Last Name:"
          placeholder={lastName}
          inputID="profile-lastname"
          inputName="lastName"
          value={newUserInfo.lastName}
          onChange={(e) => handleChange(e)}
          className="profile-edit-input"
        />
        <TextInput
          label="Email Address:"
          type={textInputType.email}
          placeholder={email}
          inputID="profile-email"
          inputName="email"
          value={newUserInfo.email}
          onChange={(e) => handleChange(e)}
          className="profile-edit-input"
        />
        <TextInput
          label="New Password:"
          type={textInputType.password}
          inputID="profile-newpassword"
          inputName="newPassword"
          value={password.newPassword}
          onChange={(e) => handlePasswordChange(e)}
          className="profile-edit-input"
          required
        />
        <TextInput
          label="Confirm New Password:"
          type={textInputType.password}
          inputID="profile-confirmpassword"
          inputName="confirmPassword"
          value={password.confirmPassword}
          onChange={(e) => handlePasswordChange(e)}
          className="profile-edit-input"
          required
        />
        {errors && <span className="profile-edit-errors">{errors}</span>}
      </>
    );
  };

  const renderEditControls = () => {
    return (
      <>
        <Button
          onClick={saveChanges}
          color={buttonColor.green}
          className="profile-edit-button"
        >
          Save
        </Button>
        <Button onClick={discardChanges} className="profile-edit-button">
          Cancel
        </Button>
      </>
    );
  };

  if (loading) {
    return (
      <div className="profile loading">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {open && (
        <ConfirmationModal
          isModalOpen={open}
          close={closeModal}
          title={"Delete Profile?"}
          text={"Are you sure you want to delete your profile?"}
          confirm={() => deleteProfile()}
        />
      )}

      <div className="profile">
        <div className="container">
          <div className="profile-header">
            <h2>Profile</h2>
            <div className="profile-header-controls">
              <span
                onClick={() => setEditView(!editView)}
                className="profile-header-controls-icon"
              >
                <Icon iconType={iconType.pencil} color={iconColor.grey} />
              </span>
              <span
                onClick={() => openModal()}
                className="profile-header-controls-icon"
              >
                <Icon iconType={iconType.trash} color={iconColor.grey} />
              </span>
            </div>
          </div>
          <hr />
          <div className="profile-flex-container">
            <div className="profile-flex-container-left">
              <Icon iconType={iconType.profile} className="profile-icon" />
            </div>
            <div className="profile-flex-container-right">
              {editView ? renderEditView() : renderStandardView()}
              <p className="profile-date">
                Member Since: <span>{moment(date).format("MMM Do YYYY")}</span>
              </p>
              {editView && renderEditControls()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: {
    firstName: state.userState.firstName,
    lastName: state.userState.lastName,
    email: state.userState.email,
    date: state.userState.date,
  },
  loading: state.userState.loading,
});

export default connect(mapStateToProps, {
  getUserProfile,
  editUserProfile,
  deleteUserProfile,
})(Profile);
