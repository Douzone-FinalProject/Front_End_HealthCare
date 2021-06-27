import React, { useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientSearch from './PatientSearch';
import ReceiptInfo from './ReceiptInfo';
import style from './style.module.css';
import classNames from 'classnames/bind';
import  Button  from "../common/Button";
import CreatePatient from 'views/CreatePatient';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';
import { getReceiptList, getPatientList} from './db';

const cx = classNames.bind(style);
let lastId2 = 1;

const Receipt = (props) => {
  // state 
  const [patient_id, setPatientId] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [receipts, setReceipts] = useState(getReceiptList);
  const [patients, setPatients] = useState(getPatientList);
  
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
    console.log('handleDelete', patient_id);
    // DB에 삭제 시키기 
    const newPatients = Array.from(patients);
    const index = newPatients.findIndex(patient => patient.patient_id === patient_id);
    newPatients.splice(index, 1);
    setPatients(newPatients);
  };
 
  // 예약 페이지로 이동 
  const handleReserve = (event) => {
    props.history.push('/reserve');
  };

  // 접수 
  const addReceipt = (db_patient) => { 
    lastId2++;
    const newReceipts = receipts.concat({
      patient_id: db_patient.patient_id,
      patient_name: db_patient.patient_name,
      patient_sex: db_patient.patient_sex,
      patient_phone: db_patient.patient_phone,
      receipt_id: lastId2,
      receipt_state: '대기',
      receipt_datetime: new Date().toLocaleDateString(),
    });
    setReceipts(newReceipts);
  };

  // 접수 취소 
  const deleteReceipt = (rid) => {
    console.log('접수 삭제');
    const newRecipts = Array.from(receipts);
    const index = newRecipts.findIndex(receipt => receipt.receipt_id === rid);
    newRecipts.splice(index, 1);
    setReceipts(newRecipts);
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
            <PatientSearch handleClick={handleClick} patients={patients}/>
          {/* 진료자 리스트 컴포넌트 */}
            <ReceiptInfo handleClick={handleClick} receipts={receipts} />
        </div>
        {/* 우측 - 환자 상세 정보 컴포넌트 */}
          <div className={cx("right-component")}>
            <PatientInfo handleDelete={handleDelete} patient_id={patient_id} 
                        addReceipt={addReceipt} deleteReceipt={deleteReceipt}/>
          </div>
      </div>
      <DialMenu />
    </div>
  );
};

export default Receipt;