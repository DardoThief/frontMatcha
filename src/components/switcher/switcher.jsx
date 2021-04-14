import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import './custom.vendor.scss';
import styles from './switcher.module.scss';

const Switcher = (props) => {
  const {
    usualName, additionalName, onChange, selectedValue,
  } = props;
  return (
    <Radio.Group
      className={styles.switcher_container}
      value={selectedValue}
      onChange={onChange}
      defaultValue={usualName}
      buttonStyle="solid"
    >
      <Radio.Button value={usualName}>{usualName}</Radio.Button>
      <Radio.Button value={additionalName}>{additionalName}</Radio.Button>
    </Radio.Group>
  );
};

Switcher.propTypes = {
  usualName: PropTypes.string.isRequired,
  additionalName: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Switcher;
