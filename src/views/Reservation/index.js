import React from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import ReserveSearch from './ReserveSearch';
import ReserveCalendar from './ReserveCalendar';
import ReserveResult from './ReserveResult';

const cx = classNames.bind(style);

const Reservation = (props) => {
  return (
    <>
      <div className="d-flex flex-row">
        {/* 좌측  */}
        <div className={cx("left-component")}>
          <div>
            <ReserveSearch/>
          </div>
          <div>
            <ReserveCalendar/>
          </div>
        </div>
        {/* 우측 - 환자 상세 정보 컴포넌트 */}
        <div className={cx("right-component")}>
          <div>
            <ReserveResult/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;