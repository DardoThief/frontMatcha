import React from 'react';
import PropTypes from 'prop-types';

const SendIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20">
    <g fill="none" fillRule="evenodd">
      <g fill={color}>
        <g>
          <g>
            <path d="M386 20L368 10 368 19 377 20 368 22.675 368 30z" transform="translate(-1358 -772) translate(974 286) translate(16 476)" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SendIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default SendIcon;
