import React from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const PatientRow = (props) => {

  return (
      <div style={{height:'100%'}}
          className={cx("table-body","d-flex align-items-center border-bottom")} 
          onClick={() => props.handleClick(props.patient.reservation_id)}
      >
        <span style={{width:"200px"}}>{props.patient.reservation_name}</span>
        <span style={{width:"220px"}}>{props.patient.reservation_phone}</span>
        <span style={{width:"230px"}}>{props.patient.reservation_datetime}</span> 
      </div>
  );
};

export default PatientRow;