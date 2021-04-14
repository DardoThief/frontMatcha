import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import style from './modal.module.scss';
import close from './icons/close.svg';
import './custom.vendor.scss';

const DEFAULT_MODAL = {
  title: '',
  visible: false,
  setVisible: () => {},
  onOk: () => {},
  onCancel: () => {},
  cancelText: 'Сбросить',
  okText: 'Применить',
  footer: null,
  children: null,
  loading: false,
  withoutSave: false,
  width: 520,
};

const FilterModal = ({
  title, visible, onOk, onCancel, children, setVisible, width, footer,
}) => {
  const onCancelHandler = () => {
    onCancel();
    setVisible(false);
  };

  return (
    <Modal
      title={(
        <div className={style.modal__title}>
          {title || DEFAULT_MODAL.title}
          <button type="button" onClick={onCancel} className={style.modal__titleReset}>
            <img src={close} alt="close" />
          </button>
        </div>
    )}
      visible={visible}
      onOk={onOk || DEFAULT_MODAL.onOk}
      closable={false}
      bodyStyle={{ padding: '26px 32px 41px 32px' }}
      onCancel={onCancelHandler}
      className={style.modal__container_search}
      footer={footer || DEFAULT_MODAL.footer}
      destroyOnClose
      width={width}
    >
      {children || DEFAULT_MODAL.children}
    </Modal>
  );
};
FilterModal.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  footer: PropTypes.element,
};
FilterModal.defaultProps = {
  title: DEFAULT_MODAL.title,
  visible: DEFAULT_MODAL.visible,
  setVisible: DEFAULT_MODAL.setVisible(),
  onOk: DEFAULT_MODAL.onOk(),
  onCancel: DEFAULT_MODAL.onCancel(),
  children: DEFAULT_MODAL.children,
  width: DEFAULT_MODAL.width,
  footer: DEFAULT_MODAL.footer,
};
export default React.memo(FilterModal);
