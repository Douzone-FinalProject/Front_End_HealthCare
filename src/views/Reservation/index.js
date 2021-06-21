import React, { useState } from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import ReserveForm from './ReserveForm';
import CalendarCustomize from './CalendarCustomize';
import ReserveDetail from './ReserveDetail';
import DayzTestComponent from './DaysTestComponent';

const cx = classNames.bind(style);

const Reservation = (props) => {
  // state
  const [modalIsOpen, setIsOpen] = useState(false);

  // 신규 등록 모달 
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }


  return (
    <>
      <div className={cx("d-flex flex-row", "parent-component")}>
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 1. 예약 결과 조회 컴포넌트 */}
          <DayzTestComponent/>
          {/* 2. 모달 창 - 예약 정보 R,U,D  */}
          <ReserveDetail modalIsOpen={modalIsOpen} closeModal={closeModal}/>
        </div>
        
        {/* 우측 */}
        <div className={cx("right-component")}>
          <div>
            {/* 3. 예약 Create */}
            <ReserveForm/>
            {/* 4. 예약 불가능 시간대 달력 커스터마이징 */}
            {/* <CalendarCustomize/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;