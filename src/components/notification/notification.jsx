import React from 'react';
import { notification } from 'antd';
import successIcon from '../../images/ic-done.svg';
import errorIcon from '../../images/ic-mistake.svg';
import warnIcon from '../../images/ic-warning.svg';
import closeIcon from '../../images/close.svg';
import './styles.vendor.scss';

export const NOTIFICATION_TYPE__SUCCESS = 1;
export const NOTIFICATION_TYPE__ERROR = 2;
export const NOTIFICATION_TYPE__INFO = 3;
export const NOTIFICATION_TYPE__WARNING = 4;
export const NOTIFICATION_TYPE__WARN = 5;

const notificationIcons = {
  [NOTIFICATION_TYPE__SUCCESS]: successIcon,
  [NOTIFICATION_TYPE__ERROR]: errorIcon,
  [NOTIFICATION_TYPE__WARN]: warnIcon,
  [NOTIFICATION_TYPE__WARNING]: warnIcon,
};

const typesMap = {
  [NOTIFICATION_TYPE__SUCCESS]: 'success',
  [NOTIFICATION_TYPE__ERROR]: 'error',
  [NOTIFICATION_TYPE__INFO]: 'info',
  [NOTIFICATION_TYPE__WARNING]: 'warning',
  [NOTIFICATION_TYPE__WARN]: 'warn',
};

export default {
  open: (
    type = NOTIFICATION_TYPE__INFO,
    message = '',
    description = '',
    icon,
  ) => {
    const method = typesMap[type];
    if (!method) {
      // eslint-disable-next-line no-console
      console.err('Unknown notification type', type);
    }
    notification[method]({
      message,
      icon: <img src={icon || notificationIcons[type]} />,
      description,
      duration: 5,
      closeIcon: <img src={closeIcon} />,
    });
  },
};
