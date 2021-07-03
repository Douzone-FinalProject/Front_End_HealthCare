import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { AutoSizer, List } from 'react-virtualized';
import ReceiptRow from './ReceiptRow';
import  Button  from "../common/Button";
import AssignmentIcon from '@material-ui/icons/Assignment';

const cx = classNames.bind(style);

const ReceiptInfo = (props) => {
  const receiptList = props.receipts;

  // 의사 진료 보내기 
  const sendDiagnosis = (pid) => {
    // pid 환자의 상태를 대기에서 진료중으로 바꾸기 
    props.changeReceiptState(pid);
  }

  /* 하나의 행 UI 만들기 */
  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ReceiptRow receipt={receiptList[index]}
            handleClick={props.handleClick}></ReceiptRow>
      </div>
    );
  };

  return (
    <div className={cx("left-component-bottom")}>
      <div className={cx("search", "d-flex")}>
        <div className={cx("flex-grow-1 d-flex")}>
          <AssignmentIcon style={{fontSize: '2.2em'}} className="mr-2 mt-1"/> 
          <h5 className={cx("patientlist", "mt-1")}>
            진료자 리스트
          </h5>
        </div>
        <div>
          {/* 여기 div는 진료리스트에 있는 환자이고 && 대기상태인 환자를 클릭했을 때만 보여야 함  */}
          {
            props.isWaitState() 
              &&
            <Button type="submit" className={cx("mr-1", "custom-btn-send")} color="#FF9F40" 
                    onClick={() => {return sendDiagnosis(props.patient_id)}}>
              <span>{props.patient_id}번 환자 진료 보내기</span>
            </Button>    
          }
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
                  return <List width={width} height={275} list={receiptList} rowCount={receiptList.length} rowHeight={45} rowRenderer={rowRenderer} overscanRowCount={7}></List>
                }}
            </AutoSizer>
        </div>
      </div>
  );
};

export default ReceiptInfo;