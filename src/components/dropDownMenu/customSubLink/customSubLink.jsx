import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from './customSubLinkStyles.module.scss';

const CustomSubLink = ({ exact, route }) => {
  const {
    label = '', icon = '', path, activeIcon = '', children,
  } = route;
  const match = useRouteMatch({ path, exact });
  return (
    <NavLink
      className={styles.subListItem}
      activeClassName={styles.subListItem_active}
      exact={exact}
      to={path}
    >
      {icon && (
        <img
          src={match ? activeIcon : icon}
          className={match ? styles.icon_active : styles.icon}
        />
      )}
      <div className={styles.label}>
        <span
          className={`${styles.label__text} ${match && styles.label__text_active}`}
        >
          {label}
        </span>
        {children && (
          <span />
        )}
      </div>
      {match && children && (
        <ul className={`${styles.subList} ${styles.list}`}>
          {children.map((subRoute) => (
            <li key={`${path}-${subRoute.path}`}><CustomSubLink to={subRoute.path} /></li>
          ))}
        </ul>
      )}
    </NavLink>
  );
};

CustomSubLink.propTypes = {
  exact: PropTypes.bool,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

CustomSubLink.defaultProps = {
  exact: false,
};

export default CustomSubLink;
