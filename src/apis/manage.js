import axios from "axios";

export function staffList(hospital_id) {  //스태프 리스트
    const promise = axios.get("/manage/staffList", {
        params: {
            hospital_id:hospital_id
        }
    });
    return promise;
}

export function addNewEmployee(employee) {
    const promise = axios.post("/manage/addNewEmployee", employee);  
    return promise;
}

export function readStaff(staff_id) {
    const promise = axios.get("/manage/readStaff",{params:{ staff_id : staff_id }});  
    return promise;
}

export function deleteStaf(staff_id) {
    return axios.delete("/manage/staff/"+staff_id);
}

export function receiptCount() { 
    const promise = axios.get("/manage/receiptCount");
    return promise;
}

export function testCount() { 
    const promise = axios.get("/manage/testCount");
    return promise;
}

export function medicinePresCount() { 
    const promise = axios.get("/manage/medicinePresCount");
    return promise;
}

export function updateStaffNoPw(nowStaff) { // 비번x 수정
    const promise = axios.put("/manage/updateStaffNoPw", nowStaff);
    return promise;
}

export function updateStaff(nowStaff) { // 비번o 수정
    const promise = axios.put("/manage/updateStaff", nowStaff);
    return promise;
}

//혈액형 수
export function aCount() { 
    const promise = axios.get("/manage/aCount");
    return promise;
}

export function bCount() { 
    const promise = axios.get("/manage/bCount");
    return promise;
}

export function abCount() { 
    const promise = axios.get("/manage/abCount");
    return promise;
}

export function oCount() { 
    const promise = axios.get("/manage/oCount");
    return promise;
}

export function rh_aCount() { 
    const promise = axios.get("/manage/rh_aCount");
    return promise;
}

export function rh_bCount() { 
    const promise = axios.get("/manage/rh_bCount");
    return promise;
}

export function rh_abCount() { 
    const promise = axios.get("/manage/rh_abCount");
    return promise;
}

export function rh_oCount() { 
    const promise = axios.get("/manage/rh_oCount");
    return promise;
}

//직원, 비활성화 수

export function staffCount() { 
    const promise = axios.get("/manage/staffCount");
    return promise;
}

export function disableStaffCount() { 
    const promise = axios.get("/manage/disableStaffCount");
    return promise;
}