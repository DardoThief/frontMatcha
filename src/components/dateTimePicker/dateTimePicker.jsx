import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import styles from './dateTimePicker.module.scss';
import './custom.vendor.scss';

const DateTimePicker = ({
  startTime,
  setEndTime,
  endTime,
  setStartTime,
  pickerValue,
  title,
  onChangeValue,
}) => (
  <>
    <div>
      <div className={styles.date_time}>{title}</div>
      <div className={styles.flex}>
        <DateRangePicker
          placeholder="Выберите даты события"
          showOneCalendar
          ranges={[]}
          isoWeek
          value={pickerValue}
          onChange={((value) => {
            onChangeValue(value);
          })}
          locale={{
            sunday: 'Вс',
            monday: 'Пн',
            tuesday: 'Вт',
            wednesday: 'Ср',
            thursday: 'Чт',
            friday: 'Пт',
            saturday: 'Сб',
            ok: 'Применить',
          }}
        />
        <div>
          <div className={styles.flex}>
            <TimePicker
              placeholder="Начало"
              format="HH:mm"
              value={startTime}
              onChange={((value) => {
                setStartTime(value);
              })}
            />
            <span className={styles.defis}>-</span>
            <TimePicker
              placeholder="Конец"
              format="HH:mm"
              value={endTime}
              onChange={((value) => {
                setEndTime(value);
              })}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
DateTimePicker.defaultProps = {
  setStartTime: () => {},
  setEndTime: () => {},
  startTime: undefined,
  endTime: undefined,
  onChangeValue: () => {},
};

DateTimePicker.propTypes = {
  startTime: PropTypes.instanceOf(Object),
  setEndTime: PropTypes.func,
  endTime: PropTypes.instanceOf(Object),
  setStartTime: PropTypes.func,
  pickerValue: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func,
};
export default DateTimePicker;
