import axios from "axios";

export function getReservations() {
  return axios.get("/reserve");
}

export function getReservationById(reservation_id) {
  return axios.get("/reserve/id/"+reservation_id);
}

export function getReservationsByName(patient_name) {
  return axios.get("/reserve/name/"+patient_name);
}

export function insertReservation(reservation) {
  return axios.post("/reserve", reservation);
}

export function deleteReservationById(reservation_id) {
  return axios.delete("/reserve/"+reservation_id);
}

export function updateReservation(reservation) {
  return axios.put("/reserve", reservation);
}

export function checkPatientExist(name, phone){
  return axios.get("/reserve/checkPatient/"+name+"/"+phone);
}
