import React, {useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { Calendar, Badge, Alert } from 'antd';
import moment from 'moment';

const cx = classNames.bind(style);

const ReserveResult = (props) => {



  return (
    <>
      <div className={cx("reserve-result")}>
        <table className="table table-bordered">
        <thead>
           <tr className={cx("table-header")}>
             <th>시각</th><th className={cx("today")}>06.16(수)</th><th>06.17(목)</th><th>06.18(금)</th><th>06.19(토)</th><th>06.20(일)</th>
           </tr>
        </thead>
        <tbody>
           <tr className={cx("table-body")}>
             <td className={cx("time")}>09</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
           <tr className={cx("table-body")}>
           <td className={cx("time")}>10</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
           <tr className={cx("table-body")}>
             <td className={cx("time")}>11</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
           <tr className={cx("table-body")}>
             <td className={cx("time")}>12</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
           <tr className={cx("table-body")}>
             <td className={cx("time")}>13</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
           <tr className={cx("table-body")}>
             <td className={cx("time")}>14</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
           <tr className={cx("table-body")}>
             <td className={cx("time")}>15</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
           <tr className={cx("table-body")}>
             <td className={cx("time")}>16</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
           <tr className={cx("table-body")}>
             <td className={cx("time")}>17</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
           <tr className={cx("table-body")}>
             <td className={cx("time")}>18</td><td></td><td></td><td></td><td></td><td>이채정 09:00 예약</td>
           </tr>
         </tbody>
       </table>
     </div>
    </>
    
  );
};

export default ReserveResult;

