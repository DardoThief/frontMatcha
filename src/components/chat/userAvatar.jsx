import React from 'react';
import PropTypes from 'prop-types';
import styles from './chat.module.scss';
import polly from '../../images/logoAdmin.svg';

const UserAvatar = ({ color, nickname, isAdmin }) => {
  let initials = 'A';

  if (nickname && nickname !== null && !isAdmin) {
    initials = nickname.split(' ').map((item) => item.slice(0, 1)).join('').slice(0, 2)
      .toUpperCase();
  }

  return (
    <div className={styles.userPhotoContainer} style={{ backgroundColor: color }}>
      {isAdmin ? <img src={polly} /> : initials}
    </div>
  );
};

UserAvatar.propTypes = {
  color: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default UserAvatar;
