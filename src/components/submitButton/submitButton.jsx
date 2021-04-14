import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './submitButton.module.scss';
import { ReactComponent as Load } from '../../images/ic-loader-button.svg';

const Submit = ({
  callback, isActive, isLoading, label,
}) => (
  <div className={styles.submitWrapper}>
    <button
      className={cx({ [styles.submitBtn]: true, [styles.active]: isActive })}
      type="button"
      disabled={!isActive || isLoading}
      onClick={callback}
    >
      {isLoading ? <Load /> : <p className={styles.text}>{label}</p>}
    </button>
  </div>
);

Submit.defaultProps = {
  isActive: false,
  isLoading: false,
  label: 'Отправить',
};

Submit.propTypes = {
  callback: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
};

export default Submit;
