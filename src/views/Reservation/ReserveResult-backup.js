import React, {useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { Calendar, Badge, Alert } from 'antd';
import moment from 'moment';

const cx = classNames.bind(style);

const ReserveResult = (props) => {

  const [state, setState] = useState({
    value: moment('2021-03-22'),
    selectedValue: moment('2021-03-23')
  });

  const onSelect = value => {
    setState({
      value, 
      selectedValue: value,
    });
  };

  function onPanelChange(value, mode) {
    console.log('onPanelChange');
    console.log(value.format('YYYY-MM-DD'), mode);

    setState({value});
  }

  // Month 클릭 시  
  function getListData(value) {
    let listData;
    // console.log('value date : ', value.date());
    // console.log('value month : ', value.month());
    // console.log('value year : ', value.year());

    // 6월 
    if(value.month() === 5){
      switch (value.date()) {
        case 8:
          listData = [
            { type: 'success', content: '9:00 도리도 01059067787' },
            { type: 'success', content: '10:00 조병주 01059067787' },
            { type: 'success', content: '11:00 도리도 01059067787' },
            { type: 'success', content: '15:00 조병주 01059067787' },
            { type: 'success', content: '16:00 도리도 01059067787' },
            { type: 'success', content: '17:00 조병주 01059067787' },
            { type: 'success', content: '18:00 도리도 01059067787' },
          ];
          break;
        case 10:
          listData = [
            { type: 'success', content: '9:00 민상조 01059067787' },
            { type: 'success', content: '13:00 병주캉 01059067787' },

          ];
          break;
        case 15:
          listData = [
            { type: 'success', content: '9:00 좀상캉 01059067787' },
            { type: 'success', content: '17:00 임도리 01059067787' },
          ];
          break;
        default:
      }
    }
    return listData || [];
  }
  
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  // Year 클릭 시  
  function getMonthData(value) {
    if (value.month() === 8) {
      return 1395;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  const {value, selectedValue} = state;
  return (
    <>
      <Alert
        message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
      />

      <Calendar 
            value={value} 
            onSelect={onSelect}
            onPanelChange={onPanelChange} 
            dateCellRender={dateCellRender} 
            monthCellRender={monthCellRender}
      />
    </>
    
  );
};

export default ReserveResult;

