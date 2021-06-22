import ResultSearchContainer from "./ResultSearchContainer";
import ResultContainer from "./ResultContainer";
import { useState, useCallback } from "react";
import { getPatientData, getResultDataByReceipt, getResultDataBySpecimen } from "./data";
import Header from "./Header";

function Result(props) {
    //결과 테이블 데이터, 결과 테이블 인덱스, 환자 정보 데이터 상태
    const [result, setResult] = useState([]);
    const [ReceiptIndex, setReciptIndex] = useState();
    const [SpecimenIndex, setSpecimenIndex] = useState();
    const [patient, setPatient] = useState({});
    
    //결과 테이블에 보여줄 데이터
    //행을 클릭 시, 오른쪽 테이블에 값이 나옴.
    //진단번호와 검체번호에 따라 값을 다르게 출력.
    const handleResult = useCallback((data, rowIndex) => {
        let resultData;
        if(props.location.pathname === "/result/specimennum") {
            resultData = getResultDataBySpecimen(data.diagnostic_specimen_number);
        } else {
            resultData = getResultDataByReceipt(data.receipt_id);
        }
        const patientData = getPatientData(data.receipt_id);
        return {
          onClick: (event) => {
            setResult(resultData)
            setPatient(patientData);
            setSpecimenIndex();
            setReciptIndex();
            if(props.location.pathname === "/result/specimennum") {
                setSpecimenIndex(rowIndex);
            } else {
                setReciptIndex(rowIndex);
            }
            
          }
        }
    }, [props.location.pathname]);

    return (
        <div>
            <Header />
            <div className="d-flex">
                <ResultSearchContainer props={props} handleResult={handleResult} ReceiptIndex={ReceiptIndex} SpecimenIndex={SpecimenIndex} />
                <ResultContainer result={result} patientData={patient}/>
            </div>
        </div>
    );
}

export default Result;