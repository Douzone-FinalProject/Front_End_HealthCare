import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { AutoSizer, List } from 'react-virtualized';
import ReceiptRow from './ReceiptRow';
import  Button  from "../common/Button";
import AssignmentIcon from '@material-ui/icons/Assignment';

const cx = classNames.bind(style);


const ReceiptInfo = (props) => {
  // state
  const dbReceiptList = props.receipts;
  const [rid, setRid] = useState();
  const [receiptList, setReceiptList] = useState([]); 

  useEffect(() => {
    setReceiptList(props.receipts);
  }, [props.receipts]);

  // 1. 의사 진료 보내기 
  const sendDiagnosis = (rid) => {
    props.changeReceiptState(rid, '진료중');
  }

  // 2. 수납 전 => 수납 완료 
  const sendPayComplete = (rid) => {
    props.changeReceiptState(rid, '완료');
  }

  const handleClickReceipt = (rid, pid) => {
    // receipt_id 받아서 rid 상태 업데이트 
    setRid(rid);
    props.handleClickReceipt(pid);
  };

  const handleState = (e) => {
    const selectState = e.target.getAttribute('value');

    if(selectState !== '전체'){
      const result = dbReceiptList.filter((receipt) => {
        return receipt.receipt_state === selectState;
      });
      // 필터링한 리스트로 상태 변경 
      setReceiptList(result);
    }else{
      setReceiptList(dbReceiptList);
    }
  }

  /* 하나의 행 UI 만들기 */
  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ReceiptRow receipt={receiptList[index]}
            handleClickReceipt={handleClickReceipt}></ReceiptRow>
      </div>
    );
  };

  return (
    <div className={cx("left-component-bottom")}>
      <div className={cx("search", "d-flex ")}>
        <div className={cx("flex-grow-1 d-flex")}>
            <div className="d-flex">
              <AssignmentIcon  style={{fontSize: '2.2em'}} className="mr-2 mt-1"/> 
              <h5 className={cx("patientlist", "mt-1")}>
                진료자 리스트
              </h5>
            </div>
            <span style={{fontSize:"1.1em", color:"#91a7ff"}} className="ml-5 mt-1 ">
              <span style={{color:"orange"}} className="mr-2" value="대기" onClick={handleState}>대기 1명</span>|
              <span style={{color:"#FF0000"}} className="ml-2 mr-2" value="진료중" onClick={handleState}>진료중 0명</span>|
              <span style={{color:"#3BC9DB"}} className="ml-2 mr-2" value="검사중" onClick={handleState}>검사중 5명</span>|
              <span style={{color:"#37B24D"}} className="ml-2 mr-2" value="수납전" onClick={handleState}>수납전 1명</span>|
              <span style={{color:"#495057"}} className="ml-2 mr-2" value="전체" onClick={handleState}>전체 7명</span>
            </span>
            <div></div>
        </div>
        <div>
          {/* 여기 div는 진료리스트에 있는 환자이고 && 대기상태인 환자를 클릭했을 때만 보여야 함  */}
          {
            props.isWaitState() 
              &&
            <Button type="submit" className={cx("mr-1", "custom-btn-send")} color="#FF9F40" 
                    onClick={() => {return sendDiagnosis(rid)}}>
              <span>{props.patient_id}번 환자 진료 보내기</span>
            </Button>    
          }
          {
            props.isPayState() 
              &&
            <Button type="submit" className={cx("mr-1", "custom-btn-send")} color="#37b24d" 
                    onClick={() => {return sendPayComplete(rid)}}>
              <span>{props.patient_id}번 환자 수납 하기</span>
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