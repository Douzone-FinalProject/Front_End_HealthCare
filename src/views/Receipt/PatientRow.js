import React from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

// 환자 리스트 테이블 한 행 
const PatientRow = (props) => {
  // console.log('PatientRow render: ', props.patient.patient_id);

  return (
      <tr className={cx("table-body")} 
          onClick={() => props.handleClick(props.patient.patient_id)}
      >
        <td width={235}>{props.patient.patient_id}</td>
        <td width={150}>{props.patient.patient_name}</td>
        <td width={234}>{props.patient.patient_ssn}</td>
        <td width={144}>{props.patient.patient_phone}</td>
        <td width={151}>{props.patient.patient_sex}</td>
        <td width={318}>{props.patient.patient_register_date}</td>
      </tr>
  );
};

export default PatientRow;