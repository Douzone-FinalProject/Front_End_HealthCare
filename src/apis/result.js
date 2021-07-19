import axios from "axios";

export function getReceiptData(patient_name, receipt_datetime) {
  const promise = axios.get("/result/getReceiptData", {params:{patient_name, receipt_datetime}});
  return promise;
}

export function getDiagnosticData(patient_name, receipt_datetime) {
  const promise = axios.get("/result/getDiagnosticData", {params:{patient_name, receipt_datetime}});
  return promise;
}

export function getResultDataByReceipt(receipt_id) {
  const promise = axios.get("/result/getResultDataByReceipt", {params:{receipt_id}});
  return promise;
}

export function getResultDataBySpecimen(diagnostic_specimen_number) {
  const promise = axios.get("/result/getResultDataBySpecimen", {params:{diagnostic_specimen_number}});
  return promise;
}

export function getPatientData(receipt_id) {
  const promise = axios.get("/result/getPatientData", {params:{receipt_id}});
  return promise;
}

export function getPatientDataBySpecimen(diagnostic_specimen_number) {
  const promise = axios.get("/result/getPatientDataBySpecimen", {params:{diagnostic_specimen_number}});
  return promise;
}

export function getSpecimenData(diagnostic_specimen_number) {
  const promise = axios.get("/result/getSpecimenData", {params:{diagnostic_specimen_number}});
  return promise;
}

export function getSpecimenDataByNull(diagnostic_list_id) {
  const promise = axios.get("/result/getSpecimenDataByNull", {params:{diagnostic_list_id}});
  return promise;
}

export function insertResultData(receipt_id) {
  const promise = axios.post("/result/insertResultData", receipt_id);
  return promise;
}

export function insertResultDataByNew(receipt_id) {
  const promise = axios.post("/result/insertResultDataByNew", receipt_id);
  return promise;
}

export function updateResultDataBySpecimen(result) {
  const promise = axios.put("/result/updateResultDataBySpecimen", result);
  return promise;
}

export function updateResultDataByReceipt(result) {
  const promise = axios.put("/result/updateResultDataByReceipt", result);
  return promise;
}

export function getCheckPreviousResult(receipt_id) {
  const promise = axios.get("/result/getCheckPreviousResult", {params:{receipt_id}});
  return promise;
}

export function getImagePath(receipt_id) {
  const promise = axios.get("/result/getImagePath", {params:{receipt_id}});
  return promise;
}

export function getReceiptDataByRecieptId(receipt_id) {
  const promise = axios.get("/result/getReceiptDataByRecieptId", {params:{receipt_id}});
  return promise;
}

export function getDiagnosticDataByReceiptId(receipt_id) {
  const promise = axios.get("/result/getDiagnosticDataByReceiptId", {params:{receipt_id}});
  return promise;
}