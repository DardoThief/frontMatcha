import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Popover } from 'antd';
import Switch from '../switch';
import styles from './oneRow.module.scss';
import svgPhone from '../../images/phone.svg';
import AdminMobilePult from '../../pages/adminMobilePult';
import history from '../../history';
import del from '../../images/ic-delete.svg';

const OneRow = ({
  switchHandler,
  deleteLoading,
  element,
  link,
  deleteHandler,
}) => (
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  <div className={styles.container}>
    <div className={styles.containerHeader}>
      <Link
        to={link}
        className={cx({
          [styles.imgTitleContainer]: true,
          [styles.opacity]: !element.is_active,
        })}
      >
        <p className={styles.title}>{element.name}</p>
      </Link>
      <div className={styles.buttonsContainer}>
        <img
          className={styles.del}
          src={del}
          onClick={() => {
            deleteHandler(element.id);
          }}
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Popover
            title="Мобильный пульт"
            content={(
              <div>
                <p className={styles.popup}>
                  Сканируйте код, чтобы открыть мобильный пульт управления трансляцией
                </p>
                <AdminMobilePult id={element.id} />
              </div>
            )}
          >
            <img className={styles.iconPult} src={svgPhone} alt="pult" />
          </Popover>
        </div>
        <Switch
          loading={deleteLoading}
          disabled={deleteLoading}
          checked={element.is_active}
          onChange={(e) => switchHandler(element.name, e)}
        />
      </div>
    </div>
    <div className={styles.containerBlock}>
      {element.blocks.map((elem) => (
        <div
          key={elem.id}
          className={styles.block}
          onClick={() => history.push(`/admin/events/${element.id}/block/${elem.id}`)}
        >
          {elem.name}
        </div>
      ))}
    </div>
  </div>
);

OneRow.defaultProps = {
  deleteLoading: false,
};

OneRow.propTypes = {
  switchHandler: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool,
  element: PropTypes.instanceOf(Object).isRequired,
  link: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default OneRow;
