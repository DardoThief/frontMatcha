import React from 'react';
import PropTypes from 'prop-types';
import styles from './chat.module.scss';
import close from '../../images/closeRepBtn.svg';

const RepliedMessage = (props) => {
  const { message, closeable } = props;
  if (message) {
    return (
      <div className={styles.repliedMessageContainer} style={{ borderColor: message.color }}>
        <span className={styles.userName}>{message.nickname}</span>
        {closeable && (
          <button type="button" className={styles.closeRepBtn} onClick={closeable}>
            <img src={close} />
          </button>
        )}
        <div className={styles.chatMessageContainer_replied}>{message.message}</div>
      </div>
    );
  }
  return null;
};

RepliedMessage.defaultProps = {
  message: {},
  closeable: null,
};
RepliedMessage.propTypes = {
  message: PropTypes.instanceOf(Object),
  closeable: PropTypes.func,
};

export default RepliedMessage;
