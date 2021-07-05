import axios from "axios";

export function getPatientList() {
  return axios.get("/receipt/patients");
}

export function getPatientById(patient_id) {
  return axios.get("/receipt/patient/"+patient_id);
}

export function deletePatientById(patient_id) {
  return axios.delete("/receipt/patient/"+patient_id);
}

export function updatePatient(patient) {
  return axios.put("/receipt/patient", patient);
}

// 접수 추가 
export function insertReceipt(receipt) {
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

// 진료 보내기 : 대기 => 진료중 
export function updateReceipt(patient_id) {
  console.log('1231111----sd: ', patient_id);
  return axios.put("/receipt/"+patient_id);
}