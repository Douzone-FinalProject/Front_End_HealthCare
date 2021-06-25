import React from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

// 환자 리스트 테이블 한 행 
const PatientRow = (props) => {
  // console.log('PatientRow render: ', props.patient.patient_id);

  return (
      <div style={{height:'100%'}}
          className={cx("table-body","d-flex align-items-center border-bottom")} 
          onClick={() => props.handleClick(props.patient.patient_id)}
      >
        <span width={235} style={{width:"80px"}}>{props.patient.patient_id}</span>
        <span style={{width:"210px"}}>{props.patient.patient_name}</span>
        <span style={{width:"260px"}}>{props.patient.patient_ssn}</span>
        <span style={{width:"190px"}}>{props.patient.patient_phone}</span>
        <span style={{width:"230px"}}>{props.patient.patient_sex}</span>
        <span style={{width:"260px"}}>{props.patient.patient_register_date}</span>
      </div>
  );
};

export default PatientRow;