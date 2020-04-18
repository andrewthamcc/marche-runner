import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";

// components
import Home from "./scenes/Home";
import Dashboard from "./scenes/Dashboard";
import Profile from "./scenes/Profile";

require("./styles/App.scss");

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
