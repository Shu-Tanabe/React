import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from './Menu';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Menu} />
          <Route path="/SignIn" component={SignIn} exact />
          <Route render={() => <p>No First Page!.</p>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
