import moment from './src/moment-range';


// db에서 불러온 데이터 
let db_1 = { 
  reservation_id: '1',
  reservation_name: '이채정',
  reservation_phone: '01011123334',
  reservation_datetime: '2021-06-21 15:00',
}



// 달력에 세팅한 데이터 - 너를 디비라고 일단 생각하기 ... dto  
let reserveList = [
    { content: db_1.reservation_datetime+' '+db_1.reservation_name,
      reservation_id: db_1.reservation_id,
      reservation_name: db_1.reservation_name,
      reservation_phone: db_1.reservation_phone,
      reservation_datetime: db_1.reservation_datetime,
      resizable: true,
      range: moment.range(moment(db_1.reservation_datetime), moment(db_1.reservation_datetime).add(30, 'minutes')) 
    },

];

// 전체 예약 테이블 뽑아오기 
export function getReserveList() {
  return reserveList;
};

// 해당 아이디의 예약 한 행 뽑아오기 
export function getReserveById(rid) {
  // for(var i=0; i < reserveList.length(); i++){
  //   if (reserveList[i].reservation_id === rid){
  //     return reserveList[i];
  //   }
  // }
  return { 
    reservation_id: '1',
    reservation_name: '이채정',
    reservation_phone: '01011123334',
    reservation_datetime: '2021-06-21 15:00',
  };
  
};