import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import cx from 'classnames';
import attach from '../../images/attach.svg';
import delIc from '../../images/ic-delete.svg';
import reloadIc from '../../images/ic-reload.svg';
import styles from './uploader.module.scss';

const Uploader = ({
  file, changeHandler, deleteHandler, accept,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    changeHandler(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div
      {...getRootProps()}
      className={cx({
        [styles.wrongFile]: file[0] && !accept.includes(file[0].type),
        [styles.container]: true,
        [styles.haveFile]: file[0] && file[0].name,
        [styles.notFile]: !file[0],
      })}
    >
      <input {...getInputProps()} accept={accept} />
      {(!file[0] || (file[0] && accept.includes(file[0].type)))
      && <img src={attach} className={styles.attach} />}
      {file[0] ? (
        <p className={cx({ [styles.name]: true, [styles.wrong]: !accept.includes(file[0].type) })}>
          {accept.includes(file[0].type) ? file[0].name : 'Неверный формат'}
        </p>
      ) : <p className={styles.name}>Загрузить файл</p>}
      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
      {/* eslint-disable jsx-a11y/click-events-have-key-events */}
      {file[0] && accept.includes(file[0].type)
      && <img src={delIc} onClick={deleteHandler} className={styles.delIc} />}
      {file[0] && !accept.includes(file[0].type)
      && <img src={reloadIc} onClick={deleteHandler} className={styles.delIc} />}
    </div>
  );
};

Uploader.defaultProps = {
  file: [],
  accept: '',
};

Uploader.propTypes = {
  file: PropTypes.instanceOf(Array),
  changeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  accept: PropTypes.string,
};

export default Uploader;
