// 1.상태 초기값 선언 
const initialState = {
  receipt_state: "대기"
};

// 2.액션 타입 선언 
const SET_RECEIPT = "receipt/setReceipt";

// 3.액션 생성 함수 선언 
export const createSetReceiptAction = (receipt_state) => {
  return {type:SET_RECEIPT, receipt_state}
};

// 4.리듀스 선언 
const receiptReducer = (state=initialState, action) => {
  if(action.type === SET_RECEIPT){
    return {receipt_state: action.receipt_state};
  }else{
    return state; // 원래 상태 리턴 
  }
};

export default receiptReducer;