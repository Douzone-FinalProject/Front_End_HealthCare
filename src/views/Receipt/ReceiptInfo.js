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
  const [rid, setRid] = useState(props.receipt_id);
  const [receiptList, setReceiptList] = useState([]); 
  const [receiptColor1, setReceiptColor1] = useState("#91a7ff"); 
  const [receiptColor2, setReceiptColor2] = useState("#91a7ff"); 
  const [receiptColor3, setReceiptColor3] = useState("#91a7ff"); 
  const [receiptColor4, setReceiptColor4] = useState("#91a7ff"); 
  const [receiptColor5, setReceiptColor5] = useState("lightgray");
  const [selectState, setSelectState] = useState("전체");

  useEffect(() => {
    if(selectState === "전체") {
    setReceiptList(props.receipts);
    } else {
      const result = props.receipts.filter((receipt) => {
        return receipt.receipt_state === selectState
      });
      // 필터링한 리스트로 상태 변경 
      setReceiptList(result);
    }
  }, [props.receipts, selectState]);

  // 1. 의사 진료 보내기 
  const sendDiagnosis = () => {
    console.log('----rid: ', props.receipt_id);
    props.changeReceiptState(props.receipt_id, '진료중');
  }

  // 2. 수납 전 => 수납 완료 
  const sendPayComplete = () => {
    props.changeReceiptState(props.receipt_id, '완료');
  }

  const handleClickReceipt = (rid, pid) => {
    // receipt_id 받아서 rid 상태 업데이트 
    console.log('클릭햇을때 rid: ', rid);
    setRid(rid);
    props.handleReceiptId(rid);  //props.receipt_id의 상태를 바꿔야함
    props.handleClickReceipt(pid);
  };

  const handleState = (e) => {
    
    setSelectState(e.target.getAttribute('value'));
    if(e.target.getAttribute('value') === '대기'){
      setReceiptColor1("lightgray");
      setReceiptColor2("#91a7ff");
      setReceiptColor3("#91a7ff");
      setReceiptColor4("#91a7ff");
      setReceiptColor5("#91a7ff");
    }else if(e.target.getAttribute('value') === '진료중'){
      setReceiptColor1("#91a7ff");
      setReceiptColor2("lightgray");
      setReceiptColor3("#91a7ff");
      setReceiptColor4("#91a7ff");
      setReceiptColor5("#91a7ff");
    }else if(e.target.getAttribute('value') === '검사중'){
      setReceiptColor1("#91a7ff");
      setReceiptColor2("#91a7ff");
      setReceiptColor3("lightgray");
      setReceiptColor4("#91a7ff");
      setReceiptColor5("#91a7ff");
    }else if(e.target.getAttribute('value') === '수납전'){
      setReceiptColor1("#91a7ff");
      setReceiptColor2("#91a7ff");
      setReceiptColor3("#91a7ff");
      setReceiptColor4("lightgray");
      setReceiptColor5("#91a7ff");
    }else if(e.target.getAttribute('value') === '전체'){
      setReceiptColor1("#91a7ff");
      setReceiptColor2("#91a7ff");
      setReceiptColor3("#91a7ff");
      setReceiptColor4("#91a7ff");
      setReceiptColor5("lightgray");
    }

    if(e.target.getAttribute('value') !== '전체'){
      const result = dbReceiptList.filter((receipt) => {
        return receipt.receipt_state === e.target.getAttribute('value');
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
            {/*  onClick시에 style={{fontSize:"1.1em", color:"#91a7ff"}}   */}
            <span style={{fontSize:"1.1em"}} className="ml-5 mt-1 ">
              <span style={{color: receiptColor5}} className="mr-2" value="전체" onClick={handleState}>전체</span>|
              <span style={{color: receiptColor1}} className="ml-2 mr-2" value="대기" onClick={handleState}>대기</span>|
              <span style={{color: receiptColor2}} className="ml-2 mr-2" value="진료중" onClick={handleState}>진료중</span>|
              <span style={{color: receiptColor3}} className="ml-2 mr-2" value="검사중" onClick={handleState}>검사중</span>|
              <span style={{color: receiptColor4}} className="ml-2" value="수납전" onClick={handleState}>수납전</span>
            </span>
            <div></div>
        </div>
        <div>
          {/* 여기 div는 진료리스트에 있는 환자이고 && 대기상태인 환자를 클릭했을 때만 보여야 함  */}
          {
            props.isWaitState() 
              &&
            <Button type="submit" className={cx("mr-1", "custom-btn-send")} color="#FF9F40" 
                    onClick={() => {return sendDiagnosis()}}>
              <span>{props.patient_id}번 환자 진료 보내기</span>
            </Button>    
          }
          {
            props.isPayState() 
              &&
            <Button type="submit" className={cx("mr-1", "custom-btn-send")} color="#37b24d" 
                    onClick={() => {return sendPayComplete()}}>
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