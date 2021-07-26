import axios from "axios";

// axios.defaults.baseURL = "http://kosa3.iptime.org:50003/api";
axios.defaults.baseURL = "http://localhost:8080/api";
// axios.defaults.baseURL = "http://localhost:8081";

export function addAuthHeader(authToken) {
    axios.defaults.headers.common["authToken"] = authToken;
}

export function removeAuthHeader() {
    delete axios.defaults.headers.common["authToken"];
}