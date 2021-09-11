import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";

// import PrivateRoute from "./helpers/PrivateRoute";
// import PublicRoute from "./helpers/PublicRoute";

import Homee from "./pages/main/Home/Home";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Router>
          <Switch>
            <Route path="/" exact component={Homee} />
          </Switch>
        </Router>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
