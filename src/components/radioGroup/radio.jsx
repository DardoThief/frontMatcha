import React from 'react';
import PropTypes from 'prop-types';
import styles from './radio.module.scss';

const Radio = ({ options, selectedId, setSelectedId }) => {
  const onChange = (e) => {
    setSelectedId(e.target.value);
  };

  return (
    <form
      onChange={onChange}
    >
      {options.map((option) => (
        <input
          type="radio"
          className={styles.item}
          key={option.id}
          value={option.id}
          checked={selectedId === option.id}
        />
      ))}
    </form>
  );
};

Radio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedId: PropTypes.number.isRequired,
  setSelectedId: PropTypes.func.isRequired,
};

export default React.memo(Radio);
