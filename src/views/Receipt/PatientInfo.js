import React, {useState, useCallback} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import  Button  from "../common/Button";
import InputText from "./InputText";
import DaumPost from 'views/CreatePatient/DaumPost';
import { getPatient, updatePatient} from './db';
// import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const cx = classNames.bind(style);

const PatientInfo = (props) => {
  const [isModal, setModal] = useState(false);
  const [isReceipt, setReceipt] = useState(false);
  // state - 환자 1명의 상세 정보 
  const pid = props.patient_id;
  const db_patient = getPatient(pid);

  // props로 안넘어올때랑 넘어올때 화면 구분하기 
  const [patient, setPatient] = useState({}); 
  
  useEffect(() => {
    setPatient({
      ...db_patient
    })
  }, [db_patient]);

  // 접수 상태 읽기 
  // const receiptState = useSelector((state) => state.receiptReducer.receipt_state);
  // console.log('리덕스 receiptState: ', receiptState);

  // 접수 상태 관리  -------------------------
  // const dispatch = useDispatch();

  function handleReceipt(e){ // 접수취소 -> 접수 
    e.preventDefault(); 
    console.log('handleReceipt ');
    setReceipt(true);
    // dispatch(createSetReceiptAction(state));
    // DB insert 
  }

  function cancelReceipt(e){ // 접수취소 -> 접수 
    e.preventDefault(); 
    console.log('cancelReceipt ');
    setReceipt(false);
    // dispatch(createSetReceiptAction(state));
    // DB delete 
    //deleteReceipt(); // 접수 아이디 넘기기
  }

  // 주소 찾기 모달 
  function openAdModal() { setModal(true);}
  function closeAdModal() { setModal(false);}

  // 데이터 양방향 바인딩 
  const handleChange = (event) => {
    setPatient({
        ...patient,
        [event.target.name]: event.target.value
    });
    console.log(patient);
  };

  // 주소 모달에 전달할 함수 
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setPatient({
        ...patient,
        patient_address: fullAddress
    });
    closeAdModal();
  }

  // DB 환자 정보 수정
  const handleUpdate = (e) => {
    e.preventDefault();
    // console.log("환자 정보 수정: ", ...patient);
    updatePatient(...patient); // DB 접근 
  }; 

  // DB 환자 정보 영구 삭제 
  const handleDelete = (e) => {
    e.preventDefault();
    // console.log("환자 정보 삭제: ", patient.patient_id);
    props.handleDelete(patient.patient_id); // 부모에게 상태 변경 알리기 
  }; 

  return (
    <div className={cx("patient-detail")}>
      <div className={cx("patient-detail-top")}>
        <span><i>{patient.patient_name}</i>&nbsp;&nbsp;님 차트</span>
        {
          isReceipt? 
          <Button type="submit" className={cx("form-btn-1", "ml-5", "custom-btn")}
              onClick={cancelReceipt}>접수 취소</Button>
          :
          <Button type="submit" className={cx("form-btn-1", "ml-3", "custom-btn")}
              onClick={handleReceipt}>접수  </Button>
        }      
      </div>
      {/* form - 환자 정보 읽기, 수정 또는 삭제 기능 */}
      <div className={cx("patient-detail-bottom")}>
          <form onSubmit={handleUpdate}>
              {/* 필수 입력 정보 required */}
              <div className={cx("d-flex")}>
                <div className={cx("form-span")}>차트번호</div>
                <div className={cx("form-span")}>{props.patient_id}</div>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>성명</span>
                <InputText type="text" onChange={handleChange} name="patient_name" 
                     value={patient.patient_name ||''} ></InputText>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>주민번호</span>
                <InputText type="text" onChange={handleChange} name="patient_ssn" value={patient.patient_ssn ||''}></InputText>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>휴대전화</span>
                <input className={cx("form-input")} type="text" onChange={handleChange} name="patient_phone" value={patient.patient_phone ||''}/>
              </div>
              <div className={cx("d-flex", "mb-3")}>
                <span className={cx("form-span")}>보호자</span>
                <InputText className="mr-1" width="5em" type="text" onChange={handleChange}  
                          name="patient_guardian_name" value={patient.patient_guardian_name ||''}></InputText> 
                <InputText className="mr-1" width="10em" type="text" onChange={handleChange} 
                          name="patient_guardian_phone" value={patient.patient_guardian_phone ||''}></InputText> 
                <select name="patient_guardian_relationship" width="4em" value={patient.patient_guardian_relationship ||'select2'} onChange={handleChange}>
                  <option value="select2" disabled>선택</option>
                  <option value="father">부</option>
                  <option value="mother">모</option>
                  <option value="child">자녀</option>
                  <option value="spouse">배우자</option>           
                  <option value="spouse2">기타</option>           
                </select>
              </div>

              <div className={cx("d-flex","p-1 justify-content-end")}>
                <Button className={cx("custom-btn")} type="button" onClick={openAdModal}>주소찾기</Button>
              </div>
              <DaumPost isModal={isModal} closeAdModal={closeAdModal} handleComplete={handleComplete}/>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>주소</span>
                <input className={cx("form-input")} type="text" name="patient_address" value={patient.patient_address ||''} onChange={handleChange} />
              </div>
              <div className={cx("d-flex", "mb-3")}>
                <span className={cx("form-span")}>상세 주소</span>
                <input className={cx("form-input")} type="text" name="patient_detail_address" value={patient.patient_detail_address ||''} onChange={handleChange} />
              </div>

              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>혈액형</span>
                <input className={cx("form-input")} type="text" onChange={handleChange} name="patient_blood_type" value={patient.patient_blood_type ||''}/>
              </div>
              
              {/* 널 허용하는 인풋 */}
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>신장</span>
                <InputText width="7em" type="text" onChange={handleChange} name="patient_height" value={patient.patient_height ||''}></InputText>
                <span className="ml-2 mt-2">cm</span>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>체중</span>
                <InputText width="7em" type="text" onChange={handleChange} name="patient_weight" value={patient.patient_weight ||''}></InputText>
                <span className="ml-2 mt-2">kg</span>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>혈압</span>
                <InputText width="7em" type="text" onChange={handleChange} name="patient_max_bp" value={patient.patient_max_bp ||''}></InputText>
                    <span className="ml-4 mr-4 mt-2">/</span>
                <InputText width="7em" type="text" onChange={handleChange} name="patient_min_bp" value={patient.patient_min_bp ||''}></InputText>
              </div>

              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>맥박</span>
                <InputText width="7em" type="text" onChange={handleChange} name="patient_pulse" value={patient.patient_pulse ||''}></InputText> 
                <span className="ml-2 mt-2">회/분</span>
              </div>


              <div className="mt-5">
                <span className="mr-4">최초진료 2021-06-01</span><span>최근진료 2021-06-03</span>
                {/* <div>다음예약 <span className="bg-primary">2021-06-10 09:00</span></div> */}
              </div>

              <div className={cx("form-record")}>
              </div>

             {/* 버튼 */}
             <div className={cx("form-btn")}>
                <Button type="button" className={cx("form-btn-1", "custom-btn")} onClick={handleDelete}>영구 삭제</Button>
                <Button type="submit" className={cx("form-btn-1", "ml-3", "custom-btn")}>저장</Button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default PatientInfo;