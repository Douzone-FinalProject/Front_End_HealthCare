const initialState = {
  uid: '',
  authToken: ''
};

const SET_UID = "auth/setUid";
const SET_AUTH_TOKEN = "auth/setAuthToken"; 

export const createSetUidAction = (uid) => {
  return {type:SET_UID, uid}
};

export const createSetAuthTokenAction = (authToken) => {
  return {type:SET_AUTH_TOKEN, authToken}
};

const authReducer = (state=initialState, action) => {
  if(action.type === SET_UID){
    return {...state, uid: action.uid};
  }else if(action.type === SET_AUTH_TOKEN){
    return {...state, authToken: action.authToken}; 
  }else{
    return state; 
  }
};

export default authReducer;