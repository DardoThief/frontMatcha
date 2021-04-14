import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import './pagination.vendor.scss';

const PaginationFooter = ({
  total,
  page,
  setPage,
}) => {
  const onChangeHandler = (e) => {
    setPage(e - 1);
  };
  return (
    <div className="pagination__container">
      <Pagination
        defaultPageSize={1}
        total={total || 1}
        onChange={onChangeHandler}
        size="small"
        showSizeChanger={false}
        current={page}
      />
    </div>
  );
};

PaginationFooter.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default PaginationFooter;
