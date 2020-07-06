import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import FeedPage from "./pages/Feed/FeedPage";
import RegisterPage from "./pages/Register/RegisterPage";

export default function Rota() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/feed">
            <FeedPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
