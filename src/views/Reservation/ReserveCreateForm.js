import {React, useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import TextField from '@material-ui/core/TextField';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import moment from './ReserveCalendar/src/moment-range';
import Swal from 'sweetalert2';
import {
  Form,
} from 'react-form-elements';
import { checkPatientExist } from 'apis/reservation';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const cx = classNames.bind(style);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ReserveCreateForm = (props) => {
  const classes = useStyles();

  // state
  const [startDate, setStartDate] = useState(new Date());
  const [createForm, setCreateForm] = useState({
    reservation_name: '',
    reservation_phone: '',
    reservation_reason: '',
    patient_id: ''
  });
  const [checkIcon, setCheckIcon] = useState(false); // 기존 환자 체크 여부 , 결과에 상관없이 체크를 햇으면 true로 하기 

  const handleChange = (e) => {
    setCreateForm({
      ...createForm,
      [e.target.name]: e.target.value
    })
  };

  let handleColor = (time) => {
    return time.getHours() > 8 && time.getHours() < 19? "text-success" : "text-error";
  };

  const handleSubmit = (e) => {
    Swal.fire({
      icon: 'success',
      title: createForm.reservation_name + '님 예약이 정상적으로 등록되었습니다.',
      showConfirmButton: false,
      timer: 1500
    })

    props.addEvent({
      ...createForm,
      reservation_datetime: moment(startDate).format('YYYY-MM-DD HH:mm'),
      range: moment.range(moment(startDate), moment(startDate).add(30, 'minutes')),
  
    });
  
    setCreateForm({
      reservation_name: '',
      reservation_phone: '',
      reservation_reason: '',
      patient_id: ''
    });
    setStartDate(new Date());
  };

  /* 기존환자 유무 판단 */
  const handleExistPatient = async () => {
    // 아이디와 번호로  Patient 테이블에서 존재하는지 확인 -> 존재하면 patient_id로 연결 
    const response = await checkPatientExist(createForm.reservation_name, createForm.reservation_phone); 
    setCreateForm({
      ...createForm,
      patient_id: response.data.patient_id
    })
    setCheckIcon(true);
  };


  return (
    <div className={cx("right-component-top")}>
      <div className={cx("form-subject", "d-flex justify-content-between")}>
        <div>
          <AddAlarmIcon style={{fontSize: '1.8em'}} className="mr-1"/>
            새로운 예약
        </div>
      {/* 새로고침 아이콘 여기에 두기, onclick시에 값 초기화  */}
      <AutorenewIcon style={{"fontSize": "1.3em"}} className="mt-2 mr-4"
          onClick={() => {setStartDate(new Date()); setCheckIcon(false);
                          setCreateForm({
                            reservation_name: '',
                            reservation_phone: '',
                            reservation_reason: '',
                            patient_id: ''
                          });}}
        ></AutorenewIcon>
      </div>
      <div className={cx("reserve-form")}>
        <Form
          name="createForm" 
          onSubmit={handleSubmit}>
              {
                checkIcon?
                  (
                    createForm.patient_id !== null? 
                      <div className="">
                        <TextField disabled label="이름" className="mr-5" name="reservation_name" value={createForm.reservation_name}/> 
                        <TextField disabled label="휴대전화" name="reservation_phone" value={createForm.reservation_phone}/> 
                        <CheckBoxIcon className="mt-3 ml-3" style={{fontSize: '2em'}}/>
                        <span style={{fontSize:"15px",color:"blue"}}>기존환자</span> 
                      </div>
                    :
                      <div className="">
                        <TextField disabled label="이름" className="mr-5" name="reservation_name" value={createForm.reservation_name}/> 
                        <TextField disabled label="휴대전화" name="reservation_phone" value={createForm.reservation_phone}/> 
                        <CheckBoxIcon className="mt-3 ml-3" style={{fontSize: '2em'}}/>
                        <span style={{fontSize:"15px",color:"red"}}>신규환자</span> 
                      </div>
                  )
                :
                  <div className="">
                    <TextField required label="이름" className="mr-5" name="reservation_name" value={createForm.reservation_name} onChange={handleChange}/> 
                    <TextField required label="휴대전화" name="reservation_phone" value={createForm.reservation_phone} onChange={handleChange}/> 
                    <CheckBoxOutlineBlankIcon className="mt-3 ml-3" style={{fontSize: '2em'}}
                      onClick={() => {handleExistPatient();}}/>
                      <span style={{fontSize:"15px",color:"gray"}}>신규환자</span>
                  </div>
              }
              <div className="">
                <TextField required label="내원사유" name="reservation_reason" value={createForm.reservation_reason} onChange={handleChange}/> 
              </div>
              <div className="mt-4 mb-3">
                <div style={{color: 'gray'}}>예약 날짜</div>
                <DatePicker style={{color: 'gray'}}
                  dateFormat="yyyy-MM-dd HH:mm"
                  showTimeSelect
                  name="reservation_datetime" 
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  timeClassName={handleColor}
                />
              </div> 
              <div className="d-flex justify-content-end">
                <Button type="submit" 
                 variant="outlined" size="small" color="primary" className={classes.margin}
                >등록</Button>
              </div>
        </Form>
      </div>
    </div>
  )
};

export default ReserveCreateForm;