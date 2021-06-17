import {React,  useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko'; 
registerLocale('ko', ko);

const cx = classNames.bind(style);

const ReserveCalendar = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const ExampleCustomInput = ({ value, onClick }) => (
     <button class="example-custom-input" 
          onClick={onClick}> {value} 
    </button> 
  );

  // 월/일 
  const getFormattedDate = (date) => { 
    const month = date.toLocaleDateString('ko-KR', { month: 'long', });
     const day = date.toLocaleDateString('ko-KR', { day: 'numeric', }); 
     return `${month.substr(0, month.length - 1)}/${day.substr(0, day.length - 1)}`; 
  } 
  // 요일 반환 
  const getDayName = (date) => { 
    return date.toLocaleDateString('ko-KR', { weekday: 'long', }).substr(0, 1); 
  } 
  // 날짜 비교시 년 월 일까지만 비교하게끔 
  const createDate = (date) => { 
    return new Date(new Date(date.getFullYear() , date.getMonth() , date.getDate() , 0 , 0 , 0)); 
  }


  return (
    <> 
      <div className={cx("left-component-bottom")}>
        <div>
          예약 가능 날짜 
        </div>
        <div>
          <DatePicker 
            locale="ko" // 달력 한글화 
            selected={startDate} // 날짜 
            state 
            onChange={setStartDate} // 날짜 설정 콜백 함수 
            customInput={<ExampleCustomInput />} 
            minDate={new Date()} // 과거 날짜 disable 
            popperModifiers={{ // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정 
              preventOverflow: { enabled: true, }, 
            }} 
            popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록 
            // 토요일, 일요일 색깔 바꾸기 위함 
            dayClassName={date => 
                getDayName(createDate(date)) === '토' ? "saturday" 
                : 
                getDayName(createDate(date)) === '일' ? "sunday" : undefined 
              } 
            />
        </div>
        <div>
          예약 선택일 : ----일 
        </div>
      </div>
    </>
  );
};

export default ReserveCalendar;