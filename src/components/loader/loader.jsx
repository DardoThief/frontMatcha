import React from 'react';
import PropTypes from 'prop-types';
import styles from './loaderStyles.module.scss';
import spinner from '../../images/spinner.svg';

const Loader = ({ loading }) => (
  <>
    {loading && (<span className={styles.spinner}><img src={spinner} /></span>)}
  </>
);

Loader.propTypes = {
  loading: PropTypes.bool,
};

Loader.defaultProps = {
  loading: false,
};

export default Loader;
