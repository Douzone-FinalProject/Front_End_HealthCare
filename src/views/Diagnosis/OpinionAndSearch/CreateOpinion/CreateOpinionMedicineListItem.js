import style from "../../Diagnosis.module.css"
import classnames from "classnames/bind";
import React from 'react';

const cx = classnames.bind(style);

function MedicinePrescriptionListItem(props) {
 
    return(
        

        <tr className={cx("test1")} key={props.medicine.medicine_id}>
            <td></td>
            <td></td>
            <td>{props.medicine.medicine_id}</td>
            <td></td>
            <td>{props.medicine.medicine_name}</td>
            <td></td>
            <td>{props.medicine.medicine_unit}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{props.medicine.quantity}</td>
            <td></td>
            <td></td>
        </tr>
    );
}

export default React.memo(MedicinePrescriptionListItem);