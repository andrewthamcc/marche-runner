import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";

// components
import PageHeader from "./layout/Page-Header";
import Footer from "./layout/Footer";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./scenes/Home";
import Signup from "./scenes/Signup";
import Dashboard from "./scenes/Dashboard";
import Profile from "./scenes/Profile";

require("./styles/App.scss");

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Route path={/^(?!.*signup).*$/} component={PageHeader} />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </main>
          <Route path={/^(?!.*signup).*$/} component={Footer} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
