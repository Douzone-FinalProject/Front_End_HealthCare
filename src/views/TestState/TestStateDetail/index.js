 import xlsx from 'xlsx';
import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind"
import Swal from 'sweetalert2';
import { Card, Table } from 'antd';
import Button from "../Button";
import { useRef, useState } from "react";
import { useEffect } from 'react';
import { getTestStateDetailList, updateStateDetail, updateReceiptState, getPatientName, getReceiptState } from "apis/teststate"; 
import { paymentBefore } from "apis/diagnostic"; 
import CameraModal from "./CameraModal";
import { getCheckPreviousResult, insertResultData, insertResultDataByNew } from "apis/result";
import { sendRedisMessage } from 'apis/message';

const cx = classNames.bind(style);

function TestStateDetail({receiptId, detailData, setDetailData, pubMessage, waitType, state}, props) {

  const [patientName, setPatientName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [receiptState, setReceiptState] = useState();
    const resultItem = [
    {
      title: "증상코드",
      dataIndex: "symptom_id",
      width: 90,
    },
    {
      title: "묶음코드",
      dataIndex: "bundle_id",
      width: 90,
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
      dataIndex: "doctor_name",
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
      width: 90,

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

  const [bundleLab, setBundleLab] = useState();
  const [hide, setHide] = useState(true);
  const rowSelection = {
    hideSelectAll: waitType === "전체" ? hide : false,
    onChange: (selectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys:', selectedRowKeys, 'selectedRows: ', selectedRows);    
    setRows([...selectedRows])
    setRowKeys([...selectedRowKeys])
    setBundleSpeciemens(selectedRows.map(row => row.bundle_specimen))
  },   
  getCheckboxProps: (record) => {
    if (waitType === "전체") {
      return ({
        disabled: (bundleLab && record.bundle_lab !== bundleLab) || receiptState === "검사완료" || receiptState === "대기" || receiptState === "수납전"
      })
    } else {
      return ({
        disabled: record.bundle_lab !== waitType || receiptState === "검사완료" || receiptState === "대기" || receiptState === "수납전",
        bundle_lab: record.bundle_lab
      })
    }
  },
  onSelect: (record, selected, selectedRows, nativeEvent) => {
    if (selected) {
      if (waitType === "전체") {
        rowSelection.hideSelectAll = setHide(false);
      }
      setBundleLab(selectedRows[0].bundle_lab);
      rowSelection.getCheckboxProps(record)
    } else {
      if (selectedRows.length === 0) {
        setBundleLab("");
        rowSelection.getCheckboxProps(record)
        if (waitType === "전체") {
          rowSelection.hideSelectAll = setHide(true);
        }
      }
    } 
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    if (selected) {
      if (waitType === "전체") {
      }
    } else {
      if (waitType === "전체") {
        rowSelection.hideSelectAll = setHide(true);
        setBundleLab("");
      }
    }
  }
}

  useEffect(() => {
    if (receiptId) {
      async function fetchAndSetDetailData() {
        setPatientName(await getPatientName(receiptId));
        setDetailData(await getTestStateDetailList(receiptId));
        setReceiptState(await getReceiptState(receiptId));
      }
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
      await sendRedisMessage({
        ...pubMessage,
        content: {
          lab: rows[0].bundle_lab,
          patientName
        }
      });
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
    await updateReceiptState(event.target.value, receiptId);
    setReceiptState(await getReceiptState(receiptId));
    const response = await getCheckPreviousResult(receiptId);
    if(response.data.PrevResultData.length === 0 ) {
      await insertResultDataByNew({receipt_id: receiptId});
    } else {
      await insertResultData({receipt_id: receiptId});
    }
    await sendRedisMessage({
      topic:'/'+ sessionStorage.getItem("hospital_id") +'/#',
      content:'ChangeReceiptState',
    });
    if (event.target.value === "수납전") {
      await paymentBefore(receiptId)
      Swal.fire('수납전')
    } else if (event.target.value === "대기") {
      Swal.fire('대기')
    }
  }

  const handleModal = () => { //모달 창 열기, 닫기      
    setIsModalVisible(!isModalVisible); // 모달 창 열기/닫기
  }

  useEffect(() => {
    // return (() => {
    //   rowSelection.
    // })
  }, [waitType])

  return (
    <div className={cx("flex-width")}>
      <Card className={cx("card")}>
        <div className={cx("d-flex", "justify-content-between")}>
          <div className={cx("teststate-patient")}><span><strong>{patientName}</strong></span>님: 진단 검사 상세<strong className={cx("text-primary")}>({receiptState})</strong></div>
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
            <Button color={'rgb(255, 99, 132)'}  className={cx(receiptState === "검사완료" || receiptState === "대기" || receiptState === "수납전" ? 'd-none' : "")} onClick={handleBarcode} >바코드 출력</Button>
            <Button color={'rgb(255, 159, 64)'} className={cx(receiptState === "검사완료" || receiptState === "대기" || receiptState === "수납전" ? 'd-none' : "")} onClick={handleCancel}>접수 취소</Button>
            <Button color={'rgb(54, 162, 235)'} className={cx(receiptState === "검사완료" || receiptState === "대기" || receiptState === "수납전" ? 'd-none' : "")} onClick={handleComplete}>검사 완료</Button>
            <Button color={'rgb(153, 102, 255)'} onClick={saveExcel}>엑셀 저장</Button>
          </div>
        </div>
        <div className={cx("teststate-table")}>
          <Table className={cx("ant-th", "ant-tbody", "test-state-detail")} columns={resultItem} dataSource={detailData} pagination={false} rowKey={record => record.diagnostic_list_id} rowSelection={{...rowSelection}} scroll={{y: 720}}/>
        </div>
        { 
          isModalVisible && (<CameraModal handleModal={handleModal} receiptId={receiptId} patientName={patientName}/>)
        }
      </Card>
    </div>
  );
}

export default TestStateDetail;