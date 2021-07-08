import {React, useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import TextField from '@material-ui/core/TextField';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import moment from './ReserveCalendar/src/moment-range';
import Swal from 'sweetalert2';
import {
  Form,
} from 'react-form-elements';
import Button from 'views/common/Button';

const cx = classNames.bind(style);

const ReserveCreateForm = (props) => {
  // state
  const [startDate, setStartDate] = useState(new Date());
  const [createForm, setCreateForm] = useState({
    reservation_name: '',
    reservation_phone: '',
    reservation_reason: '',
  });
  
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
    });
    setStartDate(new Date());
  };

  return (
    <div className={cx("right-component-top")}>
      <div className={cx("form-subject")}>
        <AddAlarmIcon style={{fontSize: '1.8em'}} className="mr-1"/>
          새로운 예약
      </div>
      <div className={cx("reserve-form")}>
        <Form
          name="createForm" 
          onSubmit={handleSubmit}>
              <TextField required label="이름" className="mr-5" name="reservation_name" value={createForm.reservation_name} onChange={handleChange}/> 
              <TextField required label="휴대전화" name="reservation_phone" value={createForm.reservation_phone} onChange={handleChange}/> 
              <CheckCircleOutlineIcon className="mt-3 ml-3" style={{fontSize: '2em'}}
                onClick={() => {
                  console.log('click button - 기존/신규 환자 구분하기');
                }}
              />
              
              <TextField required label="내원사유" name="reservation_reason" value={createForm.reservation_reason} onChange={handleChange}/> 
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
                <Button type="submit" className={cx("custom-btn-confirm")}>등록</Button>
              </div>
        </Form>
      </div>
    </div>
  )
};

export default ReserveCreateForm;