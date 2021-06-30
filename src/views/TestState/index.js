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

  const [waitingData, setWaitingData] = useState([]);

  // 차트 아이디
  const [chartId, setChartId] = useState();

  // TestStateDetail 에 prop
  const [resultData, setResultData] = useState([]);

  // LabTab에 prop
  const [patientNames, setPatientNames] = useState([]);

  const [chartData1, setChartData1] = useState([]);

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