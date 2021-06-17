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
            {/* 이름과 번호 입력 */}
            <ReserveSearch/>
          </div>
          <div>
            {/* 날짜와 시간 선택 */}
            <ReserveCalendar/>
          </div>
        </div>
        {/* 우측 */}
        <div className={cx("right-component")}>
          <div>
            {/* 예약 결과 조회  */}
            <ReserveResult/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;