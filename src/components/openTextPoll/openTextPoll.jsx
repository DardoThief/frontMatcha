/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import WordCloud from 'wordcloud';
import PropTypes from 'prop-types';
import { pollDataAdminSelector } from '../../store/flow/polls/selector';
import { getPollResult } from '../../store/flow/polls/actions';

const OpenTextPoll = ({
  dispatchGetPollResult, currentPoll, width, height, poll,
}) => {
  useEffect(() => {
    const intrvl = setInterval(() => dispatchGetPollResult(poll.object_id), 4000);
    return (() => clearInterval(intrvl));
  }, []);
  const ref = useRef(null);
  const list = Array.isArray(poll.replies)
    ? poll.replies.map((e) => [e.text, e.count]) : [];
  useEffect(() => {
    const canvasWidth = width * 0.8;
    ref.current.width = canvasWidth;
    ref.current.height = height * 0.7;
    WordCloud(ref.current,
      {
        gridSize: Math.round((16 * canvasWidth) / 1024),
        drawOutOfBound: true,
        list,
        weightFactor: (size) => Math.log1p(size) * 50,
        fontFamily: 'SBSansInterface-Semibold',
        color: (word) => (word === poll.biggestWord ? '#10bf6a' : '#eeeeee'),
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: 'white',
      });
  }, []);

  return (
    <canvas id="my_canvas" ref={ref} />
  );
};

OpenTextPoll.propTypes = {
  dispatchGetPollResult: PropTypes.func.isRequired,
  currentPoll: PropTypes.instanceOf(Object).isRequired,
  poll: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentPoll: pollDataAdminSelector(state),
});

const mapDispatchToProps = {
  dispatchGetPollResult: getPollResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenTextPoll);
