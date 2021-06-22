import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import React from "react";

const cx = classnames.bind(style);

function SymptomSearchItem(props) {

    return(
            
        <tr key={props.symptom.search_id}>
            <td>{props.symptom.symptom_name}</td>
            <td>{props.symptom.symptom_code}</td>
            <td>{props.symptom.bundle_code}</td>
            <td className={cx("diagnosis-alphabet")}>{props.symptom.bundle_name}</td>
        </tr>
    );
}

export default SymptomSearchItem;