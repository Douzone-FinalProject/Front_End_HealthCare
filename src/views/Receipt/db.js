// // -------- DB Patients Table ----------
// let lastId = 100;
// let patients = [];
// for (var i = 100; i >= 1; i--) {
//   patients.push({patient_id: i, patient_name: "홍길동"+i, patient_phone: '01059067787', patient_ssn: "970322-2******",patient_sex: "F",           
//       patient_address: "서울시 송파구 중대로 135", patient_detail_address: '12층 L301', patient_zipcode: '50123',
//       patient_blood_type: 'B', patient_guardian_name:'이병주', patient_guardian_phone:'01011223344', patient_guardian_relationship:'부',
//       patient_height: '190', patient_weight: 88, patient_max_bp: 120, patient_min_bp: 80, patient_pulse: 130, patient_register_date: '2021-06-21'})
// }

// export function getPatientList() {  
//   return patients;
// };

// export function getPatientListBySearch(patient_name) {
//   var data = patients.filter(temp => temp.patient_name === patient_name);
//   return data;
// }

// export function insertPatient(patient) {
//   lastId++;
//   patient.patient_id = lastId;
//   var curr = new Date();
//   curr.setDate(curr.getDate());
//   var date = curr.toISOString().substr(0,10);
//   patient.patient_register_date = date;
//   patients.unshift(patient);
// }

// export function getPatient(patient_id) {
//   const patient = patients.find(patient => patient.patient_id === patient_id);
//   console.log('수정된 환자 정보가 나와야 함 : ', patient);
//   return patient;
// }

// // -------- DB Receipt Table ----------
// let receipts = [];

// export function getReceiptList() {  
//   return receipts;
// };

// export function getRidByPatient(pid){ 
//   // Receipt 테이블에서 pid로 rid 뽑아오기 (이미 접수했다면)
//   for(var j=0; j< receipts.length; j++){
//     if(receipts[j].patient_id === pid){
//       return receipts[j].receipt_id;
//     }
//   }
// }