import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Table } from 'antd';
import { useState } from "react";
import { useEffect } from "react";
import { getLabData } from "views/TestState/db";

const cx = classNames.bind(style);

function PatientStateList({waitingData, setWaitingData, setChartId}, props) {

  const [waitType, setWaitType] = useState("전체");
  const [state, setState] = useState("whole");

  const waitingDataColums = [
    {
      title: '순서',
      dataIndex: "order",
      width: '15%'
    },
    {
      title: '차트번호',
      dataIndex: "chart",
      width: '20%'
    },
    {
      title: '이름',
      dataIndex: "name",
      width: '15%'
    },
    {
      title: '성별',
      dataIndex: "sex",
      width: '15%'
    },
    {
      title: '나이',
      dataIndex: "age",
      width: '15%'
    },
    {
      title: '상태',
      dataIndex: "state",
      width: '20%',
      render: state => {
        let color = (state === "검사대기") ? "rgb(255, 99, 132)" : "rgb(255, 99, 132)";
        if (state === "검사중") {
          color = "rgba(255, 205, 86)"
        } else if (state === "검사완료") {
          color = "rgb(75, 192, 192)";
        }
        return <div style={{color: color}}>{state}</div> 
      }
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
    setWaitingData(getLabData(waitType, state, waitingData));
  }, [waitType, state])
  return (
    <>
      <div className={cx("d-flex", "justify-content-between", "mt-2", "flex-2")}>
        <div className={cx("d-flex", "font-size")}>
          <div className={cx(waitType === "전체" ? 'focus' : "", "d-flex", "align-items-center", "mr-1")} onClick={handleState} value="전체" checked={true}>전체</div>
          {/* <span className="d-block">|</span> */}
          <div className={cx(waitType === "검사실1" ? 'focus' : "", "d-flex", "align-items-center", "mr-1", "ml-1")} onClick={handleState} value="검사실1">검사실1</div>
          {/* <span className="d-block">|</span> */}
          <div className={cx(waitType === "검사실2" ? 'focus' : "", "d-flex", "align-items-center", "mr-1", "ml-1")} onClick={handleState} value="검사실2">검사실2</div>
          {/* <span className="d-block">|</span> */}
          <div className={cx(waitType === "검사실3" ? 'focus' : "", "d-flex", "align-items-center", "ml-1")} onClick={handleState} value="검사실3">검사실3</div>
        </div>
        <div className={cx("d-flex", "font-size")}>
          <div className={cx(state === "whole" ? 'focus' : "", "d-flex", "align-items-center", "mr-1")} onClick={handleState} value="whole" checked={true}>전체</div>
          {/* <span>|</span> */}
          <div className={cx(state === "검사대기" ? 'focus' : "", "d-flex", "align-items-center", "mr-1", "ml-1")} onClick={handleState} value="검사대기">대기</div>
          {/* <span>|</span> */}
          <div className={cx(state === "검사중" ? 'focus' : "", "d-flex", "align-items-center", "mr-1", "ml-1")} onClick={handleState} value="검사중">검사중</div>
          {/* <span>|</span> */}
          <div className={cx(state === "검사완료" ? 'focus' : "", "d-flex", "align-items-center", "ml-1")} onClick={handleState} value="검사완료">완료</div>
        </div>
      </div>
      <div className={cx("teststate-table")}>
        <Table className={cx("ant-th", "ant-tbody")} columns={waitingDataColums} dataSource={waitingData} pagination={false} onRow={handlePatient}/>
      </div>
    </>
  );
}

export default PatientStateList;