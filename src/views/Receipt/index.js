import React, { useEffect, useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientSearch from './PatientSearch';
import ReceiptInfo from './ReceiptInfo';
import style from './style.module.css';
import classNames from 'classnames/bind';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';
import { addNewPatient, sendRedisMessage } from 'apis/message';
import { getPatientListByName, updateReceipt, getReceiptList, deleteReceiptById, deletePatientById, getPatientList, insertReceipt, updatePatient } from 'apis/receipt';
import PatientReadOnly from './PatientReadOnly';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style);

const Receipt = (props) => {
  // state 
  const [patient_id, setPatientId] = useState();
  const [receipts, setReceipts] = useState([]);
  const [patients, setPatients] = useState([]);
  const [mode, setMode] = useState('update'); // Right Component 
  const globalHospital = useSelector((state) => state.authReducer.hospital_id);
  const pubMessage = {
    topic:'/'+globalHospital+'/#',
    content:'ChangeReceiptState',
  };
  // 모든 환자 리스트 가져오기 
  const handlePatientList = async (e) => {
    try{
      const response = await getPatientList();
      setPatients(response.data.patientList);
    }catch(error){
      console.log(error);
    }
  };

  // 모든 접수 리스트 가져오기 
  const handleReceiptList = async (e) => {
    try{
      const response = await getReceiptList();
      setReceipts(response.data.receiptList);
      console.log(globalHospital);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    handleReceiptList();
  }, []);

  // 진료자 리스트에 존재하고 && 대기상태인지 체크 => 버튼 나오게 하기 
  const isWaitState = () =>{
    for(var i=0; i < receipts.length; i++){
      if(receipts[i].patient_id === patient_id && receipts[i].receipt_state === '대기'){return true;}
    }
    return false;
  }

  // 진료자 리스트에 존재하고 && 수납전 상태인지 체크 => 버튼 나오게 하기 
  const isPayState = () =>{
    for(var i=0; i < receipts.length; i++){
      if(receipts[i].patient_id === patient_id && receipts[i].receipt_state === '수납전'){return true;}
    }
    return false;
  }

  // 대기 -> 진료중 , 수납전 -> 완료 
  // 진료자 리스트 상태값 변경 : DB 대기 => 진료중 
  const changeReceiptState = async (rid, nextState) => {
    try {
      await updateReceipt(rid, nextState); 
      // const response = await getReceiptList();
      // setReceipts(response.data.receiptList);
      await sendRedisMessage(pubMessage);
    } catch (error) {
      console.log(error);
    }
  };

  // 환자 리스트에서 클릭 시 mode == update
  const handleClickPatient = (patient_id) => {
    setPatientId(patient_id);
    setMode('update');
  };

  // 진료자 리스트에서 클릭 시 mode == readonly
  const handleClickReceipt = (patient_id) => {
    console.log('[index] 클릭한 patient_id', patient_id);
    setPatientId(patient_id);
    setMode('readonly');
  };


  // 신규 환자 생성 
  const handleAdd = async (patient) => {
    try {
      await addNewPatient(patient);
      const response = await getPatientList();
      setPatients(response.data.patientList);
    } catch (error) {
      console.log(error);
    }
  };

  // 환자 영구 삭제 
  const handleDelete = async (patient_id) => {
    try{
      await deletePatientById(patient_id);
      const response = await getPatientList();
      setPatients(response.data.patientList);
    }catch(error){
      console.log(error);
    }
  };

  // 환자 info 수정 
  const handleUpdate = async (patient) => {
    try{
      await updatePatient(patient);
      const response = await getPatientList();
      setPatients(response.data.patientList);
    }catch(e){
      console.log(e);
    }
  };

  //회원 검색
  const handleSearch = async (patient_name) => {
    try{
      const response = await getPatientListByName(patient_name);
      setPatients(response.data.patientList);
    }catch(error){
      console.log(error);
    }
  };

  // 검색 초기화 
  const handleAllSearch = async() => {
    try{
      const response = await getPatientListByName('-');
      setPatients(response.data.patientList);
    }catch(error){
      console.log(error);
    }
  };

  // DB 접수 
  const addReceipt = async (db_patient) => { 
    try{
      await insertReceipt(db_patient);
      // const response = await getReceiptList();
      // setReceipts(response.data.receiptList);
      await sendRedisMessage(pubMessage);
    }catch(error){
      console.log(error);
    }
  };

  // DB 접수 취소 
  const deleteReceipt = async (rid) => {
    console.log('rid: ', rid);
    try{
      await deleteReceiptById(rid);
      // const response = await getReceiptList();
      // setReceipts(response.data.receiptList);
      await sendRedisMessage(pubMessage);
    }catch(error){
      console.log(error);
    }
  };

  const realTimeReceiptList = async () => {
    const response = await getReceiptList();
    setReceipts(response.data.receiptList);
  }

  return (
    <div className={cx("all-component")}>
      <Header realTimeReceiptList={realTimeReceiptList}/>
      <div className={cx("menu")}>
      </div>
      <div className={cx("d-flex flex-row ")}>
        {/* 좌측  */}
        <div className={cx("left-component")}>
          {/* 환자 검색 컴포넌트  */}
            <PatientSearch handleClickPatient={handleClickPatient} patients={patients} handleAdd={handleAdd} handleSearch={handleSearch} handleAllSearch={handleAllSearch}/>
          {/* 진료자 리스트 컴포넌트 */}
            <ReceiptInfo handleClickReceipt={handleClickReceipt} isWaitState={isWaitState} isPayState={isPayState}
                  changeReceiptState={changeReceiptState} receipts={receipts} patient_id={patient_id} />
        </div>
        {/* 우측 - 환자 상세 정보 컴포넌트 */}
          <div className={cx("right-component")}>
            {
              mode === 'update'?
                <PatientInfo handleDelete={handleDelete} patient_id={patient_id} 
                          handleUpdate={handleUpdate} receipts={receipts} 
                          addReceipt={addReceipt} deleteReceipt={deleteReceipt}/>
              :
               <PatientReadOnly patient_id={patient_id} receipts={receipts} deleteReceipt={deleteReceipt}/> 
            }
          </div>
      </div>
      <DialMenu />
    </div>
  );
};

export default Receipt;