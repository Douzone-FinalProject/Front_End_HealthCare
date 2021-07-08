import {React} from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import {
  Form,
} from 'react-form-elements';
import Button from 'views/common/Button';
import { TextareaAutosize } from '@material-ui/core';

const cx = classNames.bind(style);

const ReserveSMS = (props) => {
  
  return (
    <div className={cx("right-component-bottom")}>
       <div className={cx("form-subject", "d-flex justify-content-between")}>
        <div>
          <MailOutlineIcon style={{fontSize: '1.8em'}} className="mr-1"/>
          문자 발송 
        </div>
      </div>
      <div className={cx("reserve-form")}>
        {/* form data : 이름 , 핸드폰번호, 보낼내용 */}
        <Form id="smsForm" name="smsForm"
          onSubmit={(data) => {
            alert('data: ', data);
          }}
        >
          <div className="d-flex-col">
            <div>
              <TextField required label="이름" className="mr-5" name="reservation_name" /> <br/>
              <TextField required label="휴대전화" name="reservation_phone" /> <br/>
              <div className="mt-4">
                {/* <div style={{color: 'gray'}}>예약 날짜 : {updateForm.reservation_datetime || ''}</div> */}
                {/* <div className="mr-3 font-weight-bold">{updateForm.reservation_datetime || ''}</div> */}
              </div> 
              <TextareaAutosize className="mt-3" required name="message" rowsMin={5} placeholder="보낼 내용 입력" />
            </div>
            
            {/* <div className="d-flex justify-content-end">
              <Button type="submit" className={cx("custom-btn-confirm")}>전송</Button>
            </div> */}
          </div>
        </Form>
        <Button type="submit" form="smsForm" className={cx("custom-btn-confirm", "mr-3")}
          onClick={(data) => {
            alert('data123: ', data);
          }
        }
          >전송</Button>
      </div>
    </div>
  );
};

export default ReserveSMS;