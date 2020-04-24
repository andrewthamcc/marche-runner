import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface OwnProps {}

interface ReduxStateProps {
  isAuthenticated: boolean;
}

interface ReduxDispatchProps {}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props: Props) =>
        !isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authState.isAuthenticated,
});

export default connect(mapStateToProps, {})(PrivateRoute);
