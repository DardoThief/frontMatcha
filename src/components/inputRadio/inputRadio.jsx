import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './inputRadio.module.scss';
import { Oval, OvalActive } from '../header';
import multipleActive from '../../images/group-10.svg';

const Multiple = () => <div className={styles.multiple} />;

const MultipleActive = () => <img src={multipleActive} />;

const InputRadio = ({
  value,
  checked,
  onChange,
  text,
  multiple,
}) => {
  const Selected = multiple ? Multiple : Oval;
  const NotSelected = multiple ? MultipleActive : OvalActive;

  return (
    <button
      type="button"
      className={cx({ [styles.bg]: true, [styles.bgChecked]: checked })}
      onClick={() => onChange(value)}
    >
      <div className={styles.ovalContainer}>{checked ? (<NotSelected />) : (<Selected />)}</div>
      <p className={styles.text}>{text}</p>
    </button>
  );
};

InputRadio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
};

InputRadio.defaultProps = {
  multiple: false,
};

export default InputRadio;
