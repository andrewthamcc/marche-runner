import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";

// components
import PrivateRoute from "./components/PrivateRoute";
import Toast from "./components/Toast";

import Home from "./scenes/Home";
import Signup from "./scenes/Signup";
import Dashboard from "./scenes/Dashboard";
import Profile from "./scenes/Profile";
import MealPlan from "./scenes/Meal-Plan";
import NotFound from "./scenes/404";

require("./styles/App.scss");

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/mealplan" component={MealPlan} />
            <Route path="/signup" component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        <Toast />
      </div>
    </Provider>
  );
}

export default App;
