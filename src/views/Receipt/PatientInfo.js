import React, {useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import  Button  from "../common/Button";
import DaumPost from 'views/CreatePatient/DaumPost';
import { getPatient, getRidByPatient} from './db';
import { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const cx = classNames.bind(style);


const PatientInfo = (props) => {
  const classes = useStyles();
  // state 
  const [isModal, setModal] = useState(false);
  const [patient, setPatient] = useState({}); 

  useEffect(() => {
    if(props.patient_id !== undefined){
      const newPatient = getPatient(props.patient_id);
      setPatient(newPatient);
    }
  }, [props.patient_id]);

  // 해당 환자가 접수리스트에 있는지 없는지 조사 
  function isReceipt(){
    // DB 접수 테이블에 patient_id를 가진 환자가 있다면 트루 
    const db = props.receipts;
    for(var j=0; j < db.length; j++){
      if(db[j].patient_id === patient.patient_id){
        return true;
      }
    }
    return false; // 접수리스트에 없음 
  }

  function handleReceipt(e){ // 접수취소 -> 접수 
    e.preventDefault(); 
    // DB insert 
    // props.addReceipt(db_patient);
    props.addReceipt(patient);
  }

  function cancelReceipt(e){ // 접수취소 -> 접수 
    e.preventDefault(); 
    // DB delete 
    // const rid = getRidByPatient(db_patient.patient_id);
    const rid = getRidByPatient(patient.patient_id);
    props.deleteReceipt(rid);
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
    props.handleUpdate(patient); // 부모에게 상태 변경 알리기 
  }; 

  // DB 환자 정보 영구 삭제 
  const handleDelete = (e) => {
    e.preventDefault();
    props.handleDelete(patient.patient_id); // 부모에게 상태 변경 알리기 
  }; 

  const relations = [
    {value: '부', label: '부'},
    {value: '모', label: '모'},
    {value: '자녀', label: '자녀'},
    {value: '배우자',label: '배우자'}, 
    {value: '기타',label: '기타'},
  ];
  const bloodTypes = [
    {value: 'A', label: 'A'},
    {value: 'B', label: 'B'},
    {value: 'O', label: 'O'},
    {value: 'AB', label: 'AB'},

  ];

  return (
    <div className={cx("patient-detail")}>
      <div className={cx("patient-detail-top", "d-flex justify-content-between")}>
          <span><i>{patient.patient_name}</i>&nbsp;&nbsp;님 차트</span>

          {
           props.patient_id !== undefined
           &&
           (isReceipt()?
            <Button type="submit" className={cx("mr-4", "custom-btn")}
                color="#FF6384" onClick={cancelReceipt}>접수 취소</Button>
              :
            <Button type="submit" className={cx("mr-4", "custom-btn")}
                color="#FF6384" onClick={handleReceipt}>접수</Button>
            )
          }
      </div>
      {/* form - 환자 정보 읽기, 수정 또는 삭제 기능 */}
      <div className={cx("patient-detail-bottom")}>
      <form onSubmit={handleUpdate} className={classes.root} noValidate autoComplete="off">
        <div>
          <div>
            <TextField disabled id="standard-required" label="차트번호" defaultValue="" onChange={handleChange}
                    value={props.patient_id ||''}/> 
          </div>
          <TextField required label="이름" defaultValue="" onChange={handleChange}
                  name="patient_name"  value={patient.patient_name ||''}/> 
          <TextField required label="주민번호" defaultValue="" onChange={handleChange}
                  name="patient_ssn"  value={patient.patient_ssn ||''}/>  
          <TextField required label="휴대전화" defaultValue="" onChange={handleChange}
                  name="patient_phone" value={patient.patient_phone ||''}/>      
          <TextField required label="보호자" defaultValue="" onChange={handleChange}
                   name="patient_guardian_name" value={patient.patient_guardian_name ||''}/>   
          <TextField required label="보호자 휴대전화" defaultValue="" onChange={handleChange}
                   name="patient_guardian_phone" value={patient.patient_guardian_phone ||''}/>   
          <TextField select label="보호자 관계" name="patient_guardian_relationship"
            value={patient.patient_guardian_relationship ||'select2'} onChange={handleChange} helperText="선택해주세요">
            {relations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>))}
          </TextField>

          
          <DaumPost isModal={isModal} closeAdModal={closeAdModal} handleComplete={handleComplete}/>
          <TextField required label="주소" defaultValue="" onChange={handleChange}
                    name="patient_address" value={patient.patient_address ||''}/>      
          <TextField required label="상세 주소" defaultValue="" onChange={handleChange}
                    name="patient_detail_address" value={patient.patient_detail_address ||''} />    
          <Button className={cx("custom-btn")} type="button" onClick={openAdModal}>주소찾기</Button>
          

          <div className="mt-4">
            <TextField select label="혈액형"  name="patient_blood_type" value={patient.patient_blood_type ||''}
              onChange={handleChange} helperText="선택해주세요">
              {bloodTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>))}
            </TextField>
            <TextField label="맥박" defaultValue="" onChange={handleChange}
                    name="patient_pulse" value={patient.patient_pulse ||''}/>    
          </div>

          <div className="d-flex">
            <div className="ml-1 d-flex-col">
              <Input
                  name="patient_height" value={patient.patient_height ||''} onChange={handleChange}
                  endAdornment={<InputAdornment position="end">cm</InputAdornment>}/>
              <FormHelperText >신장</FormHelperText>
            </div>
            <div className="ml-5 d-flex-col">
              <Input
                  name="patient_weight" value={patient.patient_weight ||''} onChange={handleChange}
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              />
              <FormHelperText>Weight</FormHelperText>
            </div>
          </div>

          <div className="d-flex">
            <div className="ml-1 d-flex-col">
              <Input
                  name="patient_max_bp" value={patient.patient_max_bp ||''} onChange={handleChange}
                  endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}/>
              <FormHelperText >최고혈압</FormHelperText>
            </div>
            <div className="ml-4 d-flex-col">
              <Input
                  name="patient_min_bp" value={patient.patient_min_bp ||''} onChange={handleChange}
                  endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
              />
              <FormHelperText>최저혈압</FormHelperText>
            </div>
          </div>

          <div className="mt-5">
            <TextField disabled label="최초진료" defaultValue="2021-06-01" value="2021-06-01"/> 
            <TextField disabled label="최근진료" defaultValue="2021-06-03" value="2021-06-03"/> 
          </div>
          <TextField disabled label="다음예약" defaultValue="2021-06-20" value="2021-06-20"/> 

          <div className={cx("form-btn")}>
                <Button type="button" className={cx("form-btn-1", "custom-btn")} onClick={handleDelete}>영구 삭제</Button>
                <Button type="submit" className={cx("form-btn-1", "ml-3", "custom-btn")}>저장</Button>
          </div>
        </div>
      
      </form>
      </div>
    </div>
  );
};

export default PatientInfo;