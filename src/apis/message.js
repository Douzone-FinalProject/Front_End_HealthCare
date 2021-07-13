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
  return axios.put("/message/" + message_id);
}

export function getChatList(staff_id, staff_login_id) {
  const promise = axios.get("/message/getChatList", {params:{staff_id, staff_login_id}});
  return promise;
}

export function getStaffId(staff_login_id) {
  const promise = axios.get("/message/getStaffId", {params:{staff_login_id}});
  return promise;
}

export function getStaffLoginId(staff_id) {
  const promise = axios.get("/message/getStaffLoginId", {params:{staff_id}});
  return promise;
}