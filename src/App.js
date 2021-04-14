/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.scss';
import { connect } from 'react-redux';
import history from './history';
import Auth from './pages/auth';
import Skeleton from './pages/skeleton/skeleton';
import PrivateRoute from './pages/login/privateRoute';
import { setView } from './store/flow/auth/actions';

const App = ({ dispatchSetView }) => {
  useEffect(() => {
    dispatchSetView({
      isMobile: window.innerWidth <= 800,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const handler = (e) => dispatchSetView({
      isMobile: e.currentTarget.innerWidth <= 800,
      width: e.currentTarget.innerWidth,
      height: e.currentTarget.innerHeight,
    });

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/auth/sign-up"
          component={(prop) => (
            <Auth
              {...prop}
            />
          )}
        />
        <Route
          exact
          path="/auth/sign-in"
          component={(prop) => (
            <Auth
              {...prop}
            />
          )}
        />
        <PrivateRoute
          path="/"
          component={(prop) => <Skeleton {...prop} />}
        />
      </Switch>
    </Router>
  );
};

const mapDispatchToProps = {
  dispatchSetView: setView,
};

App.propTypes = {
  dispatchSetView: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
