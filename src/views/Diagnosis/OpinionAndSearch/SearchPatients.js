import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import SearchListItem from "./SearchListItem";
import { useState } from "react";
import { MDBTable, MDBTableBody } from 'mdbreact';

const cx = classnames.bind(style);

function SearchPatients(props) {
    function getOpinion(){
        const opinions = [
            {receipt_id:"2020", patient_name: "조민상", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요...", receipt_datetime:"2021-06-18", patient_id:"100412", diagnostic_test_state:"검사 중"},
            {receipt_id:"2022", patient_name: "조민상", receipt_opinion:"화병 의심. 심리 검사 후 재진 필요...", receipt_datetime:"2021-06-15", patient_id:"100412", diagnostic_test_state:"" },
            {receipt_id:"2051", patient_name: "조민상", receipt_opinion:"정상인거 의심... 더 이상 재진 필요 없음", receipt_datetime:"2021-06-11", patient_id:"100412", diagnostic_test_state:"" },
            {receipt_id:"2571", patient_name: "강병주", receipt_opinion:"화병 의심. 심리 검사 후 재진 필요...", receipt_datetime:"2021-06-17", patient_id:"100212", diagnostic_test_state:"" },
            {receipt_id:"6212", patient_name: "강병주", receipt_opinion:"정상인거 의심... 더 이상 재진 필요 없음", receipt_datetime:"2021-06-14", patient_id:"100212", diagnostic_test_state:"" }
        ];
        return opinions;
    }

    const [opinions, setOpinions] = useState(getOpinion);
    const [opinionsCopy, setOpinionCopys] = useState([]);

    const [searchChart, setSearchChart] = useState({
        patient_id: "",
        receipt_datetime: "",
        patient_name: ""
    });
    const handleSearch = (event) => {
        setSearchChart({
            ...searchChart,
            [event.target.name]: event.target.value
        })
        
    };

    const search = (patient_id, receipt_datetime, patient_name) => {
        if(receipt_datetime){
            const patientChart = opinions.filter(opinion =>  opinion.receipt_datetime === receipt_datetime);
            setOpinionCopys([
                ...patientChart
            ])
        }
        if(patient_id){ //차트번호만 입력 할 경우
            const patientChart = opinions.filter(opinion =>  opinion.patient_id === patient_id);
            setOpinionCopys([
                ...patientChart
            ])
        }
        if(patient_name){   //이름만 검색 할 경우
            const patientChart = opinions.filter(opinion =>  opinion.patient_name === patient_name);
            setOpinionCopys([
                ...patientChart
            ])
        }
        if(patient_id && receipt_datetime) {   //차트번호와 날짜 입력 할 경우
            const patientChart = opinions.filter(opinion =>  opinion.patient_id === patient_id && opinion.receipt_datetime === receipt_datetime);
            setOpinionCopys([
                ...patientChart
            ])
        }
        if(patient_name && patient_id){   //이름하고 차트번호 입력 할 경우
            const patientChart =  opinions.filter(opinion =>  opinion.patient_name === patient_name && opinion.patient_id === patient_id);
            setOpinionCopys([
                ...patientChart
            ])
        }
        if(patient_name && receipt_datetime){   //이름하고 차트번호 입력 할 경우
            const patientChart =  opinions.filter(opinion =>  opinion.patient_name === patient_name && opinion.receipt_datetime === receipt_datetime);
            setOpinionCopys([
                ...patientChart
            ])
        }
    };

    return(
        <>
        <div className="mt-4">

            <h4 className={cx("diagnosis-opinionAndSearch-title","mb-3")}>환자 검색</h4>
            <input className={cx("ml-3", "diagnosis-searchPatients-input")} type="text" name="patient_name" onChange={handleSearch} placeholder="이름"/>
            <input className={cx("mb-2", "diagnosis-searchPatients-input")} name="patient_id" type="text" placeholder="차트번호" onChange={handleSearch}/>
            <input type="date" name="receipt_datetime" onChange={handleSearch}/>

            <div className={cx("diagnosis-opinionAndSearch-tabaleHeight")}>
                <MDBTable scrollY className={cx("diagnosis-table", "diagnosis-opinionAndSearch-tableInterval")}>
                    <MDBTableBody>
                    {opinionsCopy.map((opinion) => {
                            return (
                                <SearchListItem key={opinion.receipt_id} opinion={opinion} />
                            );
                        })}
                    </MDBTableBody>
                </MDBTable>
            </div>
            
            <div>
                <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button")} onClick={()=>{search(searchChart.patient_id, searchChart.receipt_datetime, searchChart.patient_name);}} >검색</Button>
                <Button className={cx("diagnosis-button")}>결과 조회</Button>
            </div>    

        </div>
        </>
    );
}

export default SearchPatients;