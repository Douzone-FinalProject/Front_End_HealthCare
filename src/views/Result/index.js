import ResultSearchContainer from "./ResultSearchContainer";
import ResultContainer from "./ResultContainer";
import { useState, useCallback } from "react";
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import { getResultDataByReceipt, getResultDataBySpecimen, getPatientDataBySpecimen } from "apis/result";

function Result(props) {
    //진료 페이지에서 넘겨준 receipt_id가 있다면 저장
    if(typeof props.history.location.state == "undefined") {
    } else {
        sessionStorage.setItem("receipt_id2", props.history.location.state.receiptId2);
    }
    //결과 테이블 데이터, 결과 테이블 인덱스, 환자 정보 데이터, 이미지 배열 데이터 상태
    const [result, setResult] = useState([]);
    const [ReceiptIndex, setReciptIndex] = useState();
    const [SpecimenIndex, setSpecimenIndex] = useState();
    const [resultIndex, setResultIndex] = useState();
    const [patient, setPatient] = useState({});
    const [resultState, setResultState] = useState();
    const [imgArray, setImgArray] = useState([]);
    const [flag, setFlag] = useState({
        receipt: true,
        specimen: false,
    });
    const [saveResult, setSaveResult] = useState(false);

    //결과 테이블에 보여줄 데이터
    //행을 클릭 시, 오른쪽 테이블에 값이 나옴.
    //진단번호와 검체번호에 따라 값을 다르게 출력.
    //진단에 해당하는 이미지가 있다면 불러옴.
    const handleResult = useCallback((data, rowIndex) => {
        return {
          onClick: async (event) => {
            setResultIndex();
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
                const responseByPatient = await getPatientDataBySpecimen(data.diagnostic_specimen_number);
                const patientData = responseByPatient.data.patientData;
                console.log(patientData);
                setPatient(patientData);
                setImgArray([]);
            } else {
                const response = await getResultDataByReceipt(data.receipt_id);
                resultData = response.data.resultData;
                //const responseByPatient = await getPatientData(data.receipt_id);
                //const patientData = responseByPatient.data.patientData;
                const patientData = response.data.patientData;
                setPatient(patientData);
                const ImgArrayData = response.data.pathData;
                setImgArray(ImgArrayData);
            }
            setResult(resultData);
            setSpecimenIndex();
            setReciptIndex();
            if(props.location.pathname === "/result/specimennum") {
                setSpecimenIndex(rowIndex);
            } else {
                setReciptIndex(rowIndex);
            }
            // const res = await getImagePath(data.receipt_id);
            // const ImgArrayData = res.data.pathData;
            // console.log(ImgArrayData);
            // setImgArray(ImgArrayData);
          }
        }
    }, [props.location.pathname]);

    const realTimeReceiptList = async () => {
        console.log("realTimeReceiptList");
    }
    return (
        <>
            <Header realTimeReceiptList={realTimeReceiptList}/>
            <div className="d-flex">
                <ResultSearchContainer props={props} handleResult={handleResult} ReceiptIndex={ReceiptIndex} SpecimenIndex={SpecimenIndex} saveResult={saveResult} />
                <ResultContainer props={props} result={result} patientData={patient} resultState={resultState} setResultState={setResultState} flag={flag} saveResult={saveResult} setSaveResult={setSaveResult} imgArray={imgArray} resultIndex={resultIndex} setResultIndex={setResultIndex}/>
            </div>
            <DialMenu />
        </>
    );
}

export default Result;