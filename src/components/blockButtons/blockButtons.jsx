import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';
import leftArrow from '../../images/shape.svg';
import rightArrow from '../../images/arrow-right.svg';

const BlockButtons = (props) => {
  const {
    position, onClick, color, disabled,
  } = props;
  return (
    <div className={styles.container}>
      {!disabled
        ? (
          <button type="button" className={styles.button} onClick={onClick}>
            <div className={cx({
              [styles.leftButton]: position === 'left',
              [styles.rightButton]: position === 'right',
              [styles.greyButton]: color === 'grey',
            })}
            >
              <img
                src={position === 'right' ? rightArrow : leftArrow}
                className={position === 'right' ? rightArrow : leftArrow}
              />
            </div>
          </button>
        ) : <div className={styles.hiddenDiv} />}
    </div>
  );
};

BlockButtons.propTypes = {
  position: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};
BlockButtons.defaultProps = {
  color: 'green',
  disabled: false,
};
export default BlockButtons;
