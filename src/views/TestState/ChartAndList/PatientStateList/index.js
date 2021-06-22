import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Table } from 'antd';
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import TestStateContext from "views/TestState/TestStateContext";

const cx = classNames.bind(style);

function PatientStateList(props) {
  const teststateContext = useContext(TestStateContext);

  const [waitType, setWaitType] = useState("검사");
  const [state, setState] = useState("전체");

  const waitingDataColums = [
    {
      title: '순서',
      dataIndex: "order",
    },
    {
      title: '차트번호',
      dataIndex: "chart",
    },
    {
      title: '이름',
      dataIndex: "name",
    },
    {
      title: '성별',
      dataIndex: "sex",
    },
    {
      title: '나이',
      dataIndex: "age",
    },
    {
      title: '상태',
      dataIndex: "state",
    }
  ]

  const [waitingData, setWaitingData] = useState([
    {
      key: 1,
      order: 1,
      chart: 1000101,
      name: '병주캉',
      sex: "?",
      age: "900",
      state: "검사중",
    },
    {
      key: 2,
      order: 2,
      chart: 1010215,
      name: '채정리',
      sex: "여",
      age: "3",
      state: "대기"
    },
    {
      key: 3,
      order: 3,
      chart: 1001515,
      name: '민상조',
      sex: "남",
      age: "27",
      state: "대기"
    }
  ]);

  const resultData1 = [
    {
      symptom_id: "STS335",
      bundle_id: "H1001",
      prescription_name: "Hematocrit",
      specimen: "Blood/DeTA tube",
      bottle: "EDTA",
      barcode: "EDTABNP1",
      lab: "검사실2",    
      doctor: "닥터후",
      staff: "스펀지밥",
      state: "검사대기"
    },
    {
      symptom_id: "STS335",
      bundle_id: "M1515",
      prescription_name: "Mean Cell Volume",
      specimen: "Blood/DeTA tube",
      bottle: "EDTA",
      barcode: "EDTABNP2",
      lab: "검사실1",    
      doctor: "닥터 스트레인지",
      staff: "별가",
      state: "검사접수"
    },
    {
      symptom_id: "STS335",
      bundle_id: "H1232",
      prescription_name: "Hemoglobin",
      specimen: "Blood/DeTA tube",
      bottle: "EDTA",
      barcode: "EDTABNP3",
      lab: "검사실3",    
      doctor: "익준",
      staff: "깐깐징어",
      state: "검사완료"
    },
    {
      symptom_id: "UDR",
      bundle_id: "D0175",
      prescription_name: "Diabets melitus Test",
      specimen: "Spot urine/cup",
      bottle: "Urine",
      barcode: "Urine",
      lab: "검사실2",    
      doctor: "낭만닥터",
      staff: "야나두",
      state: "검사대기"
    },
  ]

  const handlePatient = (data, rowIndex) => {
    return {
      onClick: (event) => {
        teststateContext.setResultData(
          resultData1
        )
      }
    }
  }

  const handleState = () => {
    
  }
  return (
    <>
      <div className={cx("d-flex", "justify-content-between", "mt-4")}>
        <div className="d-flex">
          <div className={cx("mr-1")} onClick={handleState} value="검사" checked={true}>검사대기</div>
          <span>|</span>
          <div className="ml-1" onClick={handleState} value="진료">진료대기</div>
        </div>
        <div className="d-flex">
          <div className="mr-1 " onClick={handleState} value="전체" checked={true}>전체</div>
          <span>|</span>
          <div className="ml-1 mr-1" onClick={handleState} value="대기">대기</div>
          <span>|</span>
          <div className="ml-1 mr-1" onClick={handleState} value="검사중">검사중</div>
          <span>|</span>
          <div className="ml-1" onClick={handleState} value="완료">완료</div>
        </div>
      </div>
      <div className={cx("teststate-table")}>
        <Table columns={waitingDataColums} dataSource={waitingData} pagination={false} onRow={handlePatient}/>
      </div>
    </>

  );
}

export default PatientStateList;