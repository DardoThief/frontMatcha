import React from 'react';
import vkQr from '@vkontakte/vk-qr';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import styles from './welcomeScreen.module.scss';
import sb from '../../images/qrLogo.svg';

const WelcomeScreen = (props) => {
  const { width, code } = props;
  const url = process.env.REACT_APP_URL;
  const link = `${url}/checkoutEvent/${code}`;
  const q = vkQr.createQR(link, {
    qrSize: width * 0.144985,
    isShowLogo: true,
    logoData: sb,
  });

  return (
    <div className={styles.welcome}>
      <SVG src={q} />
      <p className={styles.text}>
        Для перехода к событию сканируйте QR код
        или введите код
        {' '}
        <span className={styles.span1}>{code}</span>
        {' '}
        на сайте
        {' '}
        <a href={url} target="_blank" rel="noopener noreferrer"><span className={styles.span2}>{url}</span></a>
      </p>
    </div>
  );
};

WelcomeScreen.propTypes = {
  width: PropTypes.number.isRequired,
  code: PropTypes.number,
};

WelcomeScreen.defaultProps = {
  code: null,
};

export default WelcomeScreen;
