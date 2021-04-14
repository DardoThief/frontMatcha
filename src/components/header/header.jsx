import React, { useState } from 'react';
import { connect } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './header.module.scss';
import logoFull from '../../images/logoFull.svg';
import logoMobile from '../../images/logoMobile.svg';
import path from '../../images/path.svg';
import radio from '../../images/radio.svg';
import Modal from '../modal/modal';
import { currentEventSelector, eventsSelector } from '../../store/flow/events/selector';
import { addEvent } from '../../store/flow/events/actions';
import notification, { NOTIFICATION_TYPE__SUCCESS } from '../notification/notification';
import { idSelector, isMobileSelector } from '../../store/flow/auth/selector';
import './custom.vendor.scss';
import Add from '../add';
import addStyles from '../add/add.module.scss';
import { setId } from '../../store/flow/auth/actions';

export const Oval = () => <div className={styles.Oval2} />;

export const OvalActive = () => (
  <div className={styles.Oval}>
    <img className={styles.img} src={path} />
  </div>
);

const Header = ({
  events, dispatchAddEvent, dispatchSetId, currentEvent, currentId,
  loggedIn, isMobile, customTitle, isAdmin,
}) => {
  const { pathname } = useLocation();
  const [eventsOpened, setEventsOpened] = useState(pathname === '/');
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const navHandle = (id) => {
    if (currentId !== id) {
      dispatchSetId(id);
      notification.open(NOTIFICATION_TYPE__SUCCESS, 'Переключено на другое событие.');
    }
  };

  return (
    <div className={styles.root}>
      <Modal
        title="Доступные мне мероприятия"
        visible={eventsOpened}
        setVisible={setEventsOpened}
        onCancel={() => { setEventsOpened(false); setOpenAddEvent(false); }}
      >
        <div className={styles.eventsContainer}>
          <div>
            {events.map((e) => {
              let isActive;

              if (pathname === `/${e.id}`) {
                isActive = () => matchPath(pathname, { path: `/${e.id}`, exact: true });
              } else {
                isActive = () => matchPath(pathname, { path: `/${e.id}/blocks/:id`, exact: true });
              }

              return (
                <NavLink
                  key={e.id}
                  className={styles.event}
                  to={e.blocks && e.blocks[0] !== undefined ? `/${e.id}/blocks/${e.blocks[0].id}` : `/${e.id}`}
                  isActive={isActive}
                  onClick={() => navHandle(e.id)}
                >
                  <p className={styles.modalEventName}>{e.name}</p>
                  {isActive() ? (<OvalActive />) : (<Oval />)}
                </NavLink>
              );
            })}
          </div>
          {events.length > 0 && !openAddEvent && (
            <button
              type="submit"
              className={cx(addStyles.bg, addStyles.bigBT)}
              onClick={() => setOpenAddEvent(true)}
            >
              <span className={addStyles.label}>Добавить новое мероприятие</span>
            </button>
          )}
          {(openAddEvent || events.length === 0) && (
          <Add dispatchAdd={dispatchAddEvent} />
          )}
        </div>
      </Modal>
      <div className={styles.mainFlex}>
        <img src={isMobile ? logoMobile : logoFull} />
        <div className={styles.Rectangle} />
        <p className={styles.currentEventName}>
          {loggedIn
            ? currentEvent.name : customTitle}
        </p>
        {loggedIn && !isAdmin && (
          <button type="button" className={styles.CombinedShape} onClick={() => setEventsOpened(true)}>
            <img src={radio} className={styles.radio} />
            {!isMobile && (<span className={styles.available}>Доступные мне мероприятия</span>)}
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: eventsSelector(state), // store.events.data
  currentEvent: currentEventSelector(state),
  currentId: idSelector(state),
  isMobile: isMobileSelector(state),
});

const mapDispatchToProps = {
  dispatchAddEvent: addEvent,
  dispatchSetId: setId,
};

Header.defaultProps = {
  currentId: null,
  customTitle: 'Интерактивное голосование',
  isAdmin: false,
};

Header.propTypes = {
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  dispatchAddEvent: PropTypes.func.isRequired,
  currentEvent: PropTypes.objectOf(PropTypes.any).isRequired,
  currentId: PropTypes.number,
  loggedIn: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool,
  customTitle: PropTypes.string,
  dispatchSetId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
