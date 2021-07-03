const initialState = {
  receiptList: []
};

const SET_RECEIPTLIST = "healthcare/setReceiptList";

export const createSetReceiptListAction = (receiptList) => {
  return {type:SET_RECEIPTLIST, receiptList}
};

const receiptReducer = (state=initialState, action) => {
  if(action.type === SET_RECEIPTLIST){
    return {receiptList: action.receiptList};
  }else{
    return state; 
  }
};

export default receiptReducer;