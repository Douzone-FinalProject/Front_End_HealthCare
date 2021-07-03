import React, { useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientSearch from './PatientSearch';
import ReceiptInfo from './ReceiptInfo';
import style from './style.module.css';
import classNames from 'classnames/bind';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';
import { getReceiptList, getPatientList, insertPatient, getPatientListBySearch} from './db';
import moment from 'views/Reservation/ReserveCalendar/src/moment-range';
import { useDispatch, useSelector } from 'react-redux';
import { createSetReceiptListAction } from 'redux/receipt-reducer'

const cx = classNames.bind(style);
let lastId2 = 1;

const Receipt = (props) => {
  // state 
  const [patient_id, setPatientId] = useState();
  const [receipts, setReceipts] = useState(getReceiptList);
  const [patients, setPatients] = useState(getPatientList);
  const receiptList = useSelector((state) => state.receiptReducer.receiptList);
  const dispatch = useDispatch();

  // 진료자 리스트에 존재하고 && 대기상태인지 체크 => 버튼 나오게 하기 
  const isWaitState = () =>{
    for(var i=0; i < receipts.length; i++){
      if(receipts[i].patient_id === patient_id && receipts[i].receipt_state === '대기'){return true;}
    }
    return false;
  }

  // 진료자 리스트 상태값 변경 : 대기 => 진료중 
  const changeReceiptState = (pid) => {
    const newReceipts = Array.from(receipts);
    console.log('index', pid);
    // db update
    const row = newReceipts.find(row => row.patient_id === pid);
    row.receipt_state = '진료중';
    setReceipts(newReceipts);
  };

  // 검색 목록 한 행 클릭 -> 환자 상세 정보 READ
  const handleClick = (patient_id) => {
    console.log('[index] 클릭한 patient_id', patient_id);
    setPatientId(patient_id);
    // case1) 진료리스트 상태가 대기일 경우 => 진료 보내기 버튼 나옴 
    // case2) 진료리스트 상태가 수납전일 경우 => 수납버튼 나옴 
  };

  // 신규 환자 생성 
  const handleAdd = (patient) => {
    // DB에 추가 시키기
    insertPatient(patient);
  };

  // 환자 영구 삭제 
  const handleDelete = (patient_id) => {
    // DB에 삭제 시키기 
    const newPatients = Array.from(patients);
    const index = newPatients.findIndex(patient => patient.patient_id === patient_id);
    newPatients.splice(index, 1);
    setPatients(newPatients);
  };

  // 환자 정보 수정 
  const handleUpdate = (patient) => {
    // DB UPDATE 
    const newPatients = Array.from(patients);

    const row = newPatients.find(row => row.patient_id === patient.patient_id);
    row.patient_name = patient.patient_name;
    row.patient_phone = patient.patient_phone;
    row.patient_ssn = patient.patient_ssn;
    row.patient_sex = patient.patient_sex;
    row.patient_address = patient.patient_address;
    row.patient_detail_address = patient.patient_detail_address;
    row.patient_zipcode = patient.patient_zipcode;
    row.patient_blood_type = patient.patient_blood_type;
    row.patient_guardian_name = patient.patient_guardian_name;
    row.patient_guardian_phone = patient.patient_guardian_phone;
    row.patient_guardian_relationship = patient.patient_guardian_relationship;
    row.patient_height = patient.patient_height;
    row.patient_weight = patient.patient_weight;
    row.patient_max_bp = patient.patient_max_bp;
    row.patient_min_bp = patient.patient_min_bp;
    row.patient_pulse = patient.patient_pulse;
    row.patient_register_date = patient.patient_register_date;
    
    setPatients(newPatients);
  };

  //회원 검색
  const handleSearch = (patient_name) => {
    let newPatients = getPatientListBySearch(patient_name);
    setPatients(newPatients);
  };
  const handleAllSearch = () => {
    let newPatients = getPatientList();
    setPatients(newPatients);
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
      receipt_datetime:  moment(new Date()).format('YYYY MM DD HH:mm:ss'),
    });
    setReceipts(newReceipts);
    dispatch(createSetReceiptListAction(newReceipts));
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
      </div>
      <div className={cx("d-flex flex-row ")}>
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 환자 검색 컴포넌트  */}
            <PatientSearch handleClick={handleClick} patients={patients} handleAdd={handleAdd} handleSearch={handleSearch} handleAllSearch={handleAllSearch}/>
          {/* 진료자 리스트 컴포넌트 */}
            <ReceiptInfo handleClick={handleClick} isWaitState={isWaitState} changeReceiptState={changeReceiptState}
                        receipts={receipts} patient_id={patient_id} />
        </div>
        {/* 우측 - 환자 상세 정보 컴포넌트 */}
          <div className={cx("right-component")}>
            <PatientInfo handleDelete={handleDelete} patient_id={patient_id} 
                        handleUpdate={handleUpdate} receipts={receipts} 
                        addReceipt={addReceipt} deleteReceipt={deleteReceipt}/>
          </div>
      </div>
      <DialMenu />
    </div>
  );
};

export default Receipt;