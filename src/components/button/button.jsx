import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styles from './button.module.scss';

export const BUTTON_STYLES_ENUM = {
  SUCCESS: 'success',
  SUCCESS_OUTLINE: 'success_outline',
  WARNING: 'warning',
  WARNING_OUTLINE: 'warning_outline',
  DANGER: 'danger',
  DANGER_OUTLINE: 'danger_outline',
  WHITE: 'white',
  GREY: 'grey',
};

const Button = (props) => {
  const {
    buttonStyles,
    buttonExtClasses,
    label,
    loading,
    isDisabled,
    callback,
    icon,
    iconCN,
  } = props;
  const buttonClasses = {
    ...buttonExtClasses,
    [styles.button]: buttonStyles.indexOf(BUTTON_STYLES_ENUM.WHITE) === -1,
    [styles.default]: !buttonStyles.length,
    [styles.success]: buttonStyles.indexOf(BUTTON_STYLES_ENUM.SUCCESS) !== -1,
    [styles.success_outline]: buttonStyles.indexOf(BUTTON_STYLES_ENUM.SUCCESS_OUTLINE) !== -1,
    [styles.danger]: buttonStyles.indexOf(BUTTON_STYLES_ENUM.DANGER) !== -1,
    [styles.dangerOutline]: buttonStyles.indexOf(BUTTON_STYLES_ENUM.DANGER_OUTLINE) !== -1,
    [styles.white]: buttonStyles.indexOf(BUTTON_STYLES_ENUM.WHITE) !== -1,
    [styles.grey]: buttonStyles.indexOf(BUTTON_STYLES_ENUM.GREY) !== -1,
  };
  const loadingIcon = <Icon type="loading" className={styles.loading} spin />;

  return (
  // eslint-disable-next-line react/button-has-type
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={callback}
      className={cx(buttonClasses)}
      disabled={isDisabled || loading}
    >
      {loading && <span className={styles.loading}>{loadingIcon}</span>}
      {icon && <img src={icon} alt={label} className={cx(iconCN, [styles.icon])} />}
      <span>{label}</span>
    </button>
  );
};

Button.defaultProps = {
  buttonStyles: [],
  buttonExtClasses: {},
  loading: false,
  isDisabled: false,
  callback: () => {},
  icon: '',
  iconCN: '',
};

Button.propTypes = {
  buttonStyles: PropTypes.arrayOf(PropTypes.any),
  buttonExtClasses: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  callback: PropTypes.func,
  icon: PropTypes.node,
  iconCN: PropTypes.string,
};

export default React.memo(Button);
