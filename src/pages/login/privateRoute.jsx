/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { login } from '../../store/flow/auth/actions';
import { isLoggedInSelector, tokenSelector } from '../../store/flow/auth/selector';

const PrivateRoute = (prop) => {
  const { component: Component, ...rest } = prop;
  const { isLoggedIn, dispatchLogin } = prop;
  useEffect(() => {
    dispatchLogin();
  }, []);

  return (
    <Route
      exact
      {...rest}
      component={(props) => (isLoggedIn ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: '/auth/sign-in', state: { referer: props.location } }} />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
  token: tokenSelector(state),
});

const mapDispatchToProps = {
  dispatchLogin: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
