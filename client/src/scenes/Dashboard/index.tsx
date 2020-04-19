import React from "react";
import { connect } from "react-redux";

// components
import CategoryIcon, { iconType } from "../../components/Category-Icon";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {}

interface ReduxDispatchProps {}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Dashboard: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="dashboard">
      <div className="container">
        <CategoryIcon iconType={iconType.produce} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Dashboard);
