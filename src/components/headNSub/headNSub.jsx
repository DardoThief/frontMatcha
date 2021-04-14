import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './headNSub.module.scss';

const HeadNSub = ({ main, sub, customStyle }) => (
  <div className={cx(customStyle)}>
    <p className={styles.title}>{main}</p>
    <p className={styles.sub}>{sub}</p>
  </div>
);

HeadNSub.propTypes = {
  main: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  customStyle: PropTypes.string,
};

HeadNSub.defaultProps = {
  customStyle: null,
};

export default HeadNSub;
