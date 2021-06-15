import React from 'react';
import PatientInfo from './PatientInfo';
import PatientSearch from './PatientSearch';
import ReceiptInfo from './ReceiptInfo';
import style from './style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const Receipt = () => {
  return (
    <>
      {/* <h3 className="m-3">접수 및 수납</h3>
      <hr/>
       */}
      <div className="d-flex flex-row">

        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 위  */}
          <div className={cx("menu")}>
            <button className="btn btn-outline-secondary btn-lg mr-3">신규 등록</button>
            <button className="btn btn-outline-secondary btn-lg mr-3">예약/조회</button>
            <button className="btn btn-outline-secondary btn-lg mr-5">전체 보기</button>
            <button className="btn btn-outline-danger btn-lg ml-5">환자 삭제</button>
          </div>
          <div className={cx("left-component-top")}>
            <PatientSearch/>
          </div>
          {/* 아래  */}
          <div className={cx("left-component-bottom")}>
            <ReceiptInfo/>
          </div>
        </div>
        {/* 우측  */}
        <div className={cx("right-component")}>
          <PatientInfo/>
        </div>
      </div>
    </>
  );
};

export default Receipt;