import React, {useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import  Button  from "../common/Button";
import { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getPatientById } from 'apis/receipt';
import { getNextReservation } from 'apis/reservation';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const cx = classNames.bind(style);

function BmiDisplay(props){
  return (
    <div className={"bmi-result alert " + props.alertClass}>
      <div>{ props.bmi || '--.-' } { props.label }</div>
    </div>
  )
}

const PatientReadOnly = (props) => {
  const classes = useStyles();
  // state 
  const [patient, setPatient] = useState({}); 
  const [nextReservation, setNextReservation] = useState('');

  // #-------BMI-------#
  const calculateBMI = () => {
    if (patient.patient_weight && patient.patient_height){
      var height = patient.patient_height;
      let weight = patient.patient_weight;
      var bmi = weight / (height * height) * 10000;
      console.log(height + '-' + weight + '-' + bmi);
      return bmi;
    }
  }

  const getBMIResults = (bmi) => {
    let bmiResults = {
      label: '',
      alertClass: '',
    };
    
    if (bmi < 18.5){
      bmiResults.label = '저체중';
      bmiResults.alertClass = 'alert-danger';
    } 
    else if (bmi <= 24.9) {
      bmiResults.label = '정상체중';
      bmiResults.alertClass = 'alert-success';
    }
    else if (bmi <= 29.9){
      bmiResults.label = '경도비만';
      bmiResults.alertClass = 'alert-warning';
    }
    else if (bmi >= 30) {
      bmiResults.label = '중등도비반';
      bmiResults.alertClass = 'alert-danger';
    } else {
      bmiResults.label = 'BMI';
      bmiResults.alertClass = 'alert-primary';
    }

    return bmiResults;
  }

  // BMI 
  let bmi = calculateBMI();
  let results = getBMIResults(bmi);

  // 다음 예약 날짜 
  const handleNextReservation = async () => {
    const response = await getNextReservation(props.patient_id); // 서버 통신
    if(response.data.reservation === null){
      console.log('예약 일정이 없습니다.');
      setNextReservation('');
    }else{
      const datetime = response.data.reservation.reservation_datetime;
      setNextReservation(datetime);
    }
  }

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
      handleNextReservation();
    }
  }, [props.patient_id]);

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

  function cancelReceipt(e){ // 접수 -> 접수취소, <대기 중일때만 접수취소 가능> 
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

  return (
    <div className={cx("patient-detail")}>
      <div className={cx("patient-detail-top", "d-flex justify-content-between")}>
          <span><i>{patient.patient_name}</i>&nbsp;&nbsp;님 차트</span>
          {
           (props.patient_id !== undefined )
           &&
           ( isWaitState() &&
            (<Button type="submit" className={cx("mr-4", "custom-btn")}
                  color="#FF6384" onClick={cancelReceipt}>접수 취소</Button>)
           )
          }
      </div>
      {/* form - 환자 정보 읽기, 수정 또는 삭제 기능 */}
      <div className={cx("patient-detail-bottom")}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <div>
            <TextField disabled id="standard-required" label="차트번호"  
                    value={props.patient_id ||''}/> 
          </div>
          <TextField disabled label="이름" 
                  name="patient_name"  value={patient.patient_name ||''}/> 
          <TextField disabled label="주민번호"  
                  name="patient_ssn"  value={patient.patient_ssn ||''}/>  
          <TextField disabled label="휴대전화" 
                  name="patient_phone" value={patient.patient_phone ||''}/>      
          <TextField disabled label="보호자" 
                   name="patient_guardian_name" value={patient.patient_guardian_name ||''}/>   
          <TextField disabled label="보호자 휴대전화" 
                   name="patient_guardian_phone" value={patient.patient_guardian_phone ||''}/>   
          <TextField disabled label="보호자 관계" name="patient_guardian_relationship"
            value={patient.patient_guardian_relationship ||''}>
          </TextField>


          <TextField disabled label="주소"  
                    name="patient_address" value={patient.patient_address ||''}/>      
          <TextField disabled label="상세 주소" 
                    name="patient_detail_address" value={patient.patient_detail_address ||''} />    
          
          <div className="mt-4">
            <TextField disabled label="혈액형"  name="patient_blood_type" value={patient.patient_blood_type ||''}/>
            <TextField disabled label="맥박" name="patient_pulse" value={patient.patient_pulse ||''}/>    
          </div>
          <div className="m-1" style={{fontSize:"1.2em", color:"red"}}>
              {(patient.patient_pulse === '' || patient.patient_pulse === 0 || patient.patient_pulse === undefined)? ''
                :(patient.patient_pulse < 50 ? '**서맥입니다.'
                 :( patient.patient_pulse < 100 ? <span style={{color:"blue"}}>**정상맥박 입니다</span> :'**빈맥입니다.')
                )}
          </div>
          <div className="d-flex">
            <div className="ml-1 d-flex-col">
              <Input
                  name="patient_height"  value={patient.patient_height ||''} disabled
                  endAdornment={<InputAdornment position="end">cm</InputAdornment>}/>
              <FormHelperText >신장</FormHelperText>
            </div>
            <div className="ml-5 d-flex-col">
              <Input
                  name="patient_weight"  value={patient.patient_weight ||''} disabled
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              />
              <FormHelperText>Weight</FormHelperText>
            </div>
          </div>
          <div className="m-1" style={{fontSize:"1.2em", color:"blue"}}>
            <BmiDisplay bmi={bmi} label={results.label} alertClass={results.alertClass} />
          </div>

          <div className="d-flex">
            <div className="ml-1 d-flex-col">
              <Input
                  name="patient_max_bp" value={patient.patient_max_bp ||''} disabled
                  endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}/>
              <FormHelperText >최고혈압</FormHelperText>
            </div>
            <div className="ml-4 d-flex-col">
              <Input
                  name="patient_min_bp" value={patient.patient_min_bp ||''} disabled
                  endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
              />
              <FormHelperText>최저혈압</FormHelperText>
            </div>
          </div>
          <div className="m-1" style={{fontSize:"1.2em", color:"red"}}>
              {( patient.patient_max_bp !== '' && patient.patient_max_bp !== 0 &&
                  patient.patient_min_bp !== '' && patient.patient_min_bp !== 0) 
                &&
                ((patient.patient_max_bp <= 90 && patient.patient_min_bp < 60) ? '**저혈압 기준수치'
                  :
                  ((patient.patient_max_bp < 120 && patient.patient_min_bp < 80)?<span style={{color:'blue'}}>'**혈압 정상수치'</span>
                      :
                    ((patient.patient_max_bp > 140 && patient.patient_min_bp > 90)?'**고혈압 기준수치'
                        :
                      ((patient.patient_max_bp >= 120 && patient.patient_min_bp >= 80) ? '**고혈압 주의단계'
                          :
                          ((patient.patient_max_bp <= 90 && patient.patient_min_bp < 60) ? '**저혈압 기준수치':'')
                      )
                )))}
          </div>
          {nextReservation !== '' && <TextField disabled style={{color:"blue"}} label="다음예약" value={nextReservation}/> }
        </div>
      </form>
      </div>
    </div>
  );
};

export default PatientReadOnly;