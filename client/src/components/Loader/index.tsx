import React from "react";
import Spinner from "./assets/spinner.svg";
// import { ReactComponent as Spinner } from "./assets/spinner.svg";

require("./style.scss");

const Loader = () => {
  return (
    <div className="loading">
      <img src={Spinner} alt="Loading..." className="loading-spinner" />
      {/* <Spinner className="loading-spinner" /> */}
    </div>
  );
};

export default Loader;
