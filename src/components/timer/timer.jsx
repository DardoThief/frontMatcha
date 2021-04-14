import React from 'react';
import PropTypes from 'prop-types';
import styles from './timer.module.scss';
import plural from '../../utils/plural';

const Timer = ({ time, isPoll }) => {
  const fun = (val) => {
    if (val.days !== 0) {
      return ((val.days % 10) !== 1 || val.days === 11) ? ' осталось ' : ' остался ';
    }
    if (val.days === 0 && val.hours !== 0) {
      return ((val.hours % 10) !== 1 || val.hours === 11) ? ' осталось ' : ' остался ';
    }
    return ((val.minutes % 10) !== 1 || val.minutes === 11) ? ' осталось ' : ' осталась ';
  };

  return (
    <div>
      {time && isPoll
        ? (
          <div>
            {time && !time.isClose
              ? (
                <div className={styles.timer}>
                  Прием вопросов будет завершен через
                  {time.days !== 0
                  && (
                  <span>
                    {` ${time.days} `}
                    {plural(time.days, [' день ', ' дня ', ' дней '])}
                  </span>
                  )}
                  {time.hours !== 0
                  && (
                  <span>
                    {` ${time.hours} `}
                    {plural(time.hours, [' час ', ' часа ', ' часов '])}
                  </span>
                  )}
                  {` ${time.minutes} `}
                  {plural(time.minutes, [' минуту ', ' минуты ', ' минут '])}
                </div>
              ) : (
                <div className={styles.timer}>
                  Прием вопросов завершен
                </div>
              )}
          </div>
        ) : (
          <div>
            {time && !time.isClose
              ? (
                <div className={styles.timer}>
                  До конца проведения опроса
                  {fun(time)}
                  {time.days !== 0
                  && (
                    <span>
                      {` ${time.days} `}
                      {plural(time.days, [' день ', ' дня ', ' дней '])}
                    </span>
                  )}
                  {time.hours !== 0
                  && (
                  <span>
                    {` ${time.hours} `}
                    {plural(time.hours, [' час ', ' часа ', ' часов '])}
                  </span>
                  )}
                  {` ${time.minutes} `}
                  {plural(time.minutes, [' минута ', ' минуты ', ' минут '])}
                </div>
              ) : (
                <div className={styles.timer}>
                  Опрос завершен
                </div>
              )}
          </div>
        )}
    </div>
  );
};

Timer.propTypes = {
  time: PropTypes.objectOf(PropTypes.any),
  isPoll: PropTypes.bool.isRequired,
};

Timer.defaultProps = {
  time: {},
};

export default Timer;
