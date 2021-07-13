 import xlsx from 'xlsx';
import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind"
import Swal from 'sweetalert2';
import { Card, Table } from 'antd';
import Button from "../Button";
import { useRef, useState } from "react";
import { useEffect } from 'react';
import { getTestStateDetailList, updateStateDetail, updateReceiptState, getPatientName } from "apis/teststate"; 
import CameraModal from "./CameraModal";
import { getCheckPreviousResult, insertResultData, insertResultDataByNew } from "apis/result";
import { sendRedisMessage } from 'apis/message';
import { Message } from '@material-ui/icons';

const cx = classNames.bind(style);

function TestStateDetail({receiptId, detailData, setDetailData, pubMessage}, props) {

  const [patientName, setPatientName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      dataIndex: "bundle_name",
      width: 300,
    },
    {
      title: "검체명",
      dataIndex: "bundle_specimen",
      width: 120,
    },
    {
      title: "용기",
      dataIndex: "bundle_bottle",
      width: 150,
    },
    {
      title: "검체번호",
      dataIndex: "diagnostic_specimen_number",
      width: 150,
    },
    {
      title: "검사실",
      dataIndex: "bundle_lab",
      width: 80,
    },
    {
      title: "진료의",
      dataIndex: "doctor",
      width: 80,
    },
    {
      title: "검사자",
      dataIndex: "staff_name",
      width: 80,
    },
    {
      title: "상태",
      dataIndex: "diagnostic_list_state",
      width: 100,

      render: diagnostic_list_state => {
        let color = (diagnostic_list_state === "검사대기") ? "rgb(255, 99, 132)" : "rgb(255, 99, 132)";
        if (diagnostic_list_state === "검사접수") {
          color = "rgba(255, 205, 86)"
        } else if (diagnostic_list_state === "검사완료") {
          color = "rgb(75, 192, 192)";
          // color = "rgb(54, 162, 235)";
        }
        return <div style={{color: color}}>{diagnostic_list_state}</div> 
      }
    }
  ]
  
  const [rows, setRows] = useState([]);
  const [rowKeys, setRowKeys] = useState([]);
  const [bundleSpecimens, setBundleSpeciemens] = useState([]);
  const [complete, setComplete] = useState('false');

    const rowSelection = {  
      onChange: (selectedRowKeys, selectedRows) => {
      // console.log('selectedRowKeys:', selectedRowKeys, 'selectedRows: ', selectedRows);
      setRows([...selectedRows])
      setRowKeys([...selectedRowKeys])
      setBundleSpeciemens(selectedRows.map(row => row.bundle_specimen))
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
    if (receiptId) {
      console.log("2")
      async function fetchAndSetDetailData() {
        setPatientName(await getPatientName(receiptId));
        setDetailData(await getTestStateDetailList(receiptId));
      }
      // setPatientName(getPatientName(receiptId));
      fetchAndSetDetailData();
    }
  }, [receiptId])

  useEffect(() => {
    let completeCount = 0;
    for (let detail of detailData) {
      if (detail.diagnostic_list_state === "검사완료") {
        completeCount++;
      }
    }
    if (detailData.length !== 0 && detailData.length === completeCount) {
      setComplete('true');
    } else {
      setComplete('false');
    }
  }, [detailData])
  
  
  const handleBarcode = async () => {
    if (rowKeys.length !== 0) {
      await updateStateDetail(rowKeys, "검사접수", sessionStorage.getItem("staff_login_id"), bundleSpecimens, receiptId);
      // setDetailData(await getTestStateDetailList(receiptId));
      await sendRedisMessage(pubMessage);
      if (rows[0].bundle_name === "MRI" || rows[0].bundle_name === "CT") {
        setIsModalVisible(!isModalVisible); // 모달 창 열기/닫기
      }
    } else {
      Swal.fire(
        "환자 선택 후 검사를 선택해주세요!!!",
        '',
        'question'
      )
    }
  }

  const handleCancel = async () => {
    if (rowKeys.length !== 0) {
      await updateStateDetail(rowKeys, "검사대기", sessionStorage.getItem("staff_login_id"), bundleSpecimens, receiptId);
      await sendRedisMessage(pubMessage);
    } else {
      Swal.fire(
        "환자 선택 후 검사를 선택해주세요!!!",
        '',
        'question'
      )
    }
  }

  const handleComplete = async () => {
    if (rowKeys.length !== 0) {
    await updateStateDetail(rowKeys, "검사완료", sessionStorage.getItem("staff_login_id"), bundleSpecimens, receiptId);
    await sendRedisMessage(pubMessage);
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
    if (detailData.length !== 0) {
      const ws = xlsx.utils.json_to_sheet(detailData);
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
      xlsx.writeFile(wb, `${receiptId}-${patientName}.xlsx`);
    } else {
      Swal.fire(
        "환자를 선택해주세요!!!",
        '',
        'question'
      )
    }

  }

  const handleReceiptState = async (event) => {
    console.log(receiptId);
    await updateReceiptState(event.target.value, receiptId);
    const response = await getCheckPreviousResult(receiptId);
    console.log(response.data.PrevResultData);
    if(response.data.PrevResultData.length === 0 ) {
      await insertResultDataByNew({receipt_id: receiptId});
    } else {
      await insertResultData({receipt_id: receiptId});
    }
    await sendRedisMessage({
      topic:'/'+ sessionStorage.getItem("hospital_id") +'/#',
      content:'ChangeReceiptState',
    });
  }

  const handleModal = () => { //모달 창 열기, 닫기      
    setIsModalVisible(!isModalVisible); // 모달 창 열기/닫기
  }


  return (
    <Card className={cx("card")}>
      <div className={cx("d-flex", "justify-content-between")}>
        <div className={cx("teststate-patient")}><span><strong>{patientName}</strong></span>님: 진단 검사 상세</div>
        <div className="d-flex">
          {complete === 'true' ?
          (
          <>
          <Button color={'#ffd43b'} onClick={handleReceiptState} value="수납전">집으로</Button>
          <Button color={'#69db7c'} onClick={handleReceiptState} value="대기">의사로</Button>
          </>
          )
          :
          <></>
          }
          <Button color={'rgb(255, 99, 132)'} onClick={handleBarcode}>바코드 출력</Button>
          <Button color={'rgb(255, 159, 64)'} onClick={handleCancel}>접수 취소</Button>
          <Button color={'rgb(54, 162, 235)'} onClick={handleComplete}>검사 완료</Button>
          <Button color={'rgb(153, 102, 255)'} onClick={saveExcel}>엑셀 저장</Button>
        </div>
      </div>
      <div className={cx("teststate-table")}>
        <Table className={cx("ant-th", "ant-tbody")} columns={resultItem} dataSource={detailData} pagination={false} rowKey={record => record.diagnostic_list_id} rowSelection={{...rowSelection}}/>
      </div>
      {
        isModalVisible && (<CameraModal handleModal={handleModal} receiptId={receiptId} patientName={patientName}/>)
      }
    </Card>
  );
}

export default TestStateDetail;