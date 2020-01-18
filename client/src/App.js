import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

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
            <Route path='/profiles' component={() => (
              <div className="container">
                <Profiles />
              </div>
            )} />
            <Route exact path='/profile/:id' component={(props) => (
              <div className="container">
                <Profile props={props} />
              </div>
            )} />
            <PrivateRoute path='/dashboard' component={() => (
              <div className="container">
                <Alert />
                <Dashboard />
              </div>
            )} />
            <PrivateRoute path='/create-profile' component={() => (
              <div className="container">
                <Alert />
                <CreateProfile />
              </div>
            )} />
            <PrivateRoute path='/edit-profile' component={() => (
              <div className="container">
                <Alert />
                <EditProfile />
              </div>
            )} />
            <PrivateRoute path='/add-experience' component={() => (
              <div className="container">
                <Alert />
                <AddExperience />
              </div>
            )} />
            <PrivateRoute path='/add-education' component={() => (
              <div className="container">
                <Alert />
                <AddEducation />
              </div>
            )} />
            <PrivateRoute exact path='/posts' component={() => (
              <div className="container">
                <Alert />
                <Posts />
              </div>
            )} />
            <PrivateRoute exact path='/posts/:id' component={(props) => (
              <div className="container">
                <Alert />
                <Post props={props} />
              </div>
            )} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
