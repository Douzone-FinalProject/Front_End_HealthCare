import { combineReducers } from 'redux';
import receiptReducer from 'redux/receipt-reducer'; 
import authReducer from './auth-reducer';


const rootReducer = combineReducers({
  authReducer,
  receiptReducer
});

export default rootReducer;