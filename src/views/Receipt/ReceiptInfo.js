import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { AutoSizer, List } from 'react-virtualized';
import ReceiptRow from './ReceiptRow';

const cx = classNames.bind(style);

const ReceiptInfo = (props) => {
  const receiptList = props.receipts;
  console.log('진료자 리스트: ', receiptList);

  /* 하나의 행 UI 만들기 */
  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ReceiptRow receipt={receiptList[index]} handleClick={props.handleClick}></ReceiptRow>
      </div>
    );
  };

  return (
    <div className={cx("left-component-bottom")}>
      <div className={cx("search", "d-flex")}>
        <div className={cx("flex-grow-1")}>
          <h5 className={cx("patientlist")}>진료자 리스트</h5>
        </div>
      </div>
      {/* 테이블 */}
      <div className={cx("search-result")}>
        <div className={cx("table-header", "d-flex ")}>
              <span style={{width:"80px"}}>차트번호</span>
              <span className="flex-fill">성명</span>
              <span className="flex-fill">성별</span>
              <span className="flex-fill">H.P</span>
              <span className="flex-fill">상태</span>
              <span className="flex-fill">접수시간</span>
            </div>
            {/* 리스트에서 하나의 행 컴포넌트는 자식으로 따로 만들기 */}
            <AutoSizer disableHeight>
                {({width, height}) => {
                  return <List width={width} height={230} list={receiptList} rowCount={receiptList.length} rowHeight={50} rowRenderer={rowRenderer} overscanRowCount={7}></List>
                }}
            </AutoSizer>
        </div>
      </div>
  );
};

export default ReceiptInfo;