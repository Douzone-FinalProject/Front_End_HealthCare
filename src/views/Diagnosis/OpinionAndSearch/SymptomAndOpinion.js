import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import CreateOpinion from "./CreateOpinion";
import OpinionListItem from "./OpinionListItem";
import {useState} from "react";
import { MDBTable, MDBTableBody } from 'mdbreact';
import { Link, Route } from "react-router-dom";

const cx = classnames.bind(style);

function SymptomAndOpinion(props) {
    
    const changeToSearch = (event) => {
        props.changeToSearch(event);
    };

    
    return(
        <>
        <CreateOpinion modalIsOpen={props.modalIsOpen} closeModal={props.closeModal} medicines={props.medicines} medicineCount={props.medicineCount} handleCount={props.handleCount} quantity={props.quantity} reportOpinion={props.reportOpinion} reportSuccess={props.reportSuccess}/>  
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
                                    <OpinionListItem key={opinion.receipt_id} opinion={opinion} openOpinion={props.openOpinion} selectOpinion={props.selectOpinion} />
                                )
                            })}
                        </MDBTableBody>
                    </MDBTable>
                </div>
                
                {props.selectedPatient.patient_id ? 
                    <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button")} onClick={props.openModal}>소견 작성</Button>
                    :
                    <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button")} onClick={() => alert('진료 할 환자를 선택해주세요.')}>소견 작성</Button>
                }
                {props.selectReceipt_id.patient_id || props.selectReceipt_id.diagnostic_test_state === "검사 완료" ?
                    <Link className={cx("noneLink","diagnosis-button")} to="/result"><Button>결과 조회</Button></Link>
                    :
                    <>
                    </>
                }
                    
                 
                
        </div>
        </>
    );
}

export default SymptomAndOpinion;