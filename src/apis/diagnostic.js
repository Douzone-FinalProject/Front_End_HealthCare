import axios from "axios";

export function searchSymptomB(symptom_name) {
    const promise = axios.get("/diagnostic/searchSymptom", {
        params: {
            symptom_name:symptom_name
        }
    });
    return promise;
}