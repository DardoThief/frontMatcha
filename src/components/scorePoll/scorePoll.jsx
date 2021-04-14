import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './scorePoll.module.scss';
import { pollCurrentSelector } from '../../store/flow/polls/selector';
import { getPollResult, getPollResults, replyPoll } from '../../store/flow/polls/actions';
import one from '../../images/1.png';
import two from '../../images/2.png';
import three from '../../images/3.png';
import four from '../../images/4.png';
import five from '../../images/5.png';
import PollScore from '../../pages/polls/pollScore';
import style from '../../pages/polls/pollScore/pollScore.module.scss';
import refresh from '../../images/ic-refresh.svg';

const getImg = (score) => {
  if (score < 1.5) return one;
  if (score < 2.5) return two;
  if (score < 3.5) return three;
  if (score < 4.5) return four;
  if (score >= 4.5) return five;

  return null;
};

const getRightCase = (replies) => {
  if (typeof replies !== 'number') return '';
  if (replies % 10 === 1 && replies !== 11) return ` от ${replies} зрителя`;

  return ` от ${replies} зрителей`;
};

const ScorePoll = ({
  pult,
  currentPoll,
  dispatchGetPoll,
  dispatchGetPollResults,
  dispatchReplyPoll,
  status,
  setResult,
  result,
  poll,
}) => {
  const getResult = () => {
    dispatchGetPollResults(poll.id);
  };
  useEffect(() => {
    if (pult && poll && poll.object_id) {
      dispatchGetPoll(poll.object_id);
      const intrvl = setInterval(
        () => dispatchGetPoll(poll.object_id), 2000,
      );
      return (() => clearInterval(intrvl));
    } if (!pult) {
      getResult(poll.id);
    }
    return false;
  }, [status, result]);
  const replies = currentPoll.reply_count;
  const handleClick = () => {
    setResult(!result);
  };

  return replies === 0 ? (
    <div className={styles.scorePoll}>
      <div className={styles.desc}>Оценок нет.</div>
    </div>
  ) : (
    <>
      {result === true ? (
        <div className={styles.scorePoll}>
          {!pult && (
          <div className={styles.refresh}>
            <img
              src={refresh}
              onClick={getResult}
              role="presentation"
            />
          </div>
          )}
          <div className={styles.score}>
            <img src={getImg(currentPoll.replies.score)} className={styles.scoreImg} />
            <p className={styles.scoreText}>{currentPoll.replies.score}</p>
          </div>
          <div className={styles.desc}>
            Средняя оценка выступления спикера
            {getRightCase(replies)}
            .
          </div>
          {!pult && (
          <button
            type="button"
            title="Посмотреть результаты"
            className={style.showScore}
            onClick={handleClick}
          >
            Назад к опросу
          </button>
          )}
        </div>
      ) : (
        <>
          <PollScore
            poll={poll}
            reply={dispatchReplyPoll}
          />
        </>
      )}
    </>
  );
};

ScorePoll.propTypes = {
  pult: PropTypes.bool,
  currentPoll: PropTypes.instanceOf(Object).isRequired,
  dispatchGetPoll: PropTypes.func.isRequired,
  dispatchGetPollResults: PropTypes.func.isRequired,
  dispatchReplyPoll: PropTypes.func.isRequired,
  status: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setResult: PropTypes.func,
  result: PropTypes.bool.isRequired,
  poll: PropTypes.instanceOf(Object).isRequired,
};
ScorePoll.defaultProps = {
  pult: false,
  setResult: () => {},
};

const mapStateToProps = (state) => ({
  currentPoll: pollCurrentSelector(state),
});

const mapDispatchToProps = {
  dispatchGetPoll: getPollResult,
  dispatchGetPollResults: getPollResults,
  dispatchReplyPoll: replyPoll,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScorePoll);
