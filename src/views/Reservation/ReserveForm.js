import {React,  useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { DatePicker } from 'antd';
import  Button  from "../common/Button";
// import ReserveCalendar from './ReserveCalendar';
import InputText from 'views/Receipt/InputText';

const cx = classNames.bind(style);

const ReserveForm = (props) => {
  // state 
  const [reserveForm, setReserveForm] = useState({
    name: '',
    phone: '',
    reserve_date: ''
  });

  // 데이터 양방향 바인딩 
  const handleChange = (event) => {
    setReserveForm({
        ...reserveForm,
        [event.target.name]: event.target.value
    });
  };
  

  function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onOk(value) {
    console.log('onOk: ', value);
  }

  return (
    <div className="site-calendar-customize-header-wrapper">
      <form onSubmit={(e) => {
          e.preventDefault();
        }}>

        <div className={cx("d-flex")}>
          <span className={cx("form-span", "bg-primary")}>이름</span>
          <InputText width="7em" type="text" onChange={handleChange} name="name" 
           ></InputText>
        </div>

        <div className={cx("d-flex")}>
          <span className={cx("form-span")}>휴대전화</span>
          <InputText width="7em" type="text" onChange={handleChange} name="phone" 
           ></InputText>
        </div>

        <DatePicker showTime onChange={onChange} onOk={onOk}/>
      
        {/* 예약 버튼 */}
        <Button type="submit" className={cx("form-btn-1", "ml-3", "custom-btn")}>예약</Button>
      </form>
    
  </div>
  )
};

export default ReserveForm;