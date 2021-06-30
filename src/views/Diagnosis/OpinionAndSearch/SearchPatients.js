import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import SearchListItem from "./SearchListItem";
import { useState } from "react";
import { MDBTable, MDBTableBody } from 'mdbreact';
import { Link } from "react-router-dom";
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
    

    const search  =  (patient_id, receipt_datetime, patient_name) => {
        
            if(receipt_datetime){
                const patientChart = props.opinions.filter(opinion =>  opinion.receipt_datetime === receipt_datetime);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            if(patient_id){ //차트번호만 입력 할 경우
                const patientChart = props.opinions.filter(opinion =>  opinion.patient_id === patient_id);
                console.log([patientChart]);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            if(patient_name){   //이름만 검색 할 경우
                const patientChart = props.opinions.filter(opinion =>  opinion.patient_name === patient_name);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            if(patient_id && receipt_datetime) {   //차트번호와 날짜 입력 할 경우
                const patientChart = props.opinions.filter(opinion =>  opinion.patient_id === patient_id && opinion.receipt_datetime === receipt_datetime);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            if(patient_name && patient_id){   //이름하고 차트번호 입력 할 경우
                const patientChart = props.opinions.filter(opinion =>  opinion.patient_name === patient_name && opinion.patient_id === patient_id);
                setOpinionCopys([
                    ...patientChart
                ])
            }
            if(patient_name && receipt_datetime){   //이름하고 차트번호 입력 할 경우
                const patientChart = props.opinions.filter(opinion =>  opinion.patient_name === patient_name && opinion.receipt_datetime === receipt_datetime);
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
            {opinionsCopy.receipt_id || props.selectReceipt_id2.diagnostic_test_state === "검사 완료" ?
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