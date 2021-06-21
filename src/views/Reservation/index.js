import React from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import ReserveForm from './ReserveForm';
import ReserveResult from './ReserveResult';

const cx = classNames.bind(style);

const Reservation = (props) => {
  return (
    <>
      <div className="d-flex flex-row">
        {/* 좌측  */}
        <div className={cx("left-component")}>
          <div>
              {/* 선택 날짜에 따른 예약 결과 조회  */}
              <ReserveResult/>
          </div>
        </div>
        
        {/* 우측 */}
        <div className={cx("right-component")}>
          <div>
            {/* 날짜와 시간 선택 */}
            <ReserveForm/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;