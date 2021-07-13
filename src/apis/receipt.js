import axios from "axios";

export function getPatientList() {
  return axios.get("/receipt/patients");
}

// 환자 이름 검색 
export function getPatientListByName(patient_name) {
  return axios.get("/receipt/patients/name/"+patient_name);
}

export function getPatientById(patient_id) {
  return axios.get("/receipt/patient/"+patient_id);
}

export function addNewPatient(patient) {
  const promise = axios.post("/receipt/addPatient", patient);  
  return promise;
}

export function deletePatientById(patient_id) {
  return axios.delete("/receipt/patient/"+patient_id);
}

export function updatePatient(patient) {
  return axios.put("/receipt/patient", patient);
}

// 접수 추가 
export function insertReceipt(receipt) {
  console.log('7787 receipt: ', receipt);
  return axios.post("/receipt", receipt);
}

// 접수 리스트 불러오기 
export function getReceiptList() {
  return axios.get("/receipt");
}

// 접수 취소 
export function deleteReceiptById(receipt_id) {
  return axios.delete("/receipt/"+receipt_id);
}

// receipt_state 변경 
export function updateReceipt(receipt_id, nextState) {
  return axios.put("/receipt/"+receipt_id+"/"+nextState);
}