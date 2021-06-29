import {React, useState, useEffect} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import {getReserveById} from './ReserveCalendar/data';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from './ReserveCalendar/src/moment-range';

import {
  Form,
} from 'react-form-elements';
import Button from 'views/common/Button';

const cx = classNames.bind(style);

const ReserveUpdateForm = (props) => {
  // state
  const [updateForm, setUpdateForm] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = (time) => {
    return time.getHours() > 8 && time.getHours() < 19? "text-success" : "text-error";
  };

  // props 
  const rid = props.reservation_id;
  // console.log('###rid: ', rid);

  useEffect(() => {
    console.log("rid가 마운트 또는 업데이트 후 실행");
    if(rid !== undefined) {
      const reservation = getReserveById(rid);
      // db말고 상태에서 뽑아오기 
      console.log('#reservation: ', reservation);
      setUpdateForm(reservation);
    }
    return (() => {
      console.log("rid가 언마운트/업데이트 전 실행");
    });
  },[rid]);

  const handleChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (e) => {
    // DB 수정  
    updateForm.reservation_datetime = moment(startDate).format('YYYY-MM-DD HH:mm');
    updateForm.range = moment.range(moment(updateForm.reservation_datetime), moment(updateForm.reservation_datetime).add(30, 'minutes')) 
    props.handleUpdate(updateForm);
  };

  return (
    <div className={cx("right-component-top")}>
      <div className={cx("form-subject", "d-flex justify-content-between")}>
        <div>
          <AddAlarmIcon style={{fontSize: '1.8em'}} className="mr-1"/>예약 수정 
        </div>
        <Button className={cx("custom-btn", "mr-3")} color="#FF6384"
            onClick={() => {props.handleMode();}}>새로운 예약</Button>
      </div>
      <div className={cx("reserve-form")}>
          <Form name="updateForm" onSubmit={handleUpdate}>
            <div>
              <TextField required label="이름" className="mr-5" name="reservation_name" 
                      onChange={handleChange} value={updateForm.reservation_name || ''}/> 
              <TextField required label="휴대전화" name="reservation_phone" 
                      onChange={handleChange} value={updateForm.reservation_phone || ''}/> 

              <TextField required label="내원사유"  onChange={handleChange}
                    name="reservation_reason" value={updateForm.reservation_reason || ''}/> 
              <div className="mt-4 mb-3">
                
                <div className="mr-3 font-weight-bold">{updateForm.reservation_datetime || ''}</div>
                <div style={{color: 'gray'}}>예약 날짜</div>
                <DatePicker style={{color: 'gray'}}
                  dateFormat="yyyy-MM-dd HH:mm"
                  showTimeSelect
                  name="reservation_datetime"
                  selected={startDate}
                  onChange={(date) => {
                    console.log('date: ', date);
                    setStartDate(date);
                  }}
                  timeClassName={handleColor}
                />
               </div> 
            </div>
                <Button type="button" className={cx("custom-btn", "mr-3")}>SMS 발송</Button>
                <Button type="button" className={cx("custom-btn-confirm", "mr-3")}
                    onClick={() => {
                      const rid = updateForm.reservation_id;
                      props.handleDelete(rid);
                    }}
                >삭제</Button> 
                <Button type="submit" className={cx("custom-btn-confirm")}>수정</Button>            
          </Form>
        </div>
    </div>
  )
};

export default ReserveUpdateForm;