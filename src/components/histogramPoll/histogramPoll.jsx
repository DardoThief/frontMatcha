import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official';
import { connect } from 'react-redux';
import { getPollResult } from '../../store/flow/polls/actions';
import styles from '../../pages/polls/pollScore/pollScore.module.scss';
import refresh from '../../images/ic-refresh.svg';

const HistogramPoll = (props) => {
  const {
    width,
    height,
    currentPoll,
    currentPollFromList,
    setResult,
    result,
    getResult,
  } = props;
  const handleClose = () => {
    setResult(!result);
  };
  useEffect(() => getResult(currentPoll.id), []);
  const fontSize = width >= 620 ? '24px' : '14px';
  const options = {
    chart: {
      type: currentPollFromList.histogram_type === 'horizontal' ? 'bar' : 'column',
      width: width * 0.6822,
      height: height * 0.56,
      style: {
        fontFamily: 'SBSansInterface-Semibold',
      },
    },
    colors: ['#10bf6a'],
    title: {
      text: '',
    },
    xAxis: {
      categories: currentPoll.labels,
      lineColor: 'black',
      lineWidth: 3,
      labels: {
        style: {
          fontSize,
          color: 'black',
        },
      },
    },
    yAxis: {
      gridLineWidth: 0,
      min: 0.01,
      title: {
        text: '',
        align: 'high',
      },
      labels: {
        enabled: false,
        overflow: 'justify',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize,
            fontWeight: 'normal',
          },
        },
      },
      column: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize,
            fontWeight: 'normal',
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [{
      animation: false,
      name: 'Результат',
      data: currentPoll.count,
    }],
  };

  return (
    <>
      <div className={styles.refresh}>
        <img
          src={refresh}
          onClick={getResult}
          role="presentation"
        />
      </div>
      <div className={styles.poll}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
      <button
        type="button"
        title="Назад к опросу"
        className={styles.showScore}
        onClick={handleClose}
      >
        Назад к опросу
      </button>
    </>
  );
};

HistogramPoll.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  currentPoll: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]).isRequired,
  currentPollFromList: PropTypes.objectOf(PropTypes.any).isRequired,
  setResult: PropTypes.func.isRequired,
  result: PropTypes.bool.isRequired,
  getResult: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  dispatchGetPollResult: getPollResult,
};

export default connect(null, mapDispatchToProps)(HistogramPoll);
