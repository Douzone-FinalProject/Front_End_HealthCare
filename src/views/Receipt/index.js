import React, { useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientSearch from './PatientSearch';
import ReceiptInfo from './ReceiptInfo';
import style from './style.module.css';
import classNames from 'classnames/bind';
import  Button  from "../common/Button";
import CreatePatient from 'views/CreatePatient';
import { getPatient } from './db';

const cx = classNames.bind(style);

const Receipt = (props) => {
  // state 
  const [patient_id, setPatientId] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  // 신규 등록 모달 
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }

  // 검색 목록 한 행 클릭 -> 환자 상세 정보 READ
  const handleClick = (patient_id) => {
    console.log('[index] 클릭한 patient_id', patient_id);
    setPatientId(patient_id);

    // const patient = getPatient(patient_id);
    // console.log('선택한 환자 잘 가져오는지 확인 : ' , patient);
  };


  return (
    <>
      <div className={cx("menu")}>
        <Button className="ml-1" color="#4dabf7" onClick={openModal}>신규 등록</Button>
        <Button className="ml-3" color="#15aabf">예약</Button>
        <CreatePatient modalIsOpen={modalIsOpen} closeModal={closeModal}/>
      </div>
      <div className="d-flex flex-row">
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 환자 검색 컴포넌트  */}
            <PatientSearch handleClick={handleClick}/>
          {/* 진료자 리스트 컴포넌트 */}
            <ReceiptInfo/>
        </div>
        {/* 우측 - 환자 상세 정보 컴포넌트 */}
        <div className={cx("right-component")}>
            <PatientInfo patient_id={patient_id}/>
        </div>
      </div>
    </>
  );
};

export default Receipt;