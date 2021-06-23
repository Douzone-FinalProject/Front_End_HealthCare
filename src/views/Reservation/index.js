import React, { useState } from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import ReserveCreateForm from './ReserveCreateForm';
import ReserveCalendar from './ReserveCalendar';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';

const cx = classNames.bind(style);

const Reservation = (props) => {
  // state

  return (
    <>
      <Header />
      <div className={cx("d-flex flex-row", "parent-component")}>
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 1. 예약 결과 조회 컴포넌트 */}
          <ReserveCalendar/>
        </div>
        
        {/* 우측 */}
        <div className={cx("right-component")}>
          <div>
            {/* 2. 예약 Create 컴포넌트 */}
            <ReserveCreateForm/>

            {/* 3. 예약 불가능 시간대 달력 커스터마이징 */}
            {/* <CalendarCustomize/> */}
          </div>
        </div>
      </div>
      <DialMenu />
    </>
  );
};

export default Reservation;