import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './skeleton.module.scss';
// import Navigation from '../../components/navigation';

const Skeleton = ({ events, dispatchSetId, dispatchGetEvents }) => {
  const path = useLocation().pathname.substring(1);

  let eventId;
  if (path.includes('/')) {
    const secondSlashIndex = path.indexOf('/');
    eventId = Number(path.substring(0, secondSlashIndex));
  } else {
    eventId = Number(path);
  }
  // const event = events.find((item) => item.id === eventId);
  //
  // const history = useHistory();
  // const location = useLocation().pathname;

  // useEffect(() => {
  //   if (!location.includes('blocks') && event && event.blocks && event.blocks[0] && event.blocks[0].id) {
  //     dispatchSetId(eventId);
  //     history.push(`/${eventId}/blocks/${event.blocks[0].id}`);
  //   }
  // }, [event]);

  // useEffect(() => {
  //   if (!location.includes('blocks')) {
  //     dispatchGetEvents();
  //   }
  // }, []);

  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path="/mainPage">
          <div className={styles.viewBlocks}>
            <h1>Hello</h1>
            {/*{event && event.blocks && <Navigation blocks={event.blocks} />}*/}
            <div className={styles.wrapper}>
              <div className={styles.mainContent}>
                {/*<Questions />*/}
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
});

Skeleton.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Skeleton);
