import React, { useContext } from "react";
import { AuthContext } from "../../providers/Auth";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? <RouteComponent {...routeProps} /> : <Redirect to={"/"} />
      }
    ></Route>
  );
}

export default PrivateRoute;
