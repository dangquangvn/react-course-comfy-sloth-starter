import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const Auth0ProviderWithHistory = ({ children }) => {
  // const domain = process.env.REACT_APP_DOMAIN;
  // const clientId = process.env.REACT_APP_CLIENTID;

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    console.log(
      "🚀TCL: ~ file: Auth0ProviderWithHistory.js ~ line 12 ~ onRedirectCallback ~ appState",
      appState
    );
    history.push((appState && appState.returnTo) || window.location.pathname);
    // history.push("/cart");

    // window.history.replaceState(
    //   {},
    //   document.title,
    //   appState && appState.returnTo
    // );
  };

  return (
    <Auth0Provider
      // domain={domain}
      // clientId={clientId}
      // redirectUri={window.location.origin}
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0ProviderWithHistory;
