import React, { useState } from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import ReserveCreateForm from './ReserveCreateForm';
import ReserveCalendar from './ReserveCalendar';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';
import moment from './ReserveCalendar/src/moment-range';
import { getReserveList } from './ReserveCalendar/data';
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
    console.log(ev.reservation_datetime);
    const newEvent = {
      content: ev.reservation_datetime.slice(-5) +' '+ev.reservation_name +' '+ ev.reservation_reason,
      reservation_id: lastBno,
      reservation_name: ev.reservation_name,
      reservation_phone: ev.reservation_phone,
      reservation_datetime: ev.reservation_datetime,
      reservation_reason: ev.reservation_reason,
      resizable: true,
      range: moment.range(moment(ev.reservation_datetime), moment(ev.reservation_datetime).add(30, 'minutes')) 
    };

    // DB 작업 
    const newEvents = events.concat(newEvent);
    setEvents(newEvents);
  };


   /* 자식인 모달창으로 보낼 함수 , 모달창에서 수정이 일어나면 여기서 리스트 상태를 바꿔주기 */
   const handleClick = (ev) => {
    setReservationId(ev);
    console.log('ev: ', ev);
    setMode('update');
  };

  const handleUpdate = (updateForm) => {
    const newEvents = Array.from(events);
    const row = events.find(row => {return row.reservation_id === updateForm.reservation_id;});
    row.reservation_name = updateForm.reservation_name;
    row.reservation_phone = updateForm.reservation_phone;
    row.reservation_reason = updateForm.reservation_reason;
    row.reservation_datetime = updateForm.reservation_datetime;
    row.reservation_reason = updateForm.reservation_reason;
    row.content = updateForm.reservation_datetime.slice(-5) + ' ' + updateForm.reservation_name + ' ' + updateForm.reservation_reason;
    setEvents(newEvents);
  };

  const handleDelete = (rid) => {
    const newEvents = Array.from(events);
    const index = newEvents.findIndex(reserve => reserve.reservation_id === rid);
    newEvents.splice(index, 1);
    setEvents(newEvents);
  }

  /* 자식으로 mode 바꾸는 함수 보내기  */
  const handleMode = () => {
    setMode('create');
  };

  return (
    <>
      <Header />
      <div className={cx("d-flex flex-row", "parent-component")}>
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 1. 예약 결과 조회 컴포넌트 */}
          <ReserveCalendar events={events} handleClick={handleClick}/>
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
                handleDelete={handleDelete}
                handleMode={handleMode}
              />
            }
           
            {/* 3. 시간대별 예약 상세 리스트 */}
            <ReserveSMS reservation_id={reservation_id}/>
          </div>
        </div>
      </div>
      <DialMenu />
    </>
  );
};

export default Reservation;