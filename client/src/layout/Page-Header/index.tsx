import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Runner } from "./assets/runner.svg";

// components
import SigninModal from "../../components/SigninModal";
import useModal from "../../components/SigninModal/useModal";
import Button, { buttonColor } from "../../components/Button";
import Icon, { iconType } from "../../components/Icon";

require("./style.scss");

// once user is authenticated nav will alter to "Welcome {name}"
// display current date somewhere

// non-authenticated (sign in, get started)
// authenticated (welcome, edit profile gear icon?)

const PageHeader: React.FC = (): JSX.Element => {
  const { open, openModal, closeModal } = useModal();

  return (
    <>
      {open && <SigninModal isModalOpen={open} close={closeModal} />}

      <header className="page-header">
        <div className="page-header-flex-container container">
          <Link to="/">
            <div className="page-header-title">
              <h2>shopRunner</h2>
              <Runner className="page-header-title-icon" />
            </div>
          </Link>

          <nav className="page-header-nav">
            <ul className="page-header-nav-list">
              <li>
                <Button
                  color={buttonColor.green}
                  border={false}
                  onClick={openModal}
                >
                  <Icon iconType={iconType.profile} />
                  Sign In
                </Button>
              </li>
              <li>
                <Button color={buttonColor.green}>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(PageHeader);
