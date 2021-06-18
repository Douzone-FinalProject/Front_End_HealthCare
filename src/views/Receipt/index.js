import React from 'react';
import PatientInfo from './PatientInfo';
import PatientSearch from './PatientSearch';
import ReceiptInfo from './ReceiptInfo';
import style from './style.module.css';
import classNames from 'classnames/bind';
import  Button  from "../common/Button";

const cx = classNames.bind(style);

const Receipt = (props) => {
  return (
    <>
      {/* <h4 className={cx("title")}>접수 및 수납</h4> */}

      <div className={cx("menu")}>
        <Button className="ml-1" color="#4dabf7">신규 등록</Button>
        <Button className="ml-3" color="#15aabf">예약</Button>

        {/* <button className={cx("menu-btn-1")}>신규 등록</button>
        <button className={cx("menu-btn-2")}>예약</button> */}
      </div>
      <div className="d-flex flex-row">
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 위 - 환자 검색 컴포넌트  */}
          <div className={cx("left-component-top")}>
            <PatientSearch/>
          </div>
          {/* 아래 - 진료자 리스트 컴포넌트 */}
          <div className={cx("left-component-bottom")}>
            <ReceiptInfo/>
          </div>
        </div>
        {/* 우측 - 환자 상세 정보 컴포넌트 */}
        <div className={cx("right-component")}>
          <div>
            <PatientInfo/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;