import { getReservationById } from 'apis/reservation';
import moment from './src/moment-range';

let reservation = {};
const handleReservationLById = async (rid) => {
  try{
    const response = await getReservationById(rid);
    const db = response.data.reservation;
    reservation = {...db, 
                  resizable: true, 
                  range: moment.range(moment(db.reservation_datetime), 
                        moment(db.reservation_datetime).add(30, 'minutes'))
    }
    console.log('reservation: ', reservation);

  }catch(error){
    console.log(error);
  }
};

// 해당 아이디의 예약 한 행 뽑아오기 
export function getReserveById(rid) {
  handleReservationLById(rid);
  return reservation;
};


//------ 나중에 지울 코드 싹다 
let reserveList1 = [
    { content: '10:00 무좀상 진단검사',
      reservation_id: 2,
      reservation_name: '무좀상',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-30 10:00',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-30 10:00'), moment('2021-06-30 10:00').add(30, 'minutes')) 
    },
    { content: '14:00 임도리 진단검사',
      reservation_id: 3,
      reservation_name: '임도리',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-25 14:00',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-30 14:00'), moment('2021-06-30 14:00').add(30, 'minutes')) 
    }, 
    { content: '16:00 병주캉 진단검사',
      reservation_id: 4,
      reservation_name: '병주캉',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-28 16:00',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-28 16:00'), moment('2021-06-28 16:00').add(30, 'minutes')) 
    },
    { content: '10:30 신용건 진단검사',
      reservation_id: 5,
      reservation_name: '신용건',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-29 10:30',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-29 10:30'), moment('2021-06-29 10:30').add(30, 'minutes')) 
    },
    { content: '10:30 도희희 진단검사',
      reservation_id: 6,
      reservation_name: '도희희',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-30 10:30',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-30 10:30'), moment('2021-06-30 10:30').add(30, 'minutes')) 
    },
    { content: '11:30 좀상민 진단검사',
      reservation_id: 7,
      reservation_name: '좀상민',
      reservation_phone: '01012312312',
      reservation_datetime: '2021-06-30 11:30',
      reservation_reason: '진단검사',
      resizable: true,
      range: moment.range(moment('2021-06-30 11:30'), moment('2021-06-30 11:30').add(30, 'minutes')) 
    },
    { content: '14:30 병주캉 진단검사',
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
  return reserveList1;
};

