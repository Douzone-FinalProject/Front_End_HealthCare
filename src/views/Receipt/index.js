import React, { useEffect, useState } from 'react';
import PatientInfo from './PatientInfo';
import PatientSearch from './PatientSearch';
import ReceiptInfo from './ReceiptInfo';
import style from './style.module.css';
import classNames from 'classnames/bind';
import Header from 'views/common/Header';
import DialMenu from 'views/common/DialMenu';
import { getPatientListBySearch} from './db';
import { createSetReceiptListAction } from 'redux/receipt-reducer'
import { addNewPatient } from 'apis/message';
import { updateReceipt, getReceiptList, deleteReceiptById, deletePatientById, getPatientList, insertReceipt, updatePatient } from 'apis/receipt';

const cx = classNames.bind(style);

const Receipt = (props) => {
  // state 
  const [patient_id, setPatientId] = useState();
  const [receipts, setReceipts] = useState([]);
  const [patients, setPatients] = useState([]);
  // const receiptList = useSelector((state) => state.receiptReducer.receiptList);
  // const dispatch = useDispatch();

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
  const handleReceipttList = async (e) => {
    try{
      const response = await getReceiptList();
      setReceipts(response.data.receiptList);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("마운트");
    handlePatientList();
    handleReceipttList();
  }, []);

  // 진료자 리스트에 존재하고 && 대기상태인지 체크 => 버튼 나오게 하기 
  const isWaitState = () =>{
    for(var i=0; i < receipts.length; i++){
      if(receipts[i].patient_id === patient_id && receipts[i].receipt_state === '대기'){return true;}
    }
    return false;
  }

  // 진료자 리스트 상태값 변경 : DB 대기 => 진료중 
  const changeReceiptState = async (pid) => {
    try {
      await updateReceipt(pid);
      const response = await getReceiptList();
      setReceipts(response.data.receiptList);

    } catch (error) {
      console.log(error);
    }
  };

  // 검색 목록 한 행 클릭 -> 환자 상세 정보 READ
  const handleClick = (patient_id) => {
    console.log('[index] 클릭한 patient_id', patient_id);
    setPatientId(patient_id);
    // case1) 진료리스트 상태가 대기일 경우 => 진료 보내기 버튼 나옴 
    // case2) 진료리스트 상태가 수납전일 경우 => 수납버튼 나옴 
  };

  // 신규 환자 생성 
  const handleAdd = async (patient) => {
    try {
      await addNewPatient(patient);
    } catch (error) {
      console.log(error);
    }
  };

  
  // 환자 영구 삭제 
  const handleDelete = async (patient_id) => {
    // DB에 삭제 시키기 
    try{
      await deletePatientById(patient_id);
      const response = await getPatientList();
      setPatients(response.data.patientList);
    }catch(error){
      console.log(error);
    }
  };

  // 환자 정보 수정 
  const handleUpdate = async (patient) => {
    // DB UPDATE 
    try{
      await updatePatient(patient);
      const response = await getPatientList();
      setPatients(response.data.patientList);
    }catch(e){
      console.log(e);
    }
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

  // DB 접수 
  const addReceipt = async (db_patient) => { 
    try{
      await insertReceipt(db_patient);
      const response = await getReceiptList();
      setReceipts(response.data.receiptList);
      // dispatch(createSetReceiptListAction(response.data.receiptList));
    }catch(error){
      console.log(error);
    }
  };

  // DB 접수 취소 
  const deleteReceipt = async (rid) => {
    console.log('rid: ', rid);
    try{
      await deleteReceiptById(rid);
      const response = await getReceiptList();
      setReceipts(response.data.receiptList);
      // dispatch(createSetReceiptListAction(response.data.receiptList));
    }catch(error){
      console.log(error);
    }
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