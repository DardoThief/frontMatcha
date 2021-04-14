import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import styles from './logout.module.scss';
import { userSelector } from '../../../../store/flow/auth/selector';
import { logout } from '../../../../store/flow/auth/actions';

const Logout = (props) => {
  const { dispatchLogout } = props;
  const history = useHistory();
  const handleLogout = () => {
    history.push('/login');
    dispatchLogout();
  };
  return (
    <button type="button" className={styles.button} onClick={handleLogout}>
      Выход
    </button>
  );
};

Logout.propTypes = {
  dispatchLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  dispatchLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Logout));
