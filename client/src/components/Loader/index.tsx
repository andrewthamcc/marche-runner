import React from "react";
import Spinner from "./assets/spinner.svg";

require("./style.scss");

interface Props {}

const Loader: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="loading">
      <img src={Spinner} alt="Loading..." className="loading-spinner" />
    </div>
  );
};

export default Loader;
