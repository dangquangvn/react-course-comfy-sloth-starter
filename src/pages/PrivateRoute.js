import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
import { useUserContext } from "../context/user_context";

const PrivateRoute = ({
  children /**component ben trong PrivareRoute */,
  ...rest /** extrac all props like path, exact */
}) => {
  const { isAuthenticated, user } = useAuth0();
  const { myUser } = useUserContext();
  const isUser = isAuthenticated && user;
  console.log("🚀TCL: ~ file: PrivateRoute.js ~ line 13 ~ isUser", isUser);
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to={"/"} />)}
    ></Route>
  );
};
export default PrivateRoute;
