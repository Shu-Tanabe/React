import React from 'react';
import RegisterData from './components/RegisterData';
import ListData from './components/ListData';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={ListData} exact />
          <Route path="/list" component={ListData} exact />
          <Route path="/add" component={RegisterData} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
