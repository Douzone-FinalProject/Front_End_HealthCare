import {React, useState, useEffect} from 'react';
import Modal from "react-modal";
import classNames from 'classnames/bind';
import style from './style.module.css';
import {getReserveById} from './ReserveCalendar/data';

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
  const [updateForm, setUpdateForm] = useState({});

  // props 
  const rid = props.reservation_id;

  useEffect(() => {
    console.log("rid가 마운트 또는 업데이트 후 실행");
    if(rid !== undefined) {
      const reservation = getReserveById(rid);
      // console.log(reservation);
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
    <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Reserve-Detail Modal2222"
        style={customStyles}
    >
      <div className="d-flex justify-content-between">
        <h5 className="ml-3 mb-1 ">예약 상세 내역</h5>
          <Button type="button" className={cx("close-btn", "mr-4")} onClick={props.closeModal}
          >X</Button>
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
                props.closeModal();
              }
            }
          >
            <div className="float-right">
            {/* <Button type="button" className={cx("ml-3", "custom-btn")}
                  >방문 확인</Button>
                <span className="ml-2 ">기존/신규</span> */}
            </div>
            
            <span className="">이름</span>
            <TextBox className="mb-2" label="" onChange={handleChange} name="reservation_name" value={updateForm.reservation_name}/>
            <span>휴대전화</span>
            <Telephone className="mb-2" label="" onChange={handleChange} name="reservation_phone" value={updateForm.reservation_phone}/>
          
            <span>예약 날짜</span>
            <DateTime
                className="mb-3"
                label=""
                onChange={handleChange}
                type="datetime-local"
                name="reservation_datetime"
                value={updateForm.reservation_datetime}
            />

            <div className="mr-3 font-weight-bold">{updateForm.reservation_datetime}</div>
           
            <Button type="button" className={cx("custom-btn")}
            >영구 삭제</Button>
            <Button type="button" className={cx("custom-btn")}
            >SMS 전송</Button>
            <Button type="submit" className={cx("custom-btn")}
            >예약 저장</Button>
          </Form>
      </div>
    </Modal>
  )
};

export default ReserveUpdateForm;