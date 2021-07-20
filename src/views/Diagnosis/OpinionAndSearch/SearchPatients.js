import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import SearchListItem from "./SearchListItem";
import { useEffect, useState } from "react";
import { MDBTable, MDBTableBody } from 'mdbreact';
import { Link } from "react-router-dom";
import { searchPatientIdOpinion, searchDateOpinion, searchPatientNameOpinion, searchPatientIdAndDate, searchPatientIdAndName, searchPatientNameAndDate, searchAll } from "apis/diagnostic";
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

const cx = classnames.bind(style);

function SearchPatients(props) {

    const changeToOpinion = (event) => {
        props.changeToOpinion(event);
        
    };
    
    const [selectReceipt, setSelectReceipt] = useState()

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

    const selectOpinion2 = (event1, event2, event3) => {
        setSelectReceipt(event1)
        props.selectOpinion2(event1, event2, event3);
    }
    
   
    const search  = async (patient_id, receipt_datetime, patient_name) => {
        
            if(!patient_id && receipt_datetime && !patient_name){
                const response = await searchDateOpinion(receipt_datetime);
                const patientChart = response.data.searchDateOpinionList.filter(opinion => opinion.receipt_opinion !== ""); // 일단 테스트라 null로 바꿔야 함 후에 밑에 다
                props.setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_id && !receipt_datetime && !patient_name){ //차트번호만 입력 할 경우
                const response = await searchPatientIdOpinion(patient_id);
                const patientChart = response.data.searchPatientIdOpinionList.filter(opinion => opinion.receipt_opinion !== null);
                props.setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_name && !receipt_datetime && !patient_id){   //이름만 검색 할 경우
                const response = await searchPatientNameOpinion(patient_name);
                const patientChart = response.data.searchPatientNameOpinionList.filter(opinion => opinion.receipt_opinion !== null);
                props.setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_id && receipt_datetime && !patient_name) {   //차트번호와 날짜 입력 할 경우
                const response = await searchPatientIdAndDate(patient_id, receipt_datetime);
                const patientChart = response.data.searchPatientIdAndDateList.filter(opinion => opinion.receipt_opinion !== null);
                props.setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_name && patient_id && !receipt_datetime){   //이름하고 차트번호 입력 할 경우
                const response = await searchPatientIdAndName(patient_name, patient_id);
                const patientChart = response.data.searchPatientIdAndNameList.filter(opinion => opinion.receipt_opinion !== null);
                props.setOpinionCopys([
                    ...patientChart
                ])
            }
            else if(patient_name && receipt_datetime && !patient_id){   //이름하고 날짜 입력 할 경우
                const response = await searchPatientNameAndDate(patient_name, receipt_datetime);
                const patientChart = response.data.searchPatientNameAndDateList.filter(opinion => opinion.receipt_opinion !== null);
                props.setOpinionCopys([
                    ...patientChart
                ])
            }
            else{
                const response = await searchAll(patient_id, patient_name, receipt_datetime); //id, 이름, 날짜 3개 입력
                const patientChart = response.data.searchAllList.filter(opinion => opinion.receipt_opinion !== null);
                props.setOpinionCopys([
                    ...patientChart
                ])
            }
    
    };

    const nameEnter = (e, patient_id, receipt_datetime, patient_name) => {
        if(e.key === 'Enter'){
            search(patient_id, receipt_datetime, patient_name);
        }
    }

    const idEnter = (e, patient_id, receipt_datetime, patient_name) => {
        if(e.key === 'Enter'){
            search(patient_id, receipt_datetime, patient_name);
        }
    }

    const dateEnter = (e, patient_id, receipt_datetime, patient_name) => {
        if(e.key === 'Enter'){
            search(patient_id, receipt_datetime, patient_name);
        }
    }

   
   
  
    useEffect(() => {
        console.log("환자 검색 창 수정 후 ")
    }, [props.opinionsCopy])

    return(
        <>
        <Button init2={true} className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus", "OpinionAndSearchButton")} onClick={changeToOpinion} >증상 및 소견</Button>
        <Button init={true}  className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus", "OpinionAndSearchButton")} >환자 검색</Button>
        <div className="mt-4">
            <div className="d-flex flex-row mb-3">
                <h4 className={cx("diagnosis-opinionAndSearch-title","mb-3")}>환자 검색</h4>
                <input className={cx("mr-2", "diagnosis-searchPatients-input", "diagnosis-searchPatients-first-input")} type="text" name="patient_name" onKeyPress={(e)=>{nameEnter(e,searchChart.patient_id, searchChart.receipt_datetime, searchChart.patient_name)}} onChange={handleSearch} placeholder="이름"/>
                <input className={cx("mr-2", "diagnosis-searchPatients-input")} name="patient_id" type="text" onKeyPress={(e)=>{idEnter(e,searchChart.patient_id, searchChart.receipt_datetime, searchChart.patient_name)}} placeholder="차트번호" onChange={handleSearch}/>
                <input className={cx("diagnosis-searchPatients-input")} type="date" name="receipt_datetime" onKeyPress={(e)=>{dateEnter(e,searchChart.patient_id, searchChart.receipt_datetime, searchChart.patient_name)}} onChange={handleSearch}/>
            </div>
            <div className={cx("diagnosis-opinionAndSearch-tabaleHeight2")}>
            <MDBTable scrollY className={cx("table", "diagnosis-tbh")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th style={{width:"24%"}}>접수번호</th>
                    <th style={{width:"20%"}}>차트번호</th>
                    <th style={{width:"23%"}}>소견내용</th>
                    <th style={{width:"15.7%"}}>검사상태</th>
                    <th style={{width:"23%"}}>날짜</th>
                    </tr>
                </thead>
                </MDBTable>
            {props.opinionsCopy.length > 0 ?
                <MDBTable scrollY className={cx("diagnosis-table", "diagnosis-opinionAndSearch-tableInterval","table-hover")}>
                    <MDBTableBody>
                    {props.opinionsCopy.map((opinion) => {
                            return (
                                <SearchListItem key={opinion.receipt_id} opinion={opinion} selectOpinion2={selectOpinion2} openOpinion={props.openOpinion} selectReceipt_id2={props.selectReceipt_id2} />
                            );
                        })}
                    </MDBTableBody>
                </MDBTable>
            :
                <AssignmentIndOutlinedIcon style={{width: "100%", height: "6em", color:"#ced4da", marginTop:"5%"}} />
            }
            </div>
            {props.opinionsCopy.receipt_id || props.selectReceipt_id2.diagnostic_test_state === "검사완료" && props.selectReceipt_id2.receipt_result_state !== null  || props.selectReceipt_id2.diagnostic_test_state === "처방완료" && props.selectReceipt_id2.receipt_result_state !== null  ?
                <>
                   <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button", "mt-3")} onClick={()=>{search(searchChart.patient_id, searchChart.receipt_datetime, searchChart.patient_name)}} >검색</Button>
                   <Link className={cx("noneLink")} to={{pathname:"/result", state: {receiptId2: selectReceipt}}}><Button className={cx("mt-3")}>결과 조회</Button></Link>

                </>    
            :
                <>
                    <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button", "mt-3")} onClick={()=>{search(searchChart.patient_id, searchChart.receipt_datetime, searchChart.patient_name)}} >검색</Button>
                </>    
            }
            


            
        </div>
        </>
    );
}

export default SearchPatients;