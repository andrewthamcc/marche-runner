import React from "react";

import PageHeader from "./Page-Header";
import Footer from "./Footer";

require("./style.scss");

const Layout: React.FC = ({ children }): JSX.Element => {
  return (
    <div className="layout">
      <PageHeader />
      <div className="layout-content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
