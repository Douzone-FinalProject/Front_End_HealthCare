import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Table } from 'antd';
import { useState } from "react";
import { useEffect } from "react";
import { getPatientList } from "apis/teststate";

const cx = classNames.bind(style);

function PatientStateList({waitingData, setWaitingData, setReceiptId, waitType, state, setWaitType, setState}, props) {



  const waitingDataColums = [
    {
      title: '순서',
      dataIndex: "order",
      width: 50
    },
    {
      title: '차트번호',
      dataIndex: "patient_id",
      width: 80
    },
    {
      title: '이름',
      dataIndex: "patient_name",
      width: 70
    },
    {
      title: '성별',
      dataIndex: "patient_sex",
      width: 50
    },
    {
      title: '나이',
      dataIndex: "patient_age",
      width: 50
    },
    {
      title: '상태',
      dataIndex: "diagnostic_test_state",
      width: 80,
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
        setReceiptId(data.receipt_id);
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
    async function fetchAndSetWatitingData() {
      setWaitingData(await getPatientList(waitType, state));
    }
    fetchAndSetWatitingData();
  }, [waitType, state, setWaitingData])
  return (
    <>
      <div className={cx("d-flex", "justify-content-between", "mt-2", "flex-2")}>
        <div className={cx("d-flex", "font-size")}>
          <div className={cx(waitType === "전체" ? 'focus' : "", "d-flex", "align-items-center", "mr-1")} onClick={handleState} value="전체">전체</div>
          <div className={cx(waitType === "검사실1" ? 'focus' : "", "d-flex", "align-items-center", "mr-1", "ml-1")} onClick={handleState} value="검사실1">검사실1</div>
          <div className={cx(waitType === "검사실2" ? 'focus' : "", "d-flex", "align-items-center", "mr-1", "ml-1")} onClick={handleState} value="검사실2">검사실2</div>
          <div className={cx(waitType === "검사실3" ? 'focus' : "", "d-flex", "align-items-center", "ml-1")} onClick={handleState} value="검사실3">검사실3</div>
        </div>
        <div className={cx("d-flex", "font-size")}>
          <div className={cx(state === "whole" ? 'focus' : "", "d-flex", "align-items-center", "mr-1")} onClick={handleState} value="whole">전체</div>
          <div className={cx(state === "검사대기" ? 'focus' : "", "d-flex", "align-items-center", "mr-1", "ml-1")} onClick={handleState} value="검사대기">대기</div>
          <div className={cx(state === "검사중" ? 'focus' : "", "d-flex", "align-items-center", "mr-1", "ml-1")} onClick={handleState} value="검사중">검사중</div>
          <div className={cx(state === "검사완료" ? 'focus' : "", "d-flex", "align-items-center", "ml-1")} onClick={handleState} value="검사완료">완료</div>
        </div>
      </div>
      <div className={cx("teststate-table")}>
        <Table className={cx("ant-th", "ant-tbody")} columns={waitingDataColums} dataSource={waitingData} pagination={false} rowKey={record => record.patient_id} onRow={handlePatient}/>
      </div>
    </>
  );
}

export default PatientStateList;