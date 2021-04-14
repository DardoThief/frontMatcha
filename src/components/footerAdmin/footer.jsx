import React from 'react';
import PropTypes from 'prop-types';
import styles from './footer.module.scss';

const Footer = ({
  children,
}) => (
  <div className={styles.container}>
    {children}
  </div>
);

Footer.defaultProps = {
  children: '',
};

Footer.propTypes = {
  children: PropTypes.node,
};

export default Footer;
