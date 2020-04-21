import React from "react";
import { ReactComponent as Spinner } from "./assets/spinner.svg";

require("./style.scss");

interface Props {}

const Loader: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="loading">
      <Spinner className="loading-spinner" />
    </div>
  );
};

export default Loader;
