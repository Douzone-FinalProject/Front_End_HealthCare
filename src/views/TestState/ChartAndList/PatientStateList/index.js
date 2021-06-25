import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Table } from 'antd';
// import Table from "views/TestState/Table";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import TestStateContext from "views/TestState/TestStateContext";

const cx = classNames.bind(style);

function PatientStateList({waitingData, setWaitingData, setChartId}, props) {
  // const teststateContext = useContext(TestStateContext);

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

  const handlePatient = (data, rowIndex) => {
    return {
      onClick: (event) => { 
        setChartId(data.chart)
      }
    }
  }

  const handleState = (event) => {
    const value = event.currentTarget.getAttribute('value');
    if (value === "검사" || value === "진료") {
      setWaitType(value);
    } else {
      setState(value)
    }
  }

  useEffect(() => {
    return () => {
      setWaitingData([
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
      ])
    }
  }, [waitType, state])
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
        {/* <Table columns={waitingDataColums} datas={waitingData} /> */}
      </div>
    </>
  );
}

export default PatientStateList;