import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { isLoading, error, loginWithRedirect, isAuthenticated, logout, user } =
    useAuth0();

  const [myUser, setMyUser] = useState(null);

  //= version 1
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setMyUser(user);
  //   } else {
  //     setMyUser(false);
  //   }
  // }, [isAuthenticated, user]);
  //= version 2
  useEffect(() => {
    setMyUser(user);
  }, [user]);

  const loginWithRedirectToCurrentPage = () => {
    return loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
  };
  return (
    <UserContext.Provider
      value={{
        isLoading,
        error,
        loginWithRedirect,
        isAuthenticated,
        logout,
        user,
        myUser,
        loginWithRedirectToCurrentPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
