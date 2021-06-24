import {React, useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';

import {
  TextBox,
  DateTime,
  Telephone,  
  Form,
} from 'react-form-elements';
import Button from 'views/common/Button';

const cx = classNames.bind(style);

const ReserveCreateForm = (props) => {

  return (
    <div className={cx("right-component-top")}>
      <div className={cx("form-subject")}>
        예약 접수
      </div>
      <div className={cx("reserve-form")}>
        <Form
          name="createForm"
          onSubmit={(data) => props.addEvent(data)}
            // 여기서 디비로 insert 되어서 캘린더는 실시간 동기화로 나타나게 됨 
        >
          <div className="float-right">
            {/* <Button type="button" className={cx("ml-3", "custom-btn")}
                  >방문 확인</Button>
                <span className="ml-2 ">기존/신규</span> */}
          </div>

          <span className="">이름</span>
          <TextBox className="mb-2" label="" name="reservation_name" />
          <span>휴대전화</span>
          <Telephone className="mb-2" label="" name="reservation_phone" />
          
          <span>예약 날짜</span>
          <DateTime
            className="mb-3"
            label=""
            type="datetime-local"
            name="reservation_datetime"
          />
 
          {/* <span className="">예약 날짜</span>
          <DateTime className="mb-2" label="" name="reservation_date" />
          <span className="">예약 시간</span>
          <DateTime className="mb-4" label="" type="time" name="reservation_time" /> */}
          <Button type="submit" className={cx("custom-btn")}
          >예약 저장</Button>
        </Form>
      </div>
    </div>
  )
};

export default ReserveCreateForm;