import React from 'react';
import {
  arrayOf, oneOfType, object, string,
} from 'prop-types';
import styles from './menuStyles.module.scss';
import CustomLink from './customLink/customLink';

const DropDownMenu = ({ routes }) => (
  <ul className={styles.list}>
    {routes.map((route) => (
      <li key={route.key} className={styles.container}>
        <CustomLink
          route={route}
          exact
        />
      </li>
    ))}
  </ul>
);

DropDownMenu.propTypes = {
  routes: arrayOf(oneOfType([object, string])),
};

DropDownMenu.defaultProps = {
  routes: [],
};

export default DropDownMenu;
