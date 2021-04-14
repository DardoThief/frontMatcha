import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './block.module.scss';
import SimpleModal from '../modal/confirm';
import trashIcon from '../../images/ic-delete.svg';
import questionIcon from '../../images/questions.svg';
import moveNextIcon from '../../images/ic-move-next.svg';
import history from '../../history';
import { deleteBlock } from '../../store/flow/block/actions';

const Block = ({
  eventId, blockId, name, dispatchDeleteBlock,
}) => {
  const handleDeleteBlock = (e) => {
    e.stopPropagation();
    return (
      SimpleModal({
        title: 'Удаление блока',
        content: 'Вы уверены, что хотите удалить блок?',
        onOk: () => dispatchDeleteBlock(blockId),
        okText: 'Удалить',
        cancelText: 'Отмена',
        okButtonProps: {
          type: 'danger',
          ghost: true,
        },
        cancelButtonProps: {
          type: 'disabled',
          ghost: true,
        },
      })
    );
  };

  const onClick = () => {
    history.push(`/admin/events/${eventId}/block/${blockId}`);
  };

  return (
    <div
      role="presentation"
      className={styles.container}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <div className={styles.element}>
        <div className={styles.wrap}>{name}</div>
        <div className={styles.icons}>
          <img src={questionIcon} />
          <img
            className={styles.cursor}
            src={trashIcon}
            onClick={handleDeleteBlock}
            onKeyDown={handleDeleteBlock}
            role="presentation"
          />
          <img src={moveNextIcon} />
        </div>
      </div>
    </div>
  );
};

Block.defaultProps = {
  blockId: null,
  eventId: null,
  name: '',
};

Block.propTypes = {
  blockId: PropTypes.number,
  eventId: PropTypes.number,
  name: PropTypes.string,
  dispatchDeleteBlock: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  dispatchDeleteBlock: deleteBlock,
};

export default connect(null, mapDispatchToProps)(Block);
