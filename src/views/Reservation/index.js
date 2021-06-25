import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import ReserveCreateForm from './ReserveCreateForm';
import ReserveCalendar from './ReserveCalendar';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';
import moment from './ReserveCalendar/src/moment-range';
import { getReserveList, insertReserve } from './ReserveCalendar/data';

const cx = classNames.bind(style);
let lastBno = 9;

const Reservation = (props) => {
  // state
  const [events, setEvents] = useState(getReserveList);
  console.log('index - events 상태값 출력 ', events);

  const addEvent = (ev) => {
    console.log('[index] addEvent 입력한 예약내역', ev);

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

  useEffect(() => {
    console.log('events 상태가 마운트 또는 업데이트 후 실행 ');
    return (() => {
      console.log("events 상태가 언마운트 업데이트 전 실행");
    });
  }, [events]);

  return (
    <>
      <Header />
      <div className={cx("d-flex flex-row", "parent-component")}>
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 1. 예약 결과 조회 컴포넌트 */}
          <ReserveCalendar events={events} updateEvent={updateEvent}/>
        </div>
        
        {/* 우측 */}
        <div className={cx("right-component")}>
          <div>
            {/* 2. 예약 Create 컴포넌트 */}
            <ReserveCreateForm addEvent={addEvent}/>

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