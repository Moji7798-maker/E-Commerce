import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../helperFunctions";
import { connect } from "react-redux";

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        user.userInfo && user.userInfo.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user/dashboard",
              state: { from: props.location },
            }}
          />
        )
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(AdminRoute);
