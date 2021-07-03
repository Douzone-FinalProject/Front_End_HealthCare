const initialState = {
  staff_login_id: '',
  authToken: ''
};

const SET_UID = "auth/setUid";
const SET_AUTH_TOKEN = "auth/setAuthToken"; 

export const createSetUidAction = (staff_login_id) => {
  return {type:SET_UID, staff_login_id}
};

export const createSetAuthTokenAction = (authToken) => {
  return {type:SET_AUTH_TOKEN, authToken}
};

const authReducer = (state=initialState, action) => {
  if(action.type === SET_UID){
    return {...state, staff_login_id: action.staff_login_id};
  }else if(action.type === SET_AUTH_TOKEN){
    return {...state, authToken: action.authToken}; 
  }else{
    return state; 
  }
};

export default authReducer;