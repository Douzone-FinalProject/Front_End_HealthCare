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

export function searchDateOpinion(receipt_datetime) { //환자 id로 소견 검색
    const promise = axios.get("/diagnostic/searchDateOpinion", {
        params: {
            receipt_datetime:receipt_datetime
        }
    });
    return promise;
}
