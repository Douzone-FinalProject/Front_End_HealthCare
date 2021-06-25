import style from "./teststate.module.css";
import classNames from "classnames/bind";
import { Row, Col} from 'antd';
import ChartAndList from "./ChartAndList";
import TestStateDetail from "./TestStateDetail";
import { TestStateContextProvider } from "./TestStateContext";
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import { useState } from "react";
import { useEffect } from "react";


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
  const [resultData, setResultData] = useState();

  return (
    <>
      <Header />
        <Row>
          <Col flex={2} className={cx("teststate-frame")}>
            <ChartAndList waitingData={waitingData} setWaitingData={setWaitingData} setChartId={setChartId} />
          </Col>
          <Col flex={3} className="m-2">
            <TestStateDetail chartId={chartId} resultData={resultData} setResultData={setResultData}/>
          </Col>
        </Row>
      <DialMenu />
    </>
  );
}

export default TestState;