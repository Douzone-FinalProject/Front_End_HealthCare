import axios from "axios";

export function login(user) {
    const promise = axios.post("/auth/login", user);
    return promise;
}