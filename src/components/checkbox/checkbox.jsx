import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox as AntCheckbox } from 'antd';
// import { sendBlurAndChangeEvents } from '../formikHelper';
import styles from './checkbox.module.scss';
import './custom.vendor.scss';

const Checkbox = (props) => {
  const {
    value, checked: initialChecked, disabled, label, name, onChange,
  } = props;
  const [checked, setChecked] = useState(initialChecked || value);
  useEffect(() => setChecked(initialChecked || value), [initialChecked, value]);

  const onChangeHandler = useCallback((e) => {
    const { checked: isChecked } = e.target;
    setChecked(isChecked);
    onChange();
    // sendBlurAndChangeEvents(name, isChecked, onChange, onBlur);
  }, []);

  return (
    <AntCheckbox
      onChange={onChangeHandler}
      checked={checked}
      disabled={disabled}
      name={name}
      className={styles.container}
    >
      {label}
    </AntCheckbox>
  );
};

Checkbox.defaultProps = {
  value: false,
  checked: false,
  disabled: false,
  label: '',
  name: '',
  onChange: () => {},
};

Checkbox.propTypes = {
  value: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default React.memo(Checkbox);
