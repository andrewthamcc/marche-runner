import React from "react";
import Spinner from "./assets/spinner.svg";

require("./style.scss");

interface Props {}

const Loader: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="loading">
      <div className="loading-spinner">
        <img src={Spinner} alt="loading..." />
      </div>
    </div>
  );
};

export default Loader;
