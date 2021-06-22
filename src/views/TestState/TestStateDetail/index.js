import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind"
import { Card, Table } from 'antd';
import Button from "../Button";
import { useState } from "react";
import { useContext } from "react";
import TestStateContext from "views/TestState/TestStateContext";

const cx = classNames.bind(style);

function ComName(props) {
  const teststateContext = useContext(TestStateContext);

  // const [resultData, setResultData] = useState();
  const resultItem = [
    {
      title: "증상코드",
      dataIndex: "symptom_id"
    },
    {
      title: "묶음코드",
      dataIndex: "bundle_id"
    },
    {
      title: "검사명",
      dataIndex: "prescription_name"
    },
    {
      title: "검체명",
      dataIndex: "specimen"
    },
    {
      title: "용기",
      dataIndex: "bottle"
    },
    {
      title: "바코드",
      dataIndex: "barcode"
    },
    {
      title: "검사실",
      dataIndex: "lab"
    },
    {
      title: "진료의",
      dataIndex: "doctor"
    },
    {
      title: "검사자",
      dataIndex: "staff"
    },
    {
      title: "상태",
      dataIndex: "state"
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('selectedRowKeys:', selectedRowKeys, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  }
  
  return (
    <Card className={cx("card")}>
      <div className={cx("d-flex", "justify-content-between")}>
        <div className={cx("teststate-patient")}><span><strong>병주캉</strong></span>님: 진단 검사 상세</div>
        <div className="d-flex">
          <Button color={'rgb(255, 99, 132)'}>바코드 출력</Button>
          <Button color={'rgb(255, 159, 64)'}>접수 취소</Button>
          <Button color={'rgb(54, 162, 235)'}>검사 완료</Button>
          <Button color={'rgb(153, 102, 255)'}>엑셀 저장</Button>
        </div>
      </div>
      <div className={cx("teststate-table")}>
        <Table columns={resultItem} dataSource={teststateContext.resultData} pagination={false} rowKey="doctor" rowSelection={{...rowSelection}}/>
      </div>
    </Card>
  );
}

export default ComName;