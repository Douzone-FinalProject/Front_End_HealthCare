// 상태 초기화
const resultData = [

];

// 액션 타입 선언
const SET_ROW = "onePatient"

// 액션 생성 함수 선언
export const createSetDetail = () => {
  return {type: SET_ROW}
}

// 리듀스 선언
const teststateDetailReducer = (state=resultData, action) => {
  console.log("리덕스 실행")
}

export default teststateDetailReducer;