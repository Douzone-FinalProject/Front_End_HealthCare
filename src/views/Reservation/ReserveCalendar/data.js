import moment from './src/moment-range';

let lastBno = 9;

// db에서 불러온 데이터 
let db_1 = { 
  reservation_id: '1',
  reservation_name: '채정리',
  reservation_phone: '01011123334',
  reservation_datetime: '2021-06-21 15:00',
}


// 달력에 세팅한 데이터 - 너를 디비라고 일단 생각하기 ... dto  
let reserveList = [
    { content: '15:00 채정리',
      reservation_id: db_1.reservation_id,
      reservation_name: db_1.reservation_name,
      reservation_phone: db_1.reservation_phone,
      reservation_datetime: db_1.reservation_datetime,
      resizable: true,
      range: moment.range(moment(db_1.reservation_datetime), moment(db_1.reservation_datetime).add(30, 'minutes')) 
    },
    { content: '10:00 무좀상',
      reservation_id: 2,
      reservation_name: '무좀상',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-25 10:00',
      resizable: true,
      range: moment.range(moment('2021-06-25 10:00'), moment('2021-06-25 10:00').add(30, 'minutes')) 
    },
    { content: '14:00 임도리',
      reservation_id: 3,
      reservation_name: '임도리',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-25 14:00',
      resizable: true,
      range: moment.range(moment('2021-06-25 14:00'), moment('2021-06-25 14:00').add(30, 'minutes')) 
    }, 
    { content: '16:00 병주캉',
      reservation_id: 4,
      reservation_name: '병주캉',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-25 16:00',
      resizable: true,
      range: moment.range(moment('2021-06-25 16:00'), moment('2021-06-25 16:00').add(30, 'minutes')) 
    },
    { content: '10:30 신용건',
      reservation_id: 5,
      reservation_name: '신용건',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-25 10:30',
      resizable: true,
      range: moment.range(moment('2021-06-25 10:30'), moment('2021-06-25 10:30').add(30, 'minutes')) 
    },
    { content: '10:30 도희희',
      reservation_id: 6,
      reservation_name: '도희희',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-22 10:30',
      resizable: true,
      range: moment.range(moment('2021-06-22 10:30'), moment('2021-06-22 10:30').add(30, 'minutes')) 
    },
    { content: '11:30 좀상민',
      reservation_id: 7,
      reservation_name: '좀상민',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-22 11:30',
      resizable: true,
      range: moment.range(moment('2021-06-22 11:30'), moment('2021-06-22 11:30').add(30, 'minutes')) 
    },
    { content: '14:30 병주캉',
      reservation_id: 8,
      reservation_name: '병주캉',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-23 14:30',
      resizable: true,
      range: moment.range(moment('2021-06-23 14:30'), moment('2021-06-23 14:30').add(30, 'minutes')) 
    },
    
    
      

];

// insert reserve 
export function insertReserve(reserve){
  lastBno++;
  reserve.reservation_id = lastBno;
  reserveList.push(reserve);
}

// delete reserve
export function deleteReserve(rid){
  console.log('delete-----reserve id: ', rid);
  console.log('--', reserveList);
  const index = reserveList.findIndex(reserve => reserve.reservation_id === rid);
  reserveList.splice(index, 1);
  
}


// 전체 예약 테이블 뽑아오기 
export function getReserveList() {
  return reserveList;
};

// 해당 아이디의 예약 한 행 뽑아오기 
export function getReserveById(rid) {
  for(var i=0; i < reserveList.length; i++){
    if (reserveList[i].reservation_id === rid){
      return reserveList[i];
    }
  }
};