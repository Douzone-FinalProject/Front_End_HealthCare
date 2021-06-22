import React, {useState, useMemo} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { AutoSizer, List } from 'react-virtualized';
import ReceiptRow from './ReceiptRow';
import { getReceiptList } from './db';

const cx = classNames.bind(style);

const ReceiptInfo = (props) => {
  // state
  const [receipts, setReceipts] = useState(getReceiptList);

  // 하나의 행 UI 만들기 
  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ReceiptRow receipt={receipts[index]} handleClick={props.handleClick}></ReceiptRow>
      </div>
    );
  };

  const getLength = useMemo(() => { 
    console.log('getLength() 실행 ');
    return receipts.length;
  }); 

  return (
    <div className={cx("left-component-bottom")}>
      <div className={cx("search", "d-flex")}>
        <div className={cx("flex-grow-1")}>
          <h5 className={cx("patientlist")}>진료자 리스트</h5>
        </div>
        <span className="ml-5 text-primary">결과 </span>
        <span className="text-primary">{getLength}</span>
      </div>
      {/* 테이블 */}
      <div className={cx("search-result")}>
        <table className="table text-center">
          <thead>
            <tr className={cx("table-header")}>
              <th>차트번호</th><th>성명</th><th>성별</th><th>H.P</th><th>상태</th><th>접수시간</th>
            </tr>
          </thead>
          <tbody>
            <AutoSizer disableHeight>
                {({width, height}) => {
                  return <List width={width} height={230} list={receipts} rowCount={receipts.length} rowHeight={50} rowRenderer={rowRenderer} overscanRowCount={7}></List>
                }}
            </AutoSizer>
          </tbody>
          </table>    
      </div>
    </div>
  );
};

export default ReceiptInfo;