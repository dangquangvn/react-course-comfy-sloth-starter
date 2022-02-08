import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  AboutPage,
  ErrorPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
  CheckoutPage,
  CartPage,
  PrivateRoute,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    // <AuthWrapper>
    // <Router>
    <>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route path={"/"} exact>
          <HomePage />
        </Route>
        <Route path={"/about"}>
          <AboutPage />
        </Route>
        <Route path={"/products"} exact>
          <ProductsPage />
        </Route>
        <Route path={"/products/:id"} children={<SingleProductPage />} />
        <Route path={"/cart"}>
          <CartPage />
        </Route>
        <PrivateRoute path={"/checkout"}>
          <CheckoutPage />
        </PrivateRoute>
        <Route path={"*"}>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </>
    // </Router>
    // </AuthWrapper>
  );
}

export default App;
