import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  NavLink, useRouteMatch,
} from 'react-router-dom';
import styles from './customLinkStyles.module.scss';

const CustomLink = ({ exact, route }) => {
  const {
    label = '', path, icon = '', activeIcon = '', children,
  } = route;
  const match = useRouteMatch(path);
  return (
    <>
      <NavLink
        className={styles.navLink}
        activeClassName={styles.navLink_active}
        exact={exact}
        to={path}
        isActive={() => match}
      >
        {icon && (
          <img
            src={match ? activeIcon : icon}
            className={match ? styles.icon_active : styles.icon}
          />
        )}
        <div className={styles.label}>
          <span
            className={cx({
              [styles.label__text]: true,
              [styles.label__text_active]: match,
            })}
          >
            {label}
          </span>
          {children && (
            <span />
          )}
        </div>
      </NavLink>
    </>
  );
};

CustomLink.propTypes = {
  exact: PropTypes.bool,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

CustomLink.defaultProps = {
  exact: false,
};

export default CustomLink;
