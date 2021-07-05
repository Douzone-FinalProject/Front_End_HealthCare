import axios from "axios";

export function login(user) {
    const promise = axios.post("/auth/login", user);
    return promise;
}

// export function staffNameAndRole(user) {
//     const promise = axios.get("/auth/staffNameAndRole", user);
//     return promise;
// }