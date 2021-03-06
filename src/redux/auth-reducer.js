const initialState = {
  staff_login_id: '',
  authToken: '',
  staff_name: '',
  staff_role: '',
  hospital_id: '',
};

const SET_UID = "auth/setUid";
const SET_AUTH_TOKEN = "auth/setAuthToken"; 
const SET_NAME = "auth/setName";
const SET_ROLE = "auth/setRole"; 
const SET_HOSPITAL = "auth/setHospital"; 

export const createSetUidAction = (staff_login_id) => {
  return {type:SET_UID, staff_login_id}
};

export const createSetAuthTokenAction = (authToken) => {
  return {type:SET_AUTH_TOKEN, authToken}
};

export const createSetNameAction = (staff_name) => {
  return {type:SET_NAME, staff_name}
};

export const createSetRoleAction = (staff_role) => {
  return {type:SET_ROLE, staff_role}
};

export const createSetHospitalAction = (hospital_id) => {
  return {type:SET_HOSPITAL, hospital_id}
};

const authReducer = (state=initialState, action) => {
  if(action.type === SET_UID){
    return {...state, staff_login_id: action.staff_login_id};
  }else if(action.type === SET_AUTH_TOKEN){
    return {...state, authToken: action.authToken}; 
  }else if(action.type === SET_NAME){
    return {...state, staff_name: action.staff_name}
  }else if(action.type === SET_ROLE){
    return {...state, staff_role: action.staff_role}
  }else if(action.type === SET_HOSPITAL){
    return {...state, hospital_id: action.hospital_id}
  }
  else{
    return state; 
  }
};

export default authReducer;