import React from "react";
import { connect } from "react-redux";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {}

interface ReduxDispatchProps {}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Profile: React.FC<Props> = (props: Props): JSX.Element => {
  return <div></div>;
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Profile);
