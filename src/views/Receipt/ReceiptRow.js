import React from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

// 접수 리스트 테이블 한 행 
const ReceiptRow = (props) => {
  // console.log('ReceiptRow render: ', props.receipt.patient_id);

  return (
    <div style={{height:'100%'}}
        className={cx("table-body","d-flex align-items-center border-bottom ")} 
         onClick={() => {
            return props.handleClick(props.receipt.patient_id);
         }}
    >
        <span width={235} style={{width:"90px"}}>{props.receipt.patient_id}</span>
        <span style={{width:"220px"}}>{props.receipt.patient_name}</span>
        <span style={{width:"230px"}}>{props.receipt.patient_sex}</span>
        <span style={{width:"220px"}}>{props.receipt.patient_phone}</span>
        <span style={{width:"250px"}}>{props.receipt.receipt_state}</span>
        <span style={{width:"250px"}}>{props.receipt.receipt_datetime}</span>
    </div>
  );
};

export default ReceiptRow;