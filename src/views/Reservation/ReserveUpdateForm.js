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

const ReserveUpdateForm = (props) => {
  // state 
  const [values, setValues] = useState({}); // form data
  const [mode, setMode] = useState('create'); // Create or Update/Delete


  // 데이터 양방향 바인딩 
  // const handleChange = (event) => {
  //   setValues({
  //       ...reserveForm,
  //       [event.target.name]: event.target.value
  //   });
  // };

  return (
    <div className={cx("right-component-top")}>
      <div className={cx("form-subject")}>
        상세 예약
      </div>
      <div className={cx("reserve-form")}>
        <Form
          name="testForm"
          onSubmit={data => {
            // data[form element name]
            setValues(data)
            // do something with values
          }}
        >
          <div>
            <div className="float-right">
                {/* <Button type="button" className={cx("ml-3", "custom-btn")}
                  >방문 확인</Button>
                <span className="ml-2 ">기존/신규</span> */}
            </div>
            <div>
              <span className="">이름</span>
              <TextBox className="mb-2" label="" name="myTextBox" />
              <span>휴대전화</span>
              <Telephone className="mb-2" label="" name="myTelephone" />
            </div>
          </div>

          <span className="">예약 날짜</span>
          <DateTime className="mb-2" label="" name="myDate" />
          <span className="">예약 시간</span>
          <DateTime className="mb-4" label="" type="time" name="myTime" />
          <Button type="submit" className={cx("custom-btn")}
          >예약 저장</Button>
          <Button type="submit" className={cx("custom-btn")}
          >영구 삭제</Button>
          <Button type="submit" className={cx("custom-btn")}
          >SMS 전송</Button>
        </Form>
      </div>
    </div>
  )
};

export default ReserveUpdateForm;