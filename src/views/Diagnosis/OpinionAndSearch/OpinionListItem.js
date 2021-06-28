import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import React from "react";

const cx = classnames.bind(style);

function OpinionListItem(props) {
    
    const selectOpinion = (event1, event2) => {
        props.selectOpinion(event1, event2);
    }
    const openOpinion = (event) => {
        props.openOpinion(event);
    }

    return(
            
                <tr onDoubleClick={()=>{openOpinion(props.opinion.receipt_id)}} onClick={()=>{selectOpinion(props.opinion.receipt_id, props.opinion.diagnostic_test_state)}} className={cx("diagnosis-opinionAndSearch-row")} key={props.opinion.receipt_id}>
                    <td className={cx("diagnosis-opinionAndSearch-chart")}>{props.opinion.patient_id}</td>
                    <td className={cx("diagnosis-opinionAndSearch-dateTable", "diagnosis-alphabet")}>{props.opinion.receipt_opinion}</td>
                    <td className={cx("diagnosis-opinionAndSearch-state")}>{props.opinion.receipt_datetime}</td>
                    {props.opinion.diagnostic_test_state === "" && <td className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                    {props.opinion.diagnostic_test_state === "검사 중" && <td style={{color:"red"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                    {props.opinion.diagnostic_test_state === "검사 완료" && <td style={{color:"blue"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                </tr>
    );
}

export default OpinionListItem;