import style from "./teststate.module.css";
import classNames from "classnames/bind";
import PieNivo from "./PieNivo";
import Button from "./Button";
import { Row, Col, Card, Table } from 'antd';
import { useState } from "react";

const cx = classNames.bind(style);

function TestState(props) {

  const [resultData, setResultData] = useState([  ])

  
  const data = [
    {
      "id": "a",
      "label": "대기",
      "value": 297,
      "color": "rgb(255, 99, 132)"
    },
    {
      "id": "b",
      "label": "진행중",
      "value": 150,
      "color": "rgb(255, 205, 86)"
    },
    {
      "id": "c",
      "label": "수납전",
      "value": 275,
      "color": "rgb(75, 192, 192)"
    },
  ]

  const lab = ["검사실1", "검사실2", "검사실3"]
  const columns = [
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
  
  const waitingData = [
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
  ]

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
        setResultData(
          resultData1
        )
      }
    }
  }


  return (
    <>
      <Row>
        <Col flex={2} className={cx("teststate-frame")}>
          <Card className={cx("card")}>
            <div>{ new Date().toLocaleDateString('ko-KR') }</div>
            <Row>
              <Col flex={1} className={cx("chart")}>
                <div>진료대기</div>
                <PieNivo data={data}/>
              </Col>
              <Col flex={1} className={cx("chart")}>
                <div>검사대기</div>
                <PieNivo data={data}/>
              </Col>
            </Row>
            <div className={cx("teststate-lab")}>
              <table className="table">
                <thead className="text-center">
                  <tr>
                    {lab.map((item, index) => <th key={index}>{item}</th>)}
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>민상조</td>
                    <td>채정리</td>
                    <td>병주캉</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={cx("d-flex", "justify-content-between", "mt-4")}>
              <div className="d-flex">
                <div className="mr-1">검사대기</div>
                <span>|</span>
                <div className="ml-1">진료대기</div>
              </div>
              <div className="d-flex">
                <div className="mr-1 ">전체</div>
                <span>|</span>
                <div className="ml-1 mr-1">대기</div>
                <span>|</span>
                <div className="ml-1 mr-1">검사중</div>
                <span>|</span>
                <div className="ml-1">완료</div>
              </div>
            </div>
            <div className={cx("teststate-table")}>
              <Table columns={columns} dataSource={waitingData} pagination={false} onRow={handlePatient}/>
            </div>
          </Card>
        </Col>
        <Col flex={3} className="m-2">
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
              <Table columns={resultItem} dataSource={resultData} pagination={false} />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default TestState;