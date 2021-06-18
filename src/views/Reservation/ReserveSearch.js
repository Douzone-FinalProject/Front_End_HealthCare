import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { DatePicker } from 'antd';

const cx = classNames.bind(style);

const ReserveSearch = (props) => {

  function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onOk(value) {
    console.log('onOk: ', value);
  }

  
  return (
    <>
      <div className={cx("left-component-top")}>
        {/* 이름과 번호를 입력 -> 신규환자인지 기존환자인지 판단
            form 으로 ?? 해야하나 ??  */}
    
        이름 번호 입력 컴포넌트 
        <form>
          <div className={cx("d-flex")}>
            <span className={cx("form-span")}>가족관계</span>
            <input className={cx("form-input")} type="text" name="guardian_name" value="부"/>
          </div>

          {/* 버튼 */}
          <div className={cx("form-btn")}>
            <button type="button" class="btn btn-primary mr-3 ">버튼</button>
          </div>

          <DatePicker showTime onChange={onChange} onOk={onOk} />

        </form>
        
      </div>
    </>
  );
};

export default ReserveSearch;