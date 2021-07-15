import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import ReserveCreateForm from './ReserveCreateForm';
import ReserveCalendar from './ReserveCalendar';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';
import moment from './ReserveCalendar/src/moment-range';
import { deleteReservationById, getReservations, insertReservation, updateReservation } from 'apis/reservation';
import ReserveSMS from './ReserveSMS';
import ReserveUpdateForm from './ReserveUpdateForm';

const cx = classNames.bind(style);

const Reservation = (props) => {
  // state
  const [events, setEvents] = useState([]);
  const [mode, setMode] = useState('create');
  const [reservation_id, setReservationId] = useState(undefined);
  const [updateForm, setUpdateForm] = useState(); // 예약 수정 컴포넌트 -> 문자 발송 컴포넌트 전달 정보 

  let reserveList = [];
  const handleReservationList = async (e) => {
    try{
      const response = await getReservations();
      const dbList = response.data.reservations;
      for(var reserve of dbList){
        reserveList.push({...reserve, resizable: true, 
        content: reserve.reservation_name + ' ' + reserve.reservation_phone.substring(7, 11),
        range: moment.range(moment(reserve.reservation_datetime), 
              moment(reserve.reservation_datetime).add(30, 'minutes'))})
      }
      setEvents(reserveList);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    handleReservationList();
  }, []);

  // DB Insert
  const addEvent = async (ev) => {
    try {
      await insertReservation(ev);
      const response = await getReservations();
      const dbList = response.data.reservations;
      for(var reserve of dbList){
        reserveList.push({...reserve, resizable: true, 
        content: reserve.reservation_name + ' ' + reserve.reservation_phone.substring(7, 11),
        range: moment.range(moment(reserve.reservation_datetime), 
              moment(reserve.reservation_datetime).add(30, 'minutes'))})
      }
      setEvents(reserveList);
    } catch (error) {
      console.log(error);
    }
  };

   /* 자식인 모달창으로 보낼 함수 , 모달창에서 수정이 일어나면 여기서 리스트 상태를 바꿔주기 */
   const handleClick = (rid) => {
    setReservationId(rid);
    setMode('update');
  };

  // DB Update
  const handleUpdate = async (updateForm) => {
    try{
      await updateReservation(updateForm);
      const response = await getReservations();
      const dbList = response.data.reservations;
      for(var reserve of dbList){
        reserveList.push({...reserve, resizable: true, 
        content: reserve.reservation_name + ' ' + reserve.reservation_phone.substring(7, 11),
        range: moment.range(moment(reserve.reservation_datetime), 
              moment(reserve.reservation_datetime).add(30, 'minutes'))})
      }
      setEvents(reserveList);
    }catch(e){
      console.log(e);
    }
    
  };

  // DB Delete
  const handleDelete = async (rid) => {
    await deleteReservationById(rid);
    const response = await getReservations();
    const dbList = response.data.reservations;
    for(var reserve of dbList){
      reserveList.push({...reserve, resizable: true, 
      content: reserve.reservation_name + ' ' + reserve.reservation_phone.substring(7, 11),
      range: moment.range(moment(reserve.reservation_datetime), 
            moment(reserve.reservation_datetime).add(30, 'minutes'))})
    }
    setEvents(reserveList);
  }

  /* 자식으로 mode 바꾸는 함수 보내기  */
  const handleMode = () => {
    setMode('create');
  };

  /* 예약 수정 컴포넌트 -> 문자 발송 컴포넌트로 예약 정보 넘겨주기 */
  const handleSMS = (updateForm) => {
    console.log('updateFOrm: ', updateForm);
    setUpdateForm(updateForm);
  }

  const realTimeReceiptList = async () => {
    console.log("realTimeReceiptList");
  }

  return (
    <>
      <Header realTimeReceiptList={realTimeReceiptList} />
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
                handleSMS={handleSMS}
              />
            }
           
            {/* 3. 시간대별 예약 상세 리스트 */}
            <ReserveSMS updateForm={updateForm}/>
          </div>
        </div>
      </div>
      <DialMenu />
    </>
  );
};

export default Reservation;