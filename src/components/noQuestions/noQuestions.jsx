import React from 'react';
import PropTypes from 'prop-types';
import styles from './noQuestions.module.scss';
import sadNoQuestions from '../../images/sadNoQuestions.png';
import HeadNSub from '../headNSub/headNSub';

const MAIN = 'Опросов пока нет…';
const SUBTEXT = 'В данный момент Администратор еще не запустил ни одного опроса, подождите, пока администратор запустит опрос.';

const NoQuestions = ({ loading }) => (
  <div className={styles.noQuestionsMain}>
    {!loading && (
      <>
        <img className={styles.sad} src={sadNoQuestions} />
        <HeadNSub main={MAIN} sub={SUBTEXT} />
      </>
    )}
  </div>
);

NoQuestions.propTypes = {
  loading: PropTypes.bool,
};

NoQuestions.defaultProps = {
  loading: false,
};

export default NoQuestions;
