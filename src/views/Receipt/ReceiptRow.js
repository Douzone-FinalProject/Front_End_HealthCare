import React from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);


// 접수 리스트 테이블 한 행 
const ReceiptRow = (props) => {
  console.log('ReceiptRow render: ', props.receipt.patient_id);

  return (
      <tr className={cx("table-body")}>
        <td width={308}>{props.receipt.patient_id}</td>
        <td width={196}>{props.receipt.patient_name}</td>
        <td width={200}>{props.receipt.patient_sex}</td>
        <td width={180}>{props.receipt.patient_phone}</td>
        <td width={200}>{props.receipt.receipt_state}</td>
        <td width={300}>{props.receipt.receipt_datetime}</td>
      </tr>
  );
};

export default ReceiptRow;