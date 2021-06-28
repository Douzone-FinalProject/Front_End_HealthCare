import {React, useState, useEffect} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import {deleteReserve, getReserveById} from './ReserveCalendar/data';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import TextField from '@material-ui/core/TextField';

import {
  DateTime,
  Form,
} from 'react-form-elements';
import Button from 'views/common/Button';

const cx = classNames.bind(style);

const ReserveUpdateForm = (props) => {
  // state
  const [updateForm, setUpdateForm] = useState({});

  // props 
  const rid = props.reservation_id;

  useEffect(() => {
    console.log("rid가 마운트 또는 업데이트 후 실행");
    if(rid !== undefined) {
      const reservation = getReserveById(rid);
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

  return (
    <div className={cx("right-component-top")}>
      <div className={cx("form-subject", "d-flex justify-content-between")}>
        <div>
          <AddAlarmIcon style={{fontSize: '1.8em'}} className="mr-1"/>예약 수정 
        </div>
        <Button className={cx("custom-btn-confirm", "mr-4")} color="#FF6384"
            onClick={() => {
              console.log('sdf');
            }}>추가 </Button>
      </div>
      <div className={cx("reserve-form")}>
          <Form
            name="updateForm"
            onSubmit={
              (data) => {
                setUpdateForm(data); 
                props.handleUpdate({
                  ...updateForm,
                  ...data
                }); // 부모 상태에 영향을 미칠 함수 
              }
            }
          >
            <div className="d-flex-col">
            <div>
              <TextField required label="이름" className="mr-5" name="reservation_name" 
                      onChange={handleChange} value={updateForm.reservation_name}/> 
              <TextField required label="휴대전화" name="reservation_phone" 
                      onChange={handleChange} value={updateForm.reservation_phone}/> 

              <TextField required label="내원사유" name="reservation_reason" value={updateForm.reservation_reason}/> 
              <div className="mt-4">
                예약 날짜 
                <div className="mr-3 font-weight-bold">{updateForm.reservation_datetime}</div>

                <DateTime
                    className="mb-3"
                    label=""
                    onChange={handleChange}
                    type="datetime-local"
                    name="reservation_datetime"
                    value={updateForm.reservation_datetime}
                />
              </div> 
            </div>

            <div className="d-flex justify-content-end">
              <Button type="submit" className={cx("custom-btn", "mr-3")}>SMS 발송</Button>

              <Button type="button" className={cx("custom-btn-confirm", "mr-3")}
                  onClick={() => {
                    deleteReserve(updateForm.reservation_id);
                  }}
              >삭제</Button>

              <Button type="submit" className={cx("custom-btn-confirm")}>수정</Button>
            </div>
          </div>
          </Form>
        </div>
    </div>
  )
};

export default ReserveUpdateForm;