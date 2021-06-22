import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import React from "react";

const cx = classnames.bind(style);

function OpinionListItem(props) {
    
    return(
            
                <tr className={cx("diagnosis-opinionAndSearch-row")} key={props.opinion.receipt_id}>
                    <td className={cx("diagnosis-opinionAndSearch-chart")}>{props.opinion.patient_id}</td>
                    <td className={cx("diagnosis-opinionAndSearch-dateTable", "diagnosis-alphabet")}>{props.opinion.receipt_opinion}</td>
                    <td className={cx("diagnosis-opinionAndSearch-state")}>{props.opinion.receipt_datetime}</td>
                    <td className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>
                </tr>
    );
}

export default OpinionListItem;