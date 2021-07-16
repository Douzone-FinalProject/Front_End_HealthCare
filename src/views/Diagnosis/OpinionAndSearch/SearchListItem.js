import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import React from "react";
import Swal from "sweetalert2";

const cx = classnames.bind(style);

function SearchListItem(props) {
    const selectOpinion2 = (event1, event2) => {
        props.selectOpinion2(event1, event2);
    }
    const openOpinion = (receipt_id, opinion) => {
        if(opinion === '추후 재진 예정'){
            Swal.fire({
                icon: 'info',
                title: '검사용 소견입니다.',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            props.openOpinion(receipt_id);
        }
    }
    return(
        <>
        {props.selectReceipt_id2.receipt_id === props.opinion.receipt_id ? 
            <tr onDoubleClick={()=>{openOpinion(props.opinion.receipt_id, props.opinion.receipt_opinion)}} onClick={()=>{selectOpinion2(props.opinion.receipt_id, props.opinion.diagnostic_test_state)}} className={cx("diagnosis-opinionAndSearch-row")} key={props.opinion.receipt_id} style={{backgroundColor:"#c5f6fa"}}>
                <td className={cx("diagnosis-opinionAndSearch-chart")}>{props.opinion.receipt_id}</td>
                <td className={cx("diagnosis-opinionAndSearch-chart")}>{props.opinion.patient_id}</td>
                <td className={cx("diagnosis-opinionAndSearch-dateTable", "diagnosis-alphabet")}>{props.opinion.receipt_opinion}</td>
                {props.opinion.diagnostic_test_state === null && <td className={cx("diagnosis-opinionAndSearch-test_state")}>미검사</td>}
                {props.opinion.diagnostic_test_state === "검사대기" && <td style={{color:"#f59f00"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                {props.opinion.diagnostic_test_state === "검사중" && <td style={{color:"red"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                {props.opinion.diagnostic_test_state === "검사완료" && <td style={{color:"blue"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                {props.opinion.diagnostic_test_state === "처방완료" && <td style={{color:"black"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                <td className={cx("diagnosis-opinionAndSearch-state")}>{props.opinion.receipt_datetime}</td>
            </tr>
            :
            <tr onDoubleClick={()=>{openOpinion(props.opinion.receipt_id, props.opinion.receipt_opinion)}} onClick={()=>{selectOpinion2(props.opinion.receipt_id, props.opinion.diagnostic_test_state)}} className={cx("diagnosis-opinionAndSearch-row")} key={props.opinion.receipt_id}>
                <td className={cx("diagnosis-opinionAndSearch-chart")}>{props.opinion.receipt_id}</td>
                <td className={cx("diagnosis-opinionAndSearch-chart")}>{props.opinion.patient_id}</td>
                <td className={cx("diagnosis-opinionAndSearch-dateTable", "diagnosis-alphabet")}>{props.opinion.receipt_opinion}</td>
                {props.opinion.diagnostic_test_state === null && <td className={cx("diagnosis-opinionAndSearch-test_state")}>미검사</td>}
                {props.opinion.diagnostic_test_state === "검사대기" && <td style={{color:"#f59f00"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                {props.opinion.diagnostic_test_state === "검사중" && <td style={{color:"red"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                {props.opinion.diagnostic_test_state === "검사완료" && <td style={{color:"blue"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                {props.opinion.diagnostic_test_state === "처방완료" && <td style={{color:"black"}} className={cx("diagnosis-opinionAndSearch-test_state")}>{props.opinion.diagnostic_test_state}</td>}
                <td className={cx("diagnosis-opinionAndSearch-state")}>{props.opinion.receipt_datetime}</td>
            </tr>
        }
        </>
    );
}

export default SearchListItem;