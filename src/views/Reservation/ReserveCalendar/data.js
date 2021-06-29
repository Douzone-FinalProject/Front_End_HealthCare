import moment from './src/moment-range';

// db에서 불러온 데이터 
let db_1 = { 
  reservation_id: '1',
  reservation_name: '채정리',
  reservation_phone: '01011123334',
  reservation_reason: '진단검사',
  reservation_datetime: '2021-06-30 15:00',
}


// 달력에 세팅한 데이터 - 너를 디비라고 일단 생각하기 ... dto  
let reserveList = [
    { content: '15:00 채정리',
      reservation_id: db_1.reservation_id,
      reservation_name: db_1.reservation_name,
      reservation_phone: db_1.reservation_phone,
      reservation_datetime: db_1.reservation_datetime,
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment(db_1.reservation_datetime), moment(db_1.reservation_datetime).add(30, 'minutes')) 
    },
    { content: '10:00 무좀상',
      reservation_id: 2,
      reservation_name: '무좀상',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-30 10:00',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-30 10:00'), moment('2021-06-30 10:00').add(30, 'minutes')) 
    },
    { content: '14:00 임도리',
      reservation_id: 3,
      reservation_name: '임도리',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-25 14:00',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-30 14:00'), moment('2021-06-30 14:00').add(30, 'minutes')) 
    }, 
    { content: '16:00 병주캉',
      reservation_id: 4,
      reservation_name: '병주캉',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-28 16:00',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-28 16:00'), moment('2021-06-28 16:00').add(30, 'minutes')) 
    },
    { content: '10:30 신용건',
      reservation_id: 5,
      reservation_name: '신용건',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-29 10:30',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-29 10:30'), moment('2021-06-29 10:30').add(30, 'minutes')) 
    },
    { content: '10:30 도희희',
      reservation_id: 6,
      reservation_name: '도희희',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-30 10:30',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-30 10:30'), moment('2021-06-30 10:30').add(30, 'minutes')) 
    },
    { content: '11:30 좀상민',
      reservation_id: 7,
      reservation_name: '좀상민',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-30 11:30',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-30 11:30'), moment('2021-06-30 11:30').add(30, 'minutes')) 
    },
    { content: '14:30 병주캉',
      reservation_id: 8,
      reservation_name: '병주캉',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-30 14:30',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-30 14:30'), moment('2021-06-30 14:30').add(30, 'minutes')) 
    },
];


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