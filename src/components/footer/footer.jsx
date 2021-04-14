import React from 'react';
import PropTypes from 'prop-types';
import styles from './footer.module.scss';
import group13 from '../../images/group-13.svg';

const Footer = ({ adminPanel }) => (
  <div className={styles.root}>
    {adminPanel && (
    <div className={styles.adminPanel}>
      <p className={styles.adminPanelText}>Панель администратора</p>
    </div>
    )}
    <div className={styles.container}>
      <p className={styles.copyright}>© 1997—2020 ПАО Сбербанк.</p>
      <img className={styles.logo} src={group13} />
    </div>
  </div>
);

Footer.defaultProps = {
  adminPanel: false,
};
Footer.propTypes = {
  adminPanel: PropTypes.bool,
};

export default Footer;
