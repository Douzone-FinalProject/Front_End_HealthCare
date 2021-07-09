import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import SearchListItem from "./SearchListItem";
import { useState } from "react";
import { MDBTable, MDBTableBody } from 'mdbreact';
import { Link } from "react-router-dom";
import { searchPatientIdOpinion, searchDateOpinion, searchPatientNameOpinion, searchPatientIdAndDate, searchPatientIdAndName, searchPatientNameAndDate, searchAll } from "apis/diagnostic";
import Swal from "sweetalert2";

const cx = classnames.bind(style);

function SearchPatients(props) {
    const [opinionsCopy, setOpinionCopys] = useState([]);
    const [searchChart, setSearchChart] = useState({
        patient_id: '',
        receipt_datetime: '',
        patient_name: ''
    });
    const handleSearch  =  (event) => {
        setSearchChart({
            ...searchChart,
            [event.target.name]: event.target.value
        })
        
    };
    
   
    const search  = async (patient_id, receipt_datetime, patient_name) => {
        
            if(!patient_id && receipt_datetime && !patient_name){
                const response = await searchDateOpinion(receipt_datetime);
                const patientChart = response.data.searchDateOpinionList.filter(opinion => opinion.receipt_opinion !== ""); // 일단 테스트라 null로 바꿔야 함 후에 밑에 다
                setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_id && !receipt_datetime && !patient_name){ //차트번호만 입력 할 경우
                const response = await searchPatientIdOpinion(patient_id);
                const patientChart = response.data.searchPatientIdOpinionList.filter(opinion => opinion.receipt_opinion !== null);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_name && !receipt_datetime && !patient_id){   //이름만 검색 할 경우
                const response = await searchPatientNameOpinion(patient_name);
                const patientChart = response.data.searchPatientNameOpinionList.filter(opinion => opinion.receipt_opinion !== null);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_id && receipt_datetime && !patient_name) {   //차트번호와 날짜 입력 할 경우
                const response = await searchPatientIdAndDate(patient_id, receipt_datetime);
                const patientChart = response.data.searchPatientIdAndDateList.filter(opinion => opinion.receipt_opinion !== null);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_name && patient_id && !receipt_datetime){   //이름하고 차트번호 입력 할 경우
                const response = await searchPatientIdAndName(patient_name, patient_id);
                const patientChart = response.data.searchPatientIdAndNameList.filter(opinion => opinion.receipt_opinion !== null);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_name && receipt_datetime && !patient_id){   //이름하고 날짜 입력 할 경우
                const response = await searchPatientNameAndDate(patient_name, receipt_datetime);
                const patientChart = response.data.searchPatientNameAndDateList.filter(opinion => opinion.receipt_opinion !== null);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            else{
                const response = await searchAll(patient_id, patient_name, receipt_datetime); //id, 이름, 날짜 3개 입력
                const patientChart = response.data.searchAllList.filter(opinion => opinion.receipt_opinion !== null);
                setOpinionCopys([
                    ...patientChart
                ])
            }
    
    };

   
    const changeToOpinion = (event) => {
        props.changeToOpinion(event);
        
    };
  
    return(
        <>
        <Button init2={true} className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus", "OpinionAndSearchButton")} onClick={changeToOpinion} >증상 및 소견</Button>
        <Button init={true}  className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus", "OpinionAndSearchButton")} >환자 검색</Button>
        <div className="mt-4">
        
            <h4 className={cx("diagnosis-opinionAndSearch-title","mb-3")}>환자 검색</h4>
            <input className={cx("ml-3 mr-2", "diagnosis-searchPatients-input")} type="text" name="patient_name" onChange={handleSearch} placeholder="이름"/>
            <input className={cx("mb-1 mr-2", "diagnosis-searchPatients-input")} name="patient_id" type="text" placeholder="차트번호" onChange={handleSearch}/>
            <input type="date" name="receipt_datetime" onChange={handleSearch}/>

            <div className={cx("diagnosis-opinionAndSearch-tabaleHeight2")}>
                <MDBTable scrollY className={cx("diagnosis-table", "diagnosis-opinionAndSearch-tableInterval","table-hover")}>
                    <MDBTableBody>
                    {opinionsCopy.map((opinion) => {
                            return (
                                <SearchListItem key={opinion.receipt_id} opinion={opinion} selectOpinion2={props.selectOpinion2} openOpinion={props.openOpinion} />
                            );
                        })}
                    </MDBTableBody>
                </MDBTable>
            </div>
            {opinionsCopy.receipt_id || props.selectReceipt_id2.diagnostic_test_state === "검사완료" || props.selectReceipt_id2.diagnostic_test_state === "처방완료"  ?
                <>
                   <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button")} onClick={()=>{search(searchChart.patient_id, searchChart.receipt_datetime, searchChart.patient_name);}} >검색</Button>
                   <Link className={cx("noneLink","diagnosis-button")} to="/result"><Button>결과 조회</Button></Link>
                </>    
            :
                <>
                    <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button")} onClick={()=>{search(searchChart.patient_id, searchChart.receipt_datetime, searchChart.patient_name);}} >검색</Button>
                </>    
            }
            


            
        </div>
        </>
    );
}

export default SearchPatients;