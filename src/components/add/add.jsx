import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './add.module.scss';
import HeadNSub from '../headNSub/headNSub';
import { isLoadingSelector } from '../../store/flow/auth/selector';
import { ReactComponent as Load } from '../../images/ic-loader-button.svg';

const Add = ({ isLoading, dispatchAdd }) => {
  const [newEvent, setNewEvent] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const inputRef = createRef();

  const add = (e) => {
    e.preventDefault();
    if (newEvent) {
      dispatchAdd(newEvent, () => {
      });
      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
        setNewEvent('');
      }
    }
  };

  const idHandler = (e) => {
    if (e.target.value.length && e.target.validity.valid) {
      setNewEvent(e.target.value);
      setDisabled(false);
    } else {
      setNewEvent('');
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (newEvent.length && !isLoading) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isLoading, newEvent]);

  return (
    <div className={styles.add}>
      <HeadNSub main="Добавить новое мероприятие" sub="Введите код события" customStyle={styles.marginTop} />
      <form onSubmit={add} className={styles.form}>
        <input
          ref={inputRef}
          className={styles.code}
          placeholder="123 633"
          onChange={idHandler}
        />
      </form>
      <button type="submit" className={styles.bg} onClick={add} disabled={isDisabled}>
        {isLoading ? <Load /> : <span className={styles.label}>Добавить</span>}
      </button>
    </div>
  );
};

Add.propTypes = {
  dispatchAdd: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: isLoadingSelector(state),
});

export default connect(mapStateToProps, null)(Add);
