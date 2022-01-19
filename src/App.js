import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  AboutPage,
  ErrorPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
} from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
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
        <Route path={"/products/:id"} exact>
          <SingleProductPage />
        </Route>
        <Route path={"*"} exact>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
