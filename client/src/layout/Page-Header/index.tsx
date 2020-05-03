import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as Runner } from "./assets/runner.svg";

// components
import SigninModal from "../../components/SigninModal";
import useModal from "../../utils/useModal";
import Button, { buttonColor } from "../../components/Button";
import Icon, { iconType } from "../../components/Icon";
import Dropdown, { DropdownItem } from "../../components/Dropdown";

// redux actions
import { logoutUser } from "../../actions/auth";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  firstName: string;
  isAuthenticated: boolean;
}

interface ReduxDispatchProps {
  logoutUser: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

enum profileOptions {
  account = "account",
  signout = "signout",
}

const PageHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const userDropdownList = [
    {
      // icon: <Icon iconType={iconType.profile} color={iconColor.grey} />,
      text: "Account",
      value: profileOptions.account,
      fn: () => history.push("/profile"),
    },
    {
      // icon: <Icon iconType={iconType.logout} color={iconColor.grey} />,
      text: "Sign out",
      value: profileOptions.signout,
      fn: () => logoutUser(),
    },
  ];

  // state
  const [userControlSelection, setUserControlSelection] = useState<
    DropdownItem
  >(userDropdownList[0]);

  // props
  const { isAuthenticated, firstName, logoutUser } = props;

  // other hooks
  const history = useHistory();
  const { open, openModal, closeModal } = useModal();

  const renderAuthLinks = () => {
    return (
      <>
        <li>
          <Link to="/mealplan">Meal Plan</Link>
        </li>
        <li>{firstName}</li>
        <li>
          <Dropdown
            list={userDropdownList}
            value={userControlSelection}
            selectValue={(selection) => setUserControlSelection(selection)}
            className="page-header-dropdown"
            listWidth={120}
            caret={true}
          />
        </li>
      </>
    );
  };

  const renderHomeLinks = () => {
    return (
      <>
        <li>
          <Button border={false} color={buttonColor.green} onClick={openModal}>
            <Icon
              iconType={iconType.profile}
              className="page-header-signin-icon"
            />
            Sign In
          </Button>
        </li>
      </>
    );
  };

  return (
    <>
      {open && <SigninModal isModalOpen={open} close={closeModal} />}

      <header className="page-header">
        <div className="page-header-flex-container container">
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <div className="page-header-title">
              <h2>MarchéRunner</h2>
              <Runner className="page-header-title-icon" />
            </div>
          </Link>

          <nav className="page-header-nav">
            <ul className="page-header-nav-list">
              {isAuthenticated ? renderAuthLinks() : renderHomeLinks()}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => ({
  firstName: state.authState.firstName,
  isAuthenticated: state.authState.isAuthenticated,
});

export default connect(mapStateToProps, { logoutUser })(PageHeader);
