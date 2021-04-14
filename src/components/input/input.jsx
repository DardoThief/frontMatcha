import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { sendBlurAndChangeEvents } from '../form/formikHelper';
import formStyles from '../form/styles.module.scss';
import styles from './input.module.scss';

const Input = (
  {
    defaultValue,
    disabled,
    onChange,
    onBlur,
    name,
    placeholder,
    label,
    type,
    customStyle,
    touched,
    error,
    confirmButton,
    maxlength,
  },
) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
    sendBlurAndChangeEvents(name, e.target.value, onChange, onBlur);
    onChange(e);
  };
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label || placeholder}</p>
      <div className={styles.inputicon}>
        <input
          name={name}
          onBlur={onBlur}
          placeholder={placeholder || ''}
          value={value}
          onChange={onChangeHandler}
          className={cx(styles.input, customStyle)}
          type={type}
          disabled={disabled}
          maxLength={maxlength}
        />
        {confirmButton && <span>{confirmButton}</span>}
      </div>
      {touched && error && (
        <div className={formStyles.error}>{error}</div>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  label: PropTypes.string,
  customStyle: PropTypes.string,
  type: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
  confirmButton: PropTypes.node,
  maxlength: PropTypes.string,
};

Input.defaultProps = {
  touched: false,
  error: '',
  defaultValue: '',
  disabled: false,
  placeholder: '',
  name: '',
  onChange: () => {
  },
  onBlur: () => {
  },
  label: '',
  customStyle: '',
  type: 'text',
  confirmButton: false,
  maxlength: '150',
};

export default Input;
