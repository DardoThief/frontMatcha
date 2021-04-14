import React from 'react';
import PropTypes from 'prop-types';
import styles from './broadcastHeader.module.scss';
import plural from '../../utils/plural';
import { QUESTIONS } from '../../utils/constans';

const BroadcastHeader = (props) => {
  const {
    showCount, count, status, showRes, currentPollFromList,
  } = props;
  const getTitle = () => {
    if (status === QUESTIONS) return 'Вопросы';
    if (typeof status === 'number' && showRes) return currentPollFromList.text;
    if (typeof status === 'number' && !showRes) return '';

    return false;
  };

  return (
    <div className={styles.main}>
      <p className={styles.mainText}>{getTitle()}</p>
      {showCount && count !== 0 && (
      <p className={styles.countText}>
        {((count % 10) !== 1 || count === 11) ? 'Осталось ' : 'Остался '}
        {`${count} `}
        {plural(count, ['вопрос', 'вопроса', 'вопросов'])}
      </p>
      )}
    </div>
  );
};

BroadcastHeader.propTypes = {
  showCount: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  showRes: PropTypes.bool,
  currentPollFromList: PropTypes.objectOf(PropTypes.any).isRequired,
};

BroadcastHeader.defaultProps = {
  showRes: false,
};

export default BroadcastHeader;
