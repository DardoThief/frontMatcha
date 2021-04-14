import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import './custom.vendor.scss';
import styles from './styles.module.scss';
import BlockButtons from '../blockButtons/blockButtons';

const Navigation = ({ blocks }) => {
  const history = useHistory();
  const split = history.location.pathname.split('/');
  const [activeBlock, setActiveBlock] = useState(split[split.length - 1]);
  let counter = blocks[0].sort_order;
  let currentBlock = counter - 1;
  for (let i = 0; i < blocks.length; i += 1) {
    if (blocks[i].id === Number(activeBlock)) {
      counter = blocks[i].sort_order;
      currentBlock = counter - 1;
      break;
    }
  }
  const onClickHandler = (id, nextBlock) => {
    setActiveBlock(id);
    counter += nextBlock;
    currentBlock = counter - 1;
    history.push(`/${blocks[0].event}/blocks/${blocks[currentBlock].id}`, { id });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {blocks.length > 1 && counter > 1 ? (
          <BlockButtons
            position="left"
            onClick={() => onClickHandler(Number(activeBlock) - 1, -1)}
          />
        ) : <div className={styles.hiddenDiv} />}
        <div className={styles.blockName}>{blocks[currentBlock] && blocks[currentBlock].name}</div>
        {blocks.length > 1 && counter < blocks.length ? (
          <BlockButtons
            position="right"
            onClick={() => onClickHandler(Number(activeBlock) + 1, 1)}
          />
        ) : <div className={styles.hiddenDiv} />}
      </div>
      <p className={styles.counter}>{`${counter}/${blocks.length}`}</p>
    </div>
  );
};

Navigation.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default React.memo(Navigation);
