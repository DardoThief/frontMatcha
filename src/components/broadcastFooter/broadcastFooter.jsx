import React from 'react';
import vkQr from '@vkontakte/vk-qr';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import styles from './broadcastFooter.module.scss';
import group13 from '../../images/group-13.svg';
import sb from '../../images/qrLogo.svg';

const BroadcastFooter = (props) => {
  const { showQr, code, width } = props;
  const link = `${process.env.REACT_APP_URL}/checkoutEvent/${code}`;
  const q = vkQr.createQR(link, {
    qrSize: width * 0.09235,
    isShowLogo: true,
    logoData: sb,
  });

  return (
    <div className={styles.pFooter}>
      <img src={group13} className={styles.group3} />
      <div className={styles.flex}>
        <div>{process.env.REACT_APP_URL}</div>
        <div>
          {`Код события: ${code}`}
        </div>
      </div>
      {showQr && (<div className={styles.forQr}><SVG src={q} /></div>)}
    </div>
  );
};

BroadcastFooter.propTypes = {
  showQr: PropTypes.bool.isRequired,
  code: PropTypes.number,
  width: PropTypes.number.isRequired,
};

BroadcastFooter.defaultProps = {
  code: null,
};

export default BroadcastFooter;
