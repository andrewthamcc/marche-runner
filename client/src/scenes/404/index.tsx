import React from "react";
import { ReactComponent as NotFoundImage } from "./assets/notfound.svg";

// components
import Layout from "../../layout";

require("./style.scss");

const NotFound: React.FC = (props): JSX.Element => {
  return (
    <Layout>
      <div className="not-found container">
        <div className="not-found-title">
          <NotFoundImage />
          <h2>404</h2>
        </div>
        <p>Sorry, page not found</p>
      </div>
    </Layout>
  );
};

export default NotFound;
