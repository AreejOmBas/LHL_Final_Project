import React from "react";
import { Route, Redirect } from "react-router-dom";

/* Component to make survey route private not accessable unless user is logged in */

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => token
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}
export default PrivateRoute;