import axios from "axios";

// 약품검색 
export function searchMedicine(word) {
    const promise = axios.get(`/auth/login/${word}`);
    return promise;
}