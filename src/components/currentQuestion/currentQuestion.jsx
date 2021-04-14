import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './currentQuestion.module.scss';
import likeImg from '../../images/like.png';
import dislike from '../../images/dislike.png';

const CurrentQuestion = ({ current }) => (
  <div className={styles.questionContainer}>
    <p className={cx({
      [styles.questionText]: true,
      [styles.bigText]: current.text && current.text.length > 200,
    })}
    >
      {current.text}
    </p>
    <div className={styles.feedbackFlex}>
      <div className={styles.oneFeedback}>
        <img className={styles.fbImg} src={likeImg} />
        <p className={styles.fbText}>{current.likes}</p>
      </div>
      <div className={cx(styles.oneFeedback, styles.dislikesMargin)}>
        <img className={styles.fbImg} src={dislike} />
        <p className={styles.fbText}>{current.dislikes}</p>
      </div>
    </div>
  </div>
);

CurrentQuestion.propTypes = {
  current: PropTypes.instanceOf(Object).isRequired,
};

export default CurrentQuestion;
