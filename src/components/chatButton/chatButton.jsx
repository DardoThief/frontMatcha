import React from 'react';
import PropTypes from 'prop-types';
import chatView from '../../images/chat.svg';
import chatClose from '../../images/close-chat.svg';
import styles from './chatButton.module.scss';

const ChatButton = ({ isOpen, onClick }) => (
  <button type="button" className={styles.ovalChat} onClick={onClick}>
    <img src={isOpen ? chatClose : chatView} />
  </button>
);

ChatButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ChatButton;
