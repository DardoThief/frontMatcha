import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import editIc from './icons/edit.svg';
import deleteIc from './icons/delete.svg';
import styles from './twoButtons.module.scss';

const TwoButtons = ({
  // onClick,
  deleteHandler,
  updateHandler,
  element,
  link,
}) => (
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  <div className={styles.container}>
    <Link
      to={link}
      className={styles.imgTitleContainer}
    >
      <p className={styles.title}>{element.name}</p>
    </Link>
    <div className={styles.buttonsContainer}>
      <div
        onClick={(e) => { e.stopPropagation(); updateHandler(element.name, element.id); }}
        className={styles.iconDelete_container}
      >
        <img
          src={editIc}
          alt="edit"
          className={styles.iconDelete}
        />
      </div>
    </div>
    <div className={styles.buttonsContainer}>
      <div
        onClick={(e) => { e.stopPropagation(); deleteHandler(element.name, element.id); }}
        className={styles.iconDelete_container}
      >
        <img
          src={deleteIc}
          alt="delete"
          className={styles.iconDelete}
        />
      </div>
    </div>
  </div>
);

TwoButtons.defaultProps = {
  // onClick: () => {},
  deleteHandler: () => {},
  updateHandler: () => {},
};

TwoButtons.propTypes = {
  // onClick: PropTypes.func,
  updateHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  element: PropTypes.instanceOf(Object).isRequired,
  link: PropTypes.string.isRequired,
};

export default TwoButtons;
