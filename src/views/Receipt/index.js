import React, { useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientSearch from './PatientSearch';
import ReceiptInfo from './ReceiptInfo';
import style from './style.module.css';
import classNames from 'classnames/bind';
import  Button  from "../common/Button";
import CreatePatient from 'views/CreatePatient';
import { deletePatient } from './db';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';

const cx = classNames.bind(style);

const Receipt = (props) => {
  // state 
  const [patient_id, setPatientId] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
 

  // 신규 등록 모달 
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }

  // 검색 목록 한 행 클릭 -> 환자 상세 정보 READ
  const handleClick = (patient_id) => {
    console.log('[index] 클릭한 patient_id', patient_id);
    setPatientId(patient_id);
  };

  // 환자 영구 삭제 
  const handleDelete = (patient_id) => {
    console.log('[index] handleDelete', patient_id);
    // DB에 삭제 시키기 
    deletePatient(patient_id); // 실제 디비에선 접수 리스트에도 영향을 미침 
   // setPatients();
  };

  const handleReserve = (event) => {
    props.history.push('/reserve');
  };


  return (
    <div className={cx("all-component")}>
      <Header />
      <div className={cx("menu")}>
        <Button className="ml-1" color="rgb(153, 102, 255)" onClick={openModal}>신규 등록</Button>
        <Button className="ml-3" color="rgb(153, 102, 255)" onClick={handleReserve}>예약</Button>
        <CreatePatient modalIsOpen={modalIsOpen} closeModal={closeModal}/>
      </div>
      <div className={cx("d-flex flex-row ")}>
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 환자 검색 컴포넌트  */}
            <PatientSearch handleClick={handleClick}/>
          {/* 진료자 리스트 컴포넌트 */}
            <ReceiptInfo handleClick={handleClick}/>
        </div>
        {/* 우측 - 환자 상세 정보 컴포넌트 */}
          <div className={cx("right-component")}>
            <PatientInfo handleDelete={handleDelete} patient_id={patient_id}/>
          </div>
      </div>
      <DialMenu />
    </div>
  );
};

export default Receipt;