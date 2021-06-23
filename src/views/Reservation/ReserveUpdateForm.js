import {React, useState} from 'react';
import Modal from "react-modal";
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
const customStyles = {
  content: {
      width: '750px',
      height: '430px',
      top: '50%',
      left: '44%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('body');

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
    <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Reserve-Detail Modal2222"
        style={customStyles}
    >
      <h5 className="ml-3 mb-1">예약 상세 내역</h5>

      <div className={cx("reserve-form")}>
          <Form
            name="testForm"
            onSubmit={data => {
              setValues(data)
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
            <Button type="button" className={cx("custom-btn")}
            >영구 삭제</Button>
            <Button type="button" className={cx("custom-btn")}
            >SMS 전송</Button>


            <Button type="button" className={cx("custom-btn")} onClick={props.closeModal}
            >닫기</Button>
          </Form>
      </div>
    </Modal>
  )
};

export default ReserveUpdateForm;