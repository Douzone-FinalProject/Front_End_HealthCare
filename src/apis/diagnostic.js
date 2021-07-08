import axios from "axios";

export function searchSymptomB(symptom_name) {  //증상 검색
    const promise = axios.get("/diagnostic/searchSymptom", {
        params: {
            symptom_name:symptom_name
        }
    });
    return promise;
}

export function searchPatientIdOpinion(patient_id) { //환자 id로 소견 검색
    const promise = axios.get("/diagnostic/searchPatientIdOpinion", {
        params: {
            patient_id:patient_id
        }
    });
    return promise;
}

export function searchDateOpinion(receipt_datetime) { //날짜로 소견 검색
    const promise = axios.get("/diagnostic/searchDateOpinion", {
        params: {
            receipt_datetime:receipt_datetime
        }
    });
    return promise;
}

export function searchPatientNameOpinion(patient_name) { //이름으로 소견 검색
    const promise = axios.get("/diagnostic/searchPatientNameOpinion",{
        params: {
            patient_name:patient_name
        }
    });
    return promise;
}

export function searchPatientIdAndDate(patient_id, receipt_datetime) { //환자id and 날짜로 검색
    const promise = axios.get("/diagnostic/searchPatientIdAndDate",{
        params: {
            patient_id:patient_id,
            receipt_datetime:receipt_datetime
        }
    });
    return promise;
}

export function searchPatientIdAndName(patient_name, patient_id) { //환자id and 이름으로 검색
    const promise = axios.get("/diagnostic/searchPatientIdAndName",{
        params: {
            patient_id:patient_id,
            patient_name:patient_name
        }
    });
    return promise;
}

export function searchPatientNameAndDate(patient_name, receipt_datetime) { //이름 and 날짜로 검색
    const promise = axios.get("/diagnostic/searchPatientNameAndDate",{
        params: {
            patient_name:patient_name,
            receipt_datetime:receipt_datetime
        }
    });
    return promise;
}

export function searchAll(patient_id, patient_name, receipt_datetime) { //이름 and 날짜로 검색
    const promise = axios.get("/diagnostic/searchAll",{
        params: {
            patient_id: patient_id,
            patient_name:patient_name,
            receipt_datetime:receipt_datetime
        }
    });
    return promise;
}

export function createRequestTest(rtList) { //검사 요청시 검사 리스트에 추가
    const promise = axios.post("/diagnostic/createRequestTest", rtList);
    return promise;
}

export function fatientOpinions(patient_id) { //환자 선택시 진료들을 나타냄.
    const promise = axios.get("/diagnostic/fatientOpinions", {params: { patient_id:patient_id }});
    return promise;
}

export function createOpinion(newOpinion) { //소견 작성시
    const promise = axios.post("/diagnostic/createOpinion", newOpinion);
    return promise;
}

export function createMedicines(cmlist) { //소견 작성 + 약 처방
    const promise = axios.post("/diagnostic/createMedicines", cmlist);
    return promise;
}

export function readOpinion(receipt_id) { //소견 읽기
    const promise = axios.get("/diagnostic/readOpinion", {params: { receipt_id:receipt_id }});
    return promise;
}

export function receiptMedicines(receipt_id) { //진료 약품 읽기
    const promise = axios.get("/diagnostic/receiptMedicines", {params: { receipt_id:receipt_id }});
    return promise;
}

export function updateOpinion(handleOpinion) { //소견 수정
    const promise = axios.put("/diagnostic/updateOpinion", handleOpinion);
    return promise;
}

export function updateOpinionOfMedicines(handleMedicines, receipt_id) { //약품 수정
    const promise = axios.post("/diagnostic/updateOpinionOfMedicines", handleMedicines, {params: {receipt_id:receipt_id}});
    return promise;
}

export function updateTestAndReceiptState(receipt_id) { // 검사 소견 수정 완료 후 검사상태 및 진료 상태 변경
    const promise = axios.put("/diagnostic/updateTestAndReceiptState/"+ receipt_id);
    return promise;
}