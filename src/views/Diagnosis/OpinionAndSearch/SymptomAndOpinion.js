import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import CreateOpinion from "./CreateOpinion";
import OpinionListItem from "./OpinionListItem";
import { MDBTable, MDBTableBody } from 'mdbreact';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useState } from "react"
const cx = classnames.bind(style);

function SymptomAndOpinion(props) {
    
    const [selectReceipt, setSelectReceipt] = useState()

    const changeToSearch = (event) => {
        props.changeToSearch(event);
    };

    const selectOpinion = (event1, event2) => {
        setSelectReceipt(event1);
        props.selectOpinion(event1, event2);
    }
    
    return(
        <>
        <CreateOpinion modalIsOpen={props.modalIsOpen} closeModal={props.closeModal} medicines={props.medicines} medicineCount={props.medicineCount} handleCount={props.handleCount} quantity={props.quantity} reportOpinion={props.reportOpinion} reportSuccess={props.reportSuccess} reportOp={props.reportOp}/>  
        <Button init={true} className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus", "OpinionAndSearchButton")} >증상 및 소견</Button>
        <Button init2={true} className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus", "OpinionAndSearchButton")} onClick={changeToSearch} >환자 검색</Button>
        <div className={cx("mt-4")}>
            <h4 className={cx("diagnosis-opinionAndSearch-title","mb-3")}>증상 및 소견</h4>
            <div className={cx("diagnosis-opinion-tabaleinterval")}></div>
                <div className={cx("diagnosis-opinionAndSearch-tabaleHeight")}>
                    <MDBTable scrollY className={cx("diagnosis-table", "diagnosis-opinionAndSearch-tableInterval", "table-hover")}>
                        <MDBTableBody> 
                        {props.fatientOpinion.map((opinion) => {
                                return (
                                    <OpinionListItem key={opinion.receipt_id} opinion={opinion} openOpinion={props.openOpinion} selectOpinion={selectOpinion} />
                                )
                            })}
                        </MDBTableBody>
                    </MDBTable>
                </div>
                {/* && props.selectedPatient.receipt_state === '진료중' */}
                {props.selectedPatient.patient_id  ? 
                    <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button", "mb-1")} onClick={props.openModal}>소견 작성</Button>
                    :
                    <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button", "mb-1")} onClick={() =>
                         Swal.fire({
                            icon: 'info',
                            title: '진료 상태인 환자만 선택 가능합니다.',
                            showConfirmButton: false,
                            timer: 1500
                        })}>소견 작성</Button>
                }
                {props.selectReceipt_id.patient_id || props.selectReceipt_id.diagnostic_test_state === "검사완료" || props.selectReceipt_id.diagnostic_test_state === "처방완료" ?
                    <Link className={cx("noneLink","diagnosis-button", "mb-1")} to={"/result?receipt_id=" + selectReceipt}><Button>결과 조회</Button></Link>
                    :
                    <>
                    </>
                }
                    
                    
                
        </div>
        </>
    );
}

export default SymptomAndOpinion;