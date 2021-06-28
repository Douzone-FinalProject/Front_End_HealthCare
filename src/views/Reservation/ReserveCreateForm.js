import {React} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import TextField from '@material-ui/core/TextField';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';

import {
  DateTime, 
  Form,
} from 'react-form-elements';
import Button from 'views/common/Button';

const cx = classNames.bind(style);

const ReserveCreateForm = (props) => {

  return (
    <div className={cx("right-component-top")}>
      <div className={cx("form-subject")}>
        <AddAlarmIcon style={{fontSize: '1.8em'}} className="mr-1"/>
          새로운 예약
      </div>
      <div className={cx("reserve-form")}>
        <Form
          name="createForm"
          onSubmit={(data) => {
            console.log('data: ', data);
            return props.addEvent(data);
          }}
            // 여기서 디비로 insert 되어서 캘린더는 실시간 동기화로 나타나게 됨 
        >
          <div className="d-flex-col">
            <div>
              <TextField required label="이름" className="mr-5" name="reservation_name" /> 
              <TextField required label="휴대전화" name="reservation_phone" /> 

              <CheckCircleOutlineIcon className="mt-3 ml-3" style={{fontSize: '2em'}}
                onClick={() => {
                  console.log('click button - 기존/신규 환자 구분하기');
                }}
              />

              <TextField required label="내원사유" name="reservation_reason" /> 
              <div className="mt-4">
                예약 날짜
                <DateTime
                  className="mb-3"
                  label=""
                  type="datetime-local"
                  name="reservation_datetime"
                /> 
              </div> 
            </div>

            <div className="d-flex justify-content-end">
              <Button type="submit" className={cx("custom-btn-confirm")}>등록</Button>
            </div>
          </div>
          
        </Form>
      </div>
    </div>
  )
};

export default ReserveCreateForm;