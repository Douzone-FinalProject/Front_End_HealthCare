import axios from "axios";

export function sendMessage({name, phone, content}) {
  return axios.post("/reserve/sms", {name, phone, content});
}