// -------- DB Patients Table ----------
let lastId = 100;
let patients = [];
for (var i = 100; i >= 1; i--) {
  patients.push({patient_id: i, patient_name: "홍길동"+i, patient_phone: '01059067787', patient_ssn: "970322-2******",patient_sex: "F",           
      patient_address: "서울시 송파구 중대로 135", patient_detail_address: '12층 L301', patient_zipcode: '50123',
      patient_blood_type: 'B', patient_guardian_name:'이병주', patient_guardian_phone:'01011223344', patient_guardian_relationship:'부',
      patient_height: '190', patient_weight: 88, patient_max_bp: 120, patient_min_bp: 80, patient_pulse: 130, patient_register_date: '2021-06-21'})
}

export function getPatientList() {  
  return patients;
};

export function insertPatient(patient) {
  lastId++;
  patient.patient_id = lastId;
  patient.patient_register_date = new Date().toLocaleDateString();
  patients.push(patient);
}

export function getPatient(patient_id) {
  console.log('db getPatient: ', patient_id);
  const patient = patients.find(patient => patient.patient_id === patient_id);
  return patient;
}

export function deletePatient(patient_id) {
  console.log('영구 삭제 디비 접근');
  const index = patients.findIndex(patient => patient.patient_id === patient_id);
  patients.splice(index, 1);
}

export function updatePatient(patient) {
  console.log('update db patient');
  const row = patients.find(row => row.patient_id === patient.patient_id);
  // row.btitle = patient.btitle;
  // row.bcontent = patient.bcontent;
}

// -------- DB Receipt Table ----------
let lastId2 = 100;
let receipts = [];
for (var i = 100; i >= 1; i--) {
  receipts.push({
    patient_id: i, patient_name: "홍길동"+i, 
    patient_sex: "F", patient_phone: '01059067787',
    receipt_state: '대기', receipt_datetime: '2020-06-20 13:05:24'})
}

export function getReceiptList() {  
  return receipts;
};

export function insertReceipt(receipt) {
  lastId2++;
  receipt.receipt_id = lastId2;
  receipt.receipt_datetime = new Date().toLocaleDateString();
  receipts.push(receipt);
}

export function deleteReceipt(receipt_id) {
  console.log('접수 삭제 디비 접근');
  const index = receipts.findIndex(receipt => receipt.receipt_id === receipt_id);
  receipts.splice(index, 1);
}
