import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch as AntSwitch } from 'antd';
import './custom.vendor.scss';

const Switch = ({
  checked: initialChecked,
  disabled,
  loading,
  onChange,
}) => {
  const [checked, setChecked] = useState(initialChecked);
  useEffect(() => setChecked(initialChecked), [initialChecked]);

  const onChangeHandler = (val, e) => {
    e.stopPropagation();
    onChange(val);
  };

  return (
    <AntSwitch
      onChange={onChangeHandler}
      checked={checked}
      disabled={disabled}
      loading={loading}
    />
  );
};

Switch.defaultProps = {
  checked: false,
  disabled: false,
  loading: false,
  onChange: () => {},
};

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};

export default React.memo(Switch);
