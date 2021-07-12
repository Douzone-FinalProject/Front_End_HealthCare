import React, {useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import  Button  from "../common/Button";
import DaumPost from 'views/CreatePatient/DaumPost';
import { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Swal from 'sweetalert2';
import { getPatientById } from 'apis/receipt';

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

  // 한 명의 환자 정보 가져오기 
  const handlePatient = async (patient_id) => {
    try{
      const response = await getPatientById(patient_id);
      setPatient(response.data.patient);
    }catch(error){
      console.log(error);
    }
  };   
    
  useEffect(() => {
    if(props.patient_id !== undefined){
      const newPatient = handlePatient(props.patient_id);
      setPatient(newPatient);
    }
  }, [props.patient_id]);

  // 해당 환자가 접수리스트에 있는지 없는지 조사 -> 단순히 디비 테이블에 있냐없냐 하면 안됨 
  function isReceipt(){
    const db = props.receipts;
    for(var j=0; j < db.length; j++){
      if(db[j].patient_id === patient.patient_id){
        return true;
      }
    }
    return false; // 접수리스트에 없음 
  }

  function isWaitState(){
    const db = props.receipts;
    for(var j=0; j < db.length; j++){
      if(db[j].patient_id === patient.patient_id){
        if(db[j].receipt_state === '대기'){
          return true;
        }
      }
    }
    return false;
  }


  function handleReceipt(e){ // 접수취소 -> 접수 
    e.preventDefault(); 
    props.addReceipt(patient);
  }

  function cancelReceipt(e){ // 접수취소 -> 접수 
    e.preventDefault(); 
    let rid = undefined;
    for(var receipt of props.receipts){
      if(receipt.patient_id === patient.patient_id){
        rid = receipt.receipt_id;
        break;
      }
    } 
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
        patient_address: fullAddress,
        patient_zipcode: data.zonecode
    });
    closeAdModal();
  }

  // DB 환자 정보 수정
  const handleUpdate = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: patient.patient_name + '님 정보가 수정되었습니다.',
      showConfirmButton: false,
      timer: 1500
    })
    props.handleUpdate(patient);
  }; 


  // DB 환자 정보 영구 삭제 
  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        props.handleDelete(patient.patient_id); 
        setPatient({});
      }
    })
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
    {value: 'AB', label: 'AB'},
    {value: 'O', label: 'O'},
    {value: 'Rh-A', label:'Rh-A'},
    {value: 'Rh-B', label:'Rh-B'},
    {value: 'Rh-AB', label:'Rh-AB'},
    {value: 'Rh-O', label:'Rh-O'},
  ];

  return (
    <div className={cx("patient-detail")}>
      <div className={cx("patient-detail-top", "d-flex justify-content-between")}>
          <span><i>{patient.patient_name}</i>&nbsp;&nbsp;님 차트</span>

          {
           props.patient_id !== undefined
           &&
           (isReceipt()?
              ( // 대기 상태이어야함 - patient.patient_id 인 환자가 대기 상태여야 함 
                isWaitState() &&
                (<Button type="submit" className={cx("mr-4", "custom-btn")}
                      color="#FF6384" onClick={cancelReceipt}>접수 취소</Button>)
              )
              :
            <Button type="submit" className={cx("mr-4", "custom-btn")}
                color="#FF6384" onClick={handleReceipt}>접수</Button>
            )
          }
      </div>
      {/* form - 환자 정보 읽기, 수정 또는 삭제 기능 */}
      <div className={cx("patient-detail-bottom")}>
      <form onSubmit={handleUpdate} className={classes.root} autoComplete="off">
        <div>
          <div>
            <TextField disabled id="standard-required" label="차트번호"  onChange={handleChange}
                    value={props.patient_id ||''}/> 
          </div>
          <TextField required label="이름" onChange={handleChange}
                  name="patient_name"  value={patient.patient_name ||''}/> 
          <TextField required label="주민번호"  onChange={handleChange}
                  name="patient_ssn"  value={patient.patient_ssn ||''}/>  
          <TextField required label="휴대전화" onChange={handleChange}
                  name="patient_phone" value={patient.patient_phone ||''}/>      
          <TextField label="보호자" onChange={handleChange}
                   name="patient_guardian_name" value={patient.patient_guardian_name ||''}/>   
          <TextField label="보호자 휴대전화" onChange={handleChange}
                   name="patient_guardian_phone" value={patient.patient_guardian_phone ||''}/>   
          <TextField select label="보호자 관계" name="patient_guardian_relationship"
            value={patient.patient_guardian_relationship ||''} onChange={handleChange} helperText="선택해주세요">
            {relations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>))}
          </TextField>

          
          <DaumPost isModal={isModal} closeAdModal={closeAdModal} handleComplete={handleComplete}/>
          <TextField required label="주소"  onChange={handleChange}
                    name="patient_address" value={patient.patient_address ||''}/>      
          <TextField required label="상세 주소" onChange={handleChange}
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
            <TextField label="맥박" onChange={handleChange}
                    name="patient_pulse" value={patient.patient_pulse ||''}/>    
          </div>

          <div className="d-flex">
            <div className="ml-1 d-flex-col">
              <Input
                  name="patient_height"  value={patient.patient_height ||''} onChange={handleChange}
                  endAdornment={<InputAdornment position="end">cm</InputAdornment>}/>
              <FormHelperText >신장</FormHelperText>
            </div>
            <div className="ml-5 d-flex-col">
              <Input
                  name="patient_weight"  value={patient.patient_weight ||''} onChange={handleChange}
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
            <TextField disabled label="최초진료" value={patient.firstReceiptDate ||'진료 기록 없음'}/> 
            <TextField disabled label="최근진료" value={patient.lastReceiptDate ||'진료 기록 없음'}/> 
          </div>
          <TextField disabled label="다음예약" value="2021-06-20"/> 

          {/* 진료자 리스트에 있는 환자는 버튼 안보이게 또는 비활성화  */}
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