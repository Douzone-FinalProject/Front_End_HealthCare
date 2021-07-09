import axios from "axios";

export function sendRedisMessage({topic, content}) {
  return axios.get("/message/sendRedisMessage", {params:{topic, content}});
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
