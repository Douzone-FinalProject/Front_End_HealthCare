import {React, useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';

import {
  TextBox,
  Checkbox,
  Range,
  DateTime,
  Telephone,
  DropDown,
  Option,
  OptionGroup,
  Radio,
  Form,
} from 'react-form-elements';

const cx = classNames.bind(style);

const ReserveForm = (props) => {
  // state 
  const [values, setValues] = useState({})

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
        예약 접수
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
                <button onClick={e => {}}>방문 확인</button>
                <span className="ml-2 ">신규</span>
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
          <button onClick={e => {}}>예약 저장</button>
        </Form>
        {/* <div data-testid="ref-out">
          <ul>
            <li>이름: {values.myTextBox}</li>
            <li>휴대전화: {values.myTelephone}</li>
            <li>Date: {values.myDate}</li>
            <li>DateTime: {values.myTime}</li>
          </ul>
        </div> */}
      </div>
    </div>
  )
};

export default ReserveForm;