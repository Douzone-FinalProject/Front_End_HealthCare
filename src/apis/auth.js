import axios from "axios";

export async function login(user) {
    const promise = await axios.post("/auth/login", user);
    return promise;
}

// export function staffNameAndRole(user) {
//     const promise = axios.get("/auth/staffNameAndRole", user);
//     return promise;
// }