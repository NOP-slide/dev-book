import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

// Redux imports
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // Need to set the token before doing anything else, or all auths will fail
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route path='/register' component={() => (
              <div className="container">
                <Alert />
                <Register />
              </div>
            )} />
            {/* <Route exact path='/login' component={Login} /> */}
            <Route path='/login' component={() => (
              <div className="container">
                <Alert />
                <Login />
              </div>
            )} />
            <PrivateRoute path='/dashboard' component={() => (
              <div className="container">
                <Dashboard />
              </div>
            )} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
