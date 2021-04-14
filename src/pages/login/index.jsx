import { React } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLoggedInSelector } from '../../store/flow/auth/selector'
// import styles from './form/style.module.scss';

const Login = ({
  Token, isLoggedIn, dispatchLogin, location,
}) => {
  if (Token && isLoggedIn) {
    const referer = location.state ? location.state.referer : '/';
    return <Redirect to={referer} />;
  }

  return (
    <div>
      <Header
        isLoggedIn={false}
        customTitle=""
      />
      <div>
        <Add dispatchAdd={dispatchLogin} />
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
  Token: tokenSelector(state),
});

const mapDispatchToProps = {
  dispatchLogin: login,
};

Login.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  Token: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  dispatchLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
