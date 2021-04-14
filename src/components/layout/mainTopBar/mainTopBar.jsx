import React from 'react';
import { connect } from 'react-redux';
import './mainTopBar.scss';
import cx from 'classnames';
import logo from './icons/logo.svg';
import styles from './mainTopBar.module.scss';
import Logout from './logout/logout';
import { userSelector } from '../../../store/flow/auth/selector';

const MainTopBar = () => (
  <div className={cx(styles.container, styles.containerStripLayer)}>
    <img
      src={logo}
      alt="logo"
      className={styles.logo}
    />
    <div className={styles.rightSection}>
      <Logout />
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  user: userSelector(state),
});

export default connect(mapStateToProps, null)(React.memo(MainTopBar));
