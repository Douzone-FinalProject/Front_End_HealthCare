import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import CreateOpinion from "./CreateOpinion";
import OpinionListItem from "./OpinionListItem";
import {useState} from "react";
import { MDBTable, MDBTableBody } from 'mdbreact';
import {Link, useHistory} from "react-router-dom";
const cx = classnames.bind(style);

function SymptomAndOpinion(props) {
    function getOpinion(){
        const opinions = [
            {receipt_id:"2020", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-13", patient_id:100552, diagnostic_test_state:"검사 완료"},
            {receipt_id:"2022", receipt_opinion:"이중인격 의심. 심리 검사 후 재진 필요", receipt_datetime:"2021-06-10", patient_id:100552 , diagnostic_test_state:""},
            {receipt_id:"2051", receipt_opinion:"정상인거 의심... 더 이상 재진 필요 없음", receipt_datetime:"2021-06-11", patient_id:100412, diagnostic_test_state:"검사 완료"},
            {receipt_id:"2072", receipt_opinion:"정상인거 의심... 더 이상 재진 필요 없음", receipt_datetime:"2021-06-02", patient_id:100412, diagnostic_test_state:"검사 완료"},
            {receipt_id:"2042", receipt_opinion:"어디에나 끼는 병 의심심각함", receipt_datetime:"2021-06-13", patient_id:100732, diagnostic_test_state:""},
            {receipt_id:"2152", receipt_opinion:"형님병 의심", receipt_datetime:"2021-06-13", patient_id:100732, diagnostic_test_state:""},
            {receipt_id:"3521", receipt_opinion:"중2병 의심. 심리 검사 후 재진 필요", receipt_datetime:"2021-06-07", patient_id:100212, diagnostic_test_state:""},
            {receipt_id:"7212", receipt_opinion:"사진증 의심... 사진 찍을 때만 옷 입는...", receipt_datetime:"2021-06-01", patient_id:100212, diagnostic_test_state:"검사 완료"},
            {receipt_id:"9921", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-23", patient_id:100002, diagnostic_test_state:"검사 완료"},
            {receipt_id:"9429", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-18", patient_id:100002, diagnostic_test_state:"검사 완료"},
            {receipt_id:"5255", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-11", patient_id:100002, diagnostic_test_state:"검사 완료"},
            {receipt_id:"9531", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-18", patient_id:100002, diagnostic_test_state:"검사 완료"}
           
            
            
        ];
        return opinions;
    }

    const [opinions, setOpinions] = useState(getOpinion);
    const fatientOpinion = opinions.filter(opinion => opinion.patient_id === props.selectedPatient);

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const history = useHistory();

    return(
        <>
        
        <div className={cx("mt-4")}>
            <h4 className={cx("diagnosis-opinionAndSearch-title","mb-4")}>증상 및 소견</h4>
            <div className={cx("diagnosis-opinion-tabaleinterval")}></div>
                <div className={cx("diagnosis-opinionAndSearch-tabaleHeight")}>
                    <MDBTable scrollY className={cx("diagnosis-table", "diagnosis-opinionAndSearch-tableInterval", "table-hover")}>
                        <MDBTableBody> 
                        {fatientOpinion.map((opinion) => {
                                return (
                                    <OpinionListItem key={opinion.receipt_id} opinion={opinion} selectPatient={props.selectedPatient} />
                                )
                            })}
                        </MDBTableBody>
                    </MDBTable>
                </div>
                <div>
                    <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button")} onClick={openModal}>소견 작성</Button>
                    <Button className={cx("diagnosis-button")}>결과 조회</Button>
                </div>    
                <CreateOpinion modalIsOpen={modalIsOpen} closeModal={closeModal}/>  
        </div>
        </>
    );
}

export default SymptomAndOpinion;