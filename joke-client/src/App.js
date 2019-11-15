import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import JokeList from './components/JokeList';
import PrivateRoute from './utils/PrivateRoute';


import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/jokes">Joke List</Link>
          </li>
        </ul>

        <Switch>
          <PrivateRoute path ="/jokes" component={JokeList} />
          <Route path ="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
