import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from "dotenv";
import { BrowserRouter, useHistory } from "react-router-dom";
import { Auth0ProviderWithHistory, AuthWrapper } from "./pages";
dotenv.config();

// const onRedirectCallback = (appState) => {
//   const history = useHistory();
//   history.push(
//     appState && appState.targetUrl
//       ? appState.targetUrl
//       : (window.location.href = "https://www.exampleroute.com/pointofredirect")
//   );
// };
// const onRedirectCallback = (appState) => {
//   console.log(
//     "🚀TCL: ~ file: index.js ~ line 23 ~ onRedirectCallback ~ appState",
//     appState
//   );
//   window.history.replaceState(
//     {},
//     document.title,
//     appState && appState.targetUrl
//       ? appState.targetUrl
//       : window.location.pathname
//   );
// };

ReactDOM.render(
  //= version 1: using Auth0Provider at top
  // <Auth0Provider
  //   domain={process.env.REACT_APP_DOMAIN}
  //   clientId={process.env.REACT_APP_CLIENID}
  //   redirectUri={window.location.origin}
  //   // onRedirectCallback={onRedirectCallback}
  // >
  //   <UserProvider>
  //     <ProductsProvider>
  //       <FilterProvider>
  //         <CartProvider>
  //           <App />
  //         </CartProvider>
  //       </FilterProvider>
  //     </ProductsProvider>
  //   </UserProvider>
  // </Auth0Provider>,
  //= version 2: using BrowserRouter at top so that we could use useHistory in Auth0Provider
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <AuthWrapper>
        <UserProvider>
          <ProductsProvider>
            <FilterProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </FilterProvider>
          </ProductsProvider>
        </UserProvider>
      </AuthWrapper>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById("root")
);
