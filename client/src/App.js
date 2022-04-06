import React from "react";
import "./App.css";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Users from "./Pages/Users";

let Routes = [
  {
    path: "/",
    component: Login,
    exact: true,
    authenticated: false /** set true If you want to restrict route for logged in users */,
  },
  {
    path: "/signup",
    component: Signup,
    exact: true,
    authenticated: false,
  },
  {
    path: "/users",
    component: Users,
    exact: true,
    authenticated: true,
  },
];

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  /** It will check for logged in user otherwise redirect to login page */
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/" />;
};

function App() {
  const isAuthenticated = localStorage.getItem("token");
  debugger;
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {Routes.map((route, index) => {
            return !route.authenticated ? (
              /** Logic for public routes which will be accessible without login */
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ) : (
              /** Logic for private routes which will be accessible If user is logged in */
              <PrivateRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
                isAuthenticated={
                  typeof isAuthenticated === "string"
                } /** we are checking with type string because the token which  is present in the localstorage will be string. 
                
                If it is undefined or null then we should consider it as unauthenticated
                */
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
