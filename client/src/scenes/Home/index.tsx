import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// components
import Button, { buttonColor } from "../../components/Button";
import SigninModal from "../../components/SigninModal";
import useModal from "../../components/SigninModal/useModal";

require("./style.scss");

const Home: React.FC = (): JSX.Element => {
  const { open, openModal, closeModal } = useModal();

  return (
    <div className="home">
      {open && <SigninModal isModalOpen={open} close={closeModal} />}

      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <h1>shopRunner</h1>
            <p>
              shopRunner is a web application for helping with your grocery
              runs.
            </p>
            <Button
              className="hero-button"
              color={buttonColor.orange}
              border={false}
            >
              <Link to="/signup">Get Started</Link>
            </Button>
            <p className="hero-signin">
              Already have an account?{" "}
              <span className="hero-signin-link" onClick={openModal}>
                Sign in
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="about-flex-container">
            <div className="about-flex-container-left">
              <h2 className="about-title">How it works...</h2>
              <p className="about-text">
                A super simple web application for all your grocery shopping
                needs. Sign up, start adding to your list, check things off when
                you're done, delete and edit items, and start over again.
              </p>
              <p className="about-text">
                Items are separated into categories to make your shopping trips
                easier. There will be future updates to build lists from recipes
                inputed into the shopRunner system.
              </p>
            </div>
            <div className="about-flex-container-right"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
