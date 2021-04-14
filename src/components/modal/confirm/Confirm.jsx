import React from 'react';
import { Modal } from 'antd';
import style from '../modal.module.scss';
import './custom.vendor.scss';

const { confirm } = Modal;
const DEFAULT_SIMPLE = {
  title: '',
  content: '',
  onOk: () => {},
  onCancel: () => {},
  okText: 'Да',
  cancelText: 'Нет',
  okButtonProps: {
    type: 'default',
    ghost: true,
  },
};

/* eslint-disable  */
const Confirm = ({
  title,
  content,
  onOk,
  onCancel,
  okText,
  cancelText,
  okButtonProps,
  cancelButtonProps,
}) => (
  <div style={{width: '600px'}}>
    { confirm({
      title: title || DEFAULT_SIMPLE.title,
      content: content || DEFAULT_SIMPLE.content,
      onOk: onOk || null,
      onCancel: onCancel || null,
      okText: okText || DEFAULT_SIMPLE.okText,
      cancelText: cancelText || DEFAULT_SIMPLE.cancelText,
      className: style.modal__container_simple,
      okButtonProps: okButtonProps || DEFAULT_SIMPLE.okButtonProps,
      cancelButtonProps: cancelButtonProps || DEFAULT_SIMPLE.cancelButtonProps,
      icon: null,
    })}
  </div>
);

export default Confirm;
