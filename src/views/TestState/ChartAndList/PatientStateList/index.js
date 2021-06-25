import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Table } from 'antd';
import { useState } from "react";
import { useEffect } from "react";
import { getLabData } from "views/TestState/db";


const cx = classNames.bind(style);

function PatientStateList({waitingData, setWaitingData, setChartId}, props) {

  const [waitType, setWaitType] = useState("전체");
  const [state, setState] = useState("검사대기");

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
    const value = event.target.getAttribute('value');
    if (value === "전체" || value === "검사실1" || value === "검사실2" || value === "검사실3") {
      setWaitType(value);
    } else {
      setState(value)
    }
  }

  useEffect(() => {
    getLabData(waitType, state);
  }, [waitType, state])
  return (
    <>
      <div className={cx("d-flex", "justify-content-between", "mt-4")}>
        <div className="d-flex">
          <div className={cx("mr-1")} onClick={handleState} value="전체" checked={true}>전체</div>
          <span>|</span>
          <div className="ml-1" onClick={handleState} value="검사실1">검사실1</div>
          <span>|</span>
          <div className="ml-1" onClick={handleState} value="검사실2">검사실2</div>
          <span>|</span>
          <div className="ml-1" onClick={handleState} value="검사실3">검사실3</div>
        </div>
        <div className="d-flex">
          {/* <div className="mr-1 " onClick={handleState} value="전체" checked={true}>전체</div> */}
          <span>|</span>
          <div className="ml-1 mr-1" onClick={handleState} value="검사대기">검사대기</div>
          <span>|</span>
          <div className="ml-1 mr-1" onClick={handleState} value="검사중">검사접수</div>
          <span>|</span>
          <div className="ml-1" onClick={handleState} value="검사완료">완료</div>
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