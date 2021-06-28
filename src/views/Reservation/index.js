import React, { useState } from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import ReserveCreateForm from './ReserveCreateForm';
import ReserveCalendar from './ReserveCalendar';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';
import moment from './ReserveCalendar/src/moment-range';
import { getReserveList, insertReserve } from './ReserveCalendar/data';
import ReserveSMS from './ReserveSMS';
import ReserveUpdateForm from './ReserveUpdateForm';

const cx = classNames.bind(style);
let lastBno = 10;

const Reservation = (props) => {
  // state
  const [events, setEvents] = useState(getReserveList);
  const [mode, setMode] = useState('create');
  const [reservation_id, setReservationId] = useState(undefined);

  // 이벤트 등록 
  const addEvent = (ev) => {
    lastBno++;
    const newEvent = {
      content: ev.reservation_datetime.slice(-5) +' '+ev.reservation_name,
      reservation_id: lastBno,
      reservation_name: ev.reservation_name,
      reservation_phone: ev.reservation_phone,
      reservation_datetime: ev.reservation_datetime,
      resizable: true,
      range: moment.range(moment(ev.reservation_datetime), moment(ev.reservation_datetime).add(30, 'minutes')) 
    };

    // DB 작업 
    insertReserve(newEvent);
    const newEvents = events.concat(newEvent);
    setEvents(newEvents);
  };

  // 이벤트 수정 
  const updateEvent = (ev) => {
    console.log('[index] updateEvent 입력한 예약내역', ev);
    // ---- 여기서 최종적으로 db로 update 시켜줘야 함  ----
   
    const row = events.find(row => {
      return row.reservation_id === ev.reservation_id;
    });
    console.log('업데이트한 row', row);

    const index = events.findIndex(row => row.reservation_id === ev.reservation_id);
    const newEvents =events.splice(index, 1);
    setEvents(newEvents);
  }

   /* 자식인 모달창으로 보낼 함수 , 모달창에서 수정이 일어나면 여기서 리스트 상태를 바꿔주기 */
   const handleUpdate = (ev, event) => {
    // 부모로 또 전하기 
    updateEvent(ev);
  }

  /* 자식으로 mode 바꾸는 함수 보내기  */
  const handleMode = (ev) => {
    console.log('handleMode: ', ev);
    setMode('update');
  };

  return (
    <>
      <Header />
      <div className={cx("d-flex flex-row", "parent-component")}>
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 1. 예약 결과 조회 컴포넌트 */}
          <ReserveCalendar events={events} 
                  updateEvent={updateEvent} handleMode={handleMode}/>
        </div>
        
        {/* 우측 */}
        <div className={cx("right-component")}>
          <div>
            {/* 2. 예약 Create 컴포넌트 */}
            {
              mode==='create'?
              <ReserveCreateForm addEvent={addEvent}/>
              :
              <ReserveUpdateForm 
                reservation_id={reservation_id}
                handleUpdate={handleUpdate}
    
              />
            }
           
            {/* 3. 시간대별 예약 상세 리스트 */}
            <ReserveSMS />
          </div>
        </div>
      </div>
      <DialMenu />
    </>
  );
};

export default Reservation;