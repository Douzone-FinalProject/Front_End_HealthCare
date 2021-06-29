import style from "./teststate.module.css";
import classNames from "classnames/bind";
import { Row, Col} from 'antd';
import ChartAndList from "./ChartAndList";
import TestStateDetail from "./TestStateDetail";
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import { useState } from "react";

const cx = classNames.bind(style);


function TestState(props) {

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

  // 차트 아이디
  const [chartId, setChartId] = useState();

  // TestStateDetail 에 prop
  const [resultData, setResultData] = useState([]);

  // LabTab에 prop
  const [patientNames, setPatientNames] = useState([]);

  const [chartData1, setChartData1] = useState([
    {
      "id": "a",
      "label": "검사대기",
      "value": 0,
      "color": "rgb(255, 99, 132)"
    },
    {
      "id": "b",
      "label": "검사중",
      "value": 0,
      "color": "rgb(255, 205, 86)"
    },
    {
      "id": "c",
      "label": "검사완료",
      "value": 0,
      "color": "rgb(75, 192, 192)"
    },
  ]);

  return (
    <>
      <div className={cx("whole-frame")}>
        <Header />
          <Row>
            <Col flex={2} className={cx("teststate-frame")}>
              <ChartAndList waitingData={waitingData} setWaitingData={setWaitingData} setChartId={setChartId} patientNames={patientNames} chartData1={chartData1} setChartData1={setChartData1}/>
            </Col>
            <Col flex={3} className="m-2">
              <TestStateDetail chartId={chartId} 
                              resultData={resultData} setResultData={setResultData} 
                              waitingData={waitingData} setWaitingData={setWaitingData} 
                              setPatientNames={setPatientNames} 
                              setChartData1={setChartData1}
                              />
            </Col>
          </Row>
        <DialMenu />
      </div>
    </>
  );
}

export default TestState;