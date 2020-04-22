import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Runner } from "./assets/runner.svg";

// components
import SigninModal from "../../components/SigninModal";
import useModal from "../../components/SigninModal/useModal";
import Button, { buttonColor } from "../../components/Button";
import Icon, { iconType } from "../../components/Icon";

import { logoutUser } from "../../actions/auth";

require("./style.scss");

// todo: display current date somewhere

interface OwnProps {}

interface ReduxStateProps {
  isAuthenticated: boolean;
  firstName: string;
}

interface ReduxDispatchProps {
  logoutUser: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const PageHeader: React.FC<Props> = (props: Props): JSX.Element => {
  const { open, openModal, closeModal } = useModal();
  const { isAuthenticated, firstName } = props;

  const renderAuthLinks = () => {
    const { logoutUser } = props;

    return (
      <>
        <li>Welcome {firstName}!</li>
        <li>
          <Link to="/profile">
            <Button border={false} color={buttonColor.green}>
              Profile
            </Button>
          </Link>
        </li>
        <li>
          <Button color={buttonColor.orange} onClick={() => logoutUser()}>
            Logout
          </Button>
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
        <li>
          <Link to="/signup">
            <Button border={false} color={buttonColor.orange}>
              Get Started
            </Button>
          </Link>
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
  isAuthenticated: state.authState.isAuthenticated,
  firstName: state.authState.firstName,
});

export default connect(mapStateToProps, { logoutUser })(PageHeader);
