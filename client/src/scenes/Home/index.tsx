import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { Link, useHistory } from "react-router-dom";

// components
import Layout from "../../layout";
import Button, { buttonColor } from "../../components/Button";
import SigninModal from "../../components/Modal/SigninModal";
import useModal from "../../utils/useModal";
import Screenshot from "./assets/marcherunner-list.png";
import { ReactComponent as Profile } from "./assets/profile.svg";
import { ReactComponent as List } from "./assets/list.svg";
import { ReactComponent as Cart } from "./assets/cart.svg";

// redux actions
import { loginUser } from "../../actions/auth";

// models
import { LoginFormData } from "../../models/user";

require("./style.scss");

interface Props {
  loginUser: (guestLogin: LoginFormData) => void;
}

const Home: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const { loginUser } = props;

  // other hooks
  const history = useHistory();
  const { open, openModal, closeModal } = useModal();

  const guestSignin = () => {
    const guest = {
      email: "guest@andrewtham.cc",
      password: "123456",
    };

    loginUser(guest);
    // hack to push to dashboard
    setTimeout(() => {
      history.push("/dashboard");
    }, 200);
  };

  return (
    <Layout>
      <div className="home">
        {open && <SigninModal isModalOpen={open} close={closeModal} />}

        <section className="hero">
          <div className="container">
            <div className="hero-text">
              <h1>MarchéRunner</h1>
              <p>
                MarchéRunner is a web application for helping with your grocery
                runs.
              </p>
              <p>
                Try it out{" "}
                <span className="hero-text-link" onClick={() => guestSignin()}>
                  here
                </span>
                .
              </p>
              <Link to="/signup">
                <Button
                  className="hero-button"
                  color={buttonColor.orange}
                  border={false}
                >
                  Get Started
                </Button>
              </Link>
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
                  needs. Write your list, head off on your shopping trip, and
                  start over again.
                </p>
                <p className="about-text">
                  Items are separated into categories to make your shopping
                  trips easier. There's lots of future plans with continous
                  updates to improve MarchéRunner and expand on its features.
                </p>
              </div>
              <div className="about-screenshot">
                <img src={Screenshot} alt="MarchéRunner app screenshot" />
              </div>
            </div>
          </div>
        </section>

        <section className="steps">
          <div className="container">
            <h2 className="steps-title">Get running....</h2>
            <div className="steps-flex-container">
              <div className="steps-direction">
                <div className="steps-direction-image">
                  <Profile />
                </div>

                <p className="steps-direction-text">1. Create a profile.</p>
              </div>

              <div className="steps-direction">
                <div className="steps-direction-image">
                  <List />
                </div>
                <p className="steps-direction-text">
                  2. Login and start making your shopping list.
                </p>
              </div>

              <div className="steps-direction">
                <div className="steps-direction-image">
                  <Cart />
                </div>
                <p className="steps-direction-text">
                  3. Go shopping with MarchéRunner!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: AppState) => ({});

export default connect(mapStateToProps, { loginUser })(Home);
