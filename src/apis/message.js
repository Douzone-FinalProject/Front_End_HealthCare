import axios from "axios";

export function sendRedisMessage({topic, content, sender}, datetime) {
  return axios.get("/message/sendRedisMessage", {params:{topic, content, sender, datetime}});
}

export function getMessageList(staff_login_id) {
  return axios.get("/message/getMessageList", {params:{staff_login_id}});
}

export function insertMessage(message) {
  const promise = axios.post("/message/sendMessage", message);
  return promise;
}

export function getHospitalStaff(staff_login_id) {
  return axios.get("/message/getHospitalStaff", {params:{staff_login_id}});
}

export function deleteMessage(message_id) {
  return axios.delete("/message/" + message_id);
}

export function addNewPatient(patient) {
  const promise = axios.post("/message/addPatient", patient);    //나중에 접수 기능 부분으로 옮겨야함.
  return promise;
}