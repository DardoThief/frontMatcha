import React from 'react';
import { connect } from 'react-redux';
import { Popover } from 'antd';
import PropTypes from 'prop-types';
import styles from './headerAdmin.module.scss';
import logoFull from '../../images/logoFull.svg';
import logoMobile from '../../images/logoMobile.svg';
import path from '../../images/path.svg';
import radio from '../../images/radio.svg';
import logout from '../../images/log_out.svg';
import { currentEventSelector } from '../../store/flow/events/selector';
import { logout as goLogout } from '../../store/flow/auth/actions';
import { idSelector, isMobileSelector } from '../../store/flow/auth/selector';
import './custom.vendor.scss';
import history from '../../history';
import arrow from '../../images/arrow-up-right.svg';

export const Oval = () => <div className={styles.Oval2} />;

export const OvalActive = () => (
  <div className={styles.Oval}>
    <img className={styles.img} src={path} />
  </div>
);

const HeaderAdmin = ({
  inEvent, isMobile, customTitle, dispatchLogout, openNewWindow,
}) => (
  <div className={styles.root}>
    <div className={styles.mainFlex}>
      <img src={isMobile ? logoMobile : logoFull} />
      <div className={styles.Rectangle} />
      <p className={styles.currentEventName}>
        {customTitle}
      </p>
      {inEvent && (
        <>
          <Popover
            content="Открыть трансляцию"
          >
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <img
              className={styles.button}
              src={arrow}
              onClick={() => openNewWindow()}
            />
          </Popover>
          <button type="button" className={styles.CombinedShape} onClick={() => history.push('/pult')}>
            <img src={radio} className={styles.radio} />
            <span className={styles.available}>Доступные мне мероприятия</span>
          </button>
        </>
      )}
      <button type="button" className={styles.CombinedShape} onClick={() => dispatchLogout()}>
        <img src={logout} className={styles.logout} />
        <span className={styles.available}>Выйти</span>
      </button>
    </div>
  </div>
);

HeaderAdmin.propTypes = {
  inEvent: PropTypes.bool,
  isMobile: PropTypes.bool.isRequired,
  customTitle: PropTypes.string,
  dispatchLogout: PropTypes.func.isRequired,
  openNewWindow: PropTypes.func,
};

HeaderAdmin.defaultProps = {
  inEvent: false,
  customTitle: '',
  openNewWindow: () => {},
};

const mapStateToProps = (state) => ({
  currentEvent: currentEventSelector(state),
  currentId: idSelector(state),
  isMobile: isMobileSelector(state),
});

const mapDispatchToProps = {
  dispatchLogout: goLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
