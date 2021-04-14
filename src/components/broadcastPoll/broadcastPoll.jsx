import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official';
import { connect } from 'react-redux';
import { pollCurrentSelector } from '../../store/flow/polls/selector';
import { getPollResult } from '../../store/flow/polls/actions';
import styles from '../../pages/polls/pollScore/pollScore.module.scss';

const BroadcastPoll = (props) => {
  const {
    width,
    height,
    poll,
    currentPoll,
    dispatchGetPollResult,
  } = props;
  useEffect(() => {
    if (poll && poll.object_id) {
      dispatchGetPollResult(poll.object_id);
    }
  }, []);
  useEffect(() => {
    const intrvl = setInterval(() => dispatchGetPollResult(poll.object_id), 2000);
    return (() => clearInterval(intrvl));
  }, [poll]);
  const fontSize = width >= 620 ? '24px' : '14px';
  const options = {
    chart: {
      type: poll.histogram_type === 'horizontal' ? 'bar' : 'column',
      width: width * 0.8,
      height: height * 0.7,
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
    <div className={styles.poll}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

BroadcastPoll.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  currentPoll: PropTypes.objectOf(PropTypes.any).isRequired,
  poll: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatchGetPollResult: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentPoll: pollCurrentSelector(state),
});

const mapDispatchToProps = {
  dispatchGetPollResult: getPollResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastPoll);
