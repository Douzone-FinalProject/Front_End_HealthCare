// import { CSVLink, CSVDownload } from "react-csv";
import xlsx from 'xlsx';
import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind"
import Swal from 'sweetalert2';
import { Card, Table } from 'antd';
import Button from "../Button";
import { useState } from "react";
import { useEffect } from 'react';
import { changeState, getTestStateDetailData, getChartData, getLabPatient, getPatientName, barcode, deleteBarcode } from "views/TestState/db";

const cx = classNames.bind(style);

function TestStateDetail({chartId, resultData, setResultData, waitingData, setWaitingData, setPatientNames, setChartData1}, props) {

  const [patientName, setPatientName] = useState();
  const resultItem = [
    {
      title: "증상코드",
      dataIndex: "symptom_id",
      width: 80,
    },
    {
      title: "묶음코드",
      dataIndex: "bundle_id",
      width: 80,
    },
    {
      title: "검사명",
      dataIndex: "prescription_name",
      width: 300,
    },
    {
      title: "검체명",
      dataIndex: "specimen",
      width: 120,
    },
    {
      title: "용기",
      dataIndex: "bottle",
      width: 150,
    },
    {
      title: "바코드",
      dataIndex: "barcode",
      width: 150,
    },
    {
      title: "검사실",
      dataIndex: "lab",
      width: 80,
    },
    {
      title: "진료의",
      dataIndex: "doctor",
      width: 80,
    },
    {
      title: "검사자",
      dataIndex: "staff",
      width: 80,
    },
    {
      title: "상태",
      dataIndex: "state",
      width: 100,

      render: state => {
        let color = (state === "검사대기") ? "rgb(255, 99, 132)" : "rgb(255, 99, 132)";
        if (state === "검사접수") {
          color = "rgba(255, 205, 86)"
        } else if (state === "검사완료") {
          color = "rgb(75, 192, 192)";
          // color = "rgb(54, 162, 235)";
        }
        return <div style={{color: color}}>{state}</div> 
      }
    }
  ]
  
  const [rows, setRows] = useState([]);

  const rowSelection = {  
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log('selectedRowKeys:', selectedRowKeys, 'selectedRows: ', selectedRows);
      setRows([...selectedRows])
    },
    // onSelect: (record, selected, selectedRows) => {
    //   // console.log(record);
    //   // console.log(record, selected, selectedRows);
    // },
    // onSelectAll: (selected, selectedRows, changeRows) => {
    //   // console.log(selected, selectedRows, changeRows);
    // },
  }

  useEffect(() => {
    if (chartId) {
      setResultData(getTestStateDetailData(chartId));
      setPatientName(getPatientName(chartId));
    }
  }, [chartId])

  
  const handleBarcode =  () => {
    if (rows.length !== 0) {
      setRows(rows.map(row => {
        row.state = "검사접수";
        return row;
      }));
      setWaitingData(changeState(waitingData, resultData, chartId));
      setPatientNames(getLabPatient(resultData, chartId));
      setChartData1(getChartData(waitingData));
      setResultData(barcode(resultData, rows));
    } else {
      Swal.fire(
        "환자 선택 후 검사를 선택해주세요!!!",
        '',
        'question'
      )
    }
  }

  const handleCancel = () => {
    if (rows.length !== 0) {
      setRows(rows.map(row => {
        row.state = "검사대기";
        return row;
      }));
      setWaitingData(changeState(waitingData, resultData, chartId));
      setChartData1(getChartData(waitingData));
      setResultData(deleteBarcode(resultData, rows));
    } else {
      Swal.fire(
        "환자 선택 후 검사를 선택해주세요!!!",
        '',
        'question'
      )
    }
  }

  const handleComplete = () => {
    if (rows.length !== 0) {
      setRows(rows.map(row => {
        row.state = "검사완료";
        return row;
      }))
      setWaitingData(changeState(waitingData, resultData, chartId));
      setPatientNames(getLabPatient(resultData, chartId));
      setChartData1(getChartData(waitingData));
    } else {
      Swal.fire(
        "환자 선택 후 검사를 선택해주세요!!!",
        '',
        'question'
      )
    }
  }

  const saveExcel = () => {
    // 엑셀저장
    // Json 배열의 내용을 엑셀의 시트로 변환
    if (resultData.length !== 0) {
      const ws = xlsx.utils.json_to_sheet(resultData);
      // {c:/열/, r:/행/}
      ['증상코드', '묶음코드', '검사명', '검체명', '용기', '바코드', '검사실', '진료의', '검사자'].forEach((x, idx) => {
        const cellAdd = xlsx.utils.encode_cell({c: idx, r: 0});
        ws[cellAdd].v = x
      });
  
      // 열 숨기기
      ws['!cols'] = [];
      ws['!cols'][9] = { hidden: true };
  
      // 워크북 객체를 생성, 워크시트를 묶어주는 부분
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "sheet1");
    
      // 파일저장
      xlsx.writeFile(wb, `${chartId}-${patientName}.xlsx`);
    } else {
      Swal.fire(
        "환자를 선택해주세요!!!",
        '',
        'question'
      )
    }

  }

  return (
    <Card className={cx("card")}>
      <div className={cx("d-flex", "justify-content-between")}>
        <div className={cx("teststate-patient")}><span><strong>{patientName}</strong></span>님: 진단 검사 상세</div>
        <div className="d-flex">
          <Button color={'rgb(255, 99, 132)'} onClick={handleBarcode}>바코드 출력</Button>
          <Button color={'rgb(255, 159, 64)'} onClick={handleCancel}>접수 취소</Button>
          <Button color={'rgb(54, 162, 235)'} onClick={handleComplete}>검사 완료</Button>
          <Button color={'rgb(153, 102, 255)'} onClick={saveExcel}>엑셀 저장</Button>
        </div>
      </div>
      <div className={cx("teststate-table")}>
        <Table className={cx("ant-th", "ant-tbody")} tableLayout="auto" columns={resultItem} dataSource={resultData} pagination={false} rowKey={record => chartId + "-" + record.bundle_id} rowSelection={{...rowSelection}}/>
      </div>
    </Card>
  );
}

export default TestStateDetail;