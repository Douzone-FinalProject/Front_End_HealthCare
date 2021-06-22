import React, { useState } from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import ReserveCreateForm from './ReserveCreateForm';
import ReserveUpdateForm from './ReserveUpdateForm';
import ReserveDetail from './ReserveDetail';
import DayzTestComponent from './DaysTestComponent';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';

const cx = classNames.bind(style);

const Reservation = (props) => {
  // state
  const [modalIsOpen, setIsOpen] = useState(false);

  // 신규 등록 모달 
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }


  return (
    <>
      <Header />
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
            {/* 3. 예약 Create 컴포넌트 
                       Update 컴포넌트가 모드에 따라서 다른 것이 나옴 */}
            <ReserveCreateForm/>
            <ReserveUpdateForm/>
            {/* 4. 예약 불가능 시간대 달력 커스터마이징 */}
            {/* <CalendarCustomize/> */}
          </div>
        </div>
      </div>
      <DialMenu />
    </>
  );
};

export default Reservation;