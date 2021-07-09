import ResultSearchContainer from "./ResultSearchContainer";
import ResultContainer from "./ResultContainer";
import { useState, useCallback } from "react";
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import { getResultDataByReceipt, getResultDataBySpecimen, getPatientData } from "apis/result";

function Result(props) {
    //결과 테이블 데이터, 결과 테이블 인덱스, 환자 정보 데이터 상태
    const [result, setResult] = useState([]);
    const [ReceiptIndex, setReciptIndex] = useState();
    const [SpecimenIndex, setSpecimenIndex] = useState();
    const [patient, setPatient] = useState({});
    const [resultState, setResultState] = useState();
    const [flag, setFlag] = useState({
        receipt: true,
        specimen: false,
    });
    //결과 테이블에 보여줄 데이터
    //행을 클릭 시, 오른쪽 테이블에 값이 나옴.
    //진단번호와 검체번호에 따라 값을 다르게 출력.
    const handleResult = useCallback((data, rowIndex) => {
        return {
          onClick: async (event) => {
            console.log(data.receipt_id);
            if(data.diagnostic_result_state) {
                setResultState(data.diagnostic_result_state);
                setFlag({
                    receipt: false,
                    specimen: true
                });
            } else {
                setResultState(data.receipt_result_state);
                setFlag({
                    receipt: true,
                    specimen: false
                });
            }
            let resultData;
            if(props.location.pathname === "/result/specimennum") {
                const response = await getResultDataBySpecimen(data.diagnostic_specimen_number);
                resultData = response.data.resultData;
            } else {
                const response = await getResultDataByReceipt(data.receipt_id);
                resultData = response.data.resultData;
                console.log(resultData);
            }
            const response = await getPatientData(data.receipt_id);
            const patientData = response.data.patientData;
            console.log(patientData);
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
        <>
            <Header />
            <div className="d-flex">
                <ResultSearchContainer props={props} handleResult={handleResult} ReceiptIndex={ReceiptIndex} SpecimenIndex={SpecimenIndex} />
                <ResultContainer result={result} patientData={patient} resultState={resultState} flag={flag}/>
            </div>
            <DialMenu />
        </>
    );
}

export default Result;