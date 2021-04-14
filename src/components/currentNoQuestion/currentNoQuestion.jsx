import React from 'react';
import vkQr from '@vkontakte/vk-qr';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import styles from './currentNoQuestion.module.scss';
import logo from '../../images/qrLogo.svg';

const CurrentNoQuestion = (props) => {
  const { width, code } = props;
  const link = `${process.env.REACT_APP_URL}/checkoutEvent/${code}`;
  const q = vkQr.createQR(link, {
    qrSize: width * 0.144985,
    isShowLogo: true,
    logoData: logo,
  });

  return (
    <div className={styles.noQuestionContainer}>
      <SVG src={q} />
      <p className={styles.mainText}>Ждем ваших вопросов!</p>
      <p className={styles.subText}>Сканируйте QR код, чтобы задать вопрос</p>
    </div>
  );
};

CurrentNoQuestion.propTypes = {
  width: PropTypes.number.isRequired,
  code: PropTypes.number,
};

CurrentNoQuestion.defaultProps = {
  code: 0,
};

export default CurrentNoQuestion;
