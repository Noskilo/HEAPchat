import React, { useContext } from "react";
import { AuthContext } from "../../providers/Auth";
import { Route, Redirect } from "react-router-dom";

function WelcomeRoute({ component: RouteComponent, ...rest }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <Redirect to={"/chat"} />
        ) : (
          <RouteComponent {...routeProps} />
        )
      }
    />
  );
}

export default WelcomeRoute;
