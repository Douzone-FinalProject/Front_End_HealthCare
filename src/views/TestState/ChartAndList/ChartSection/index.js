import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Row, Col } from "antd";
import PieChart from "views/TestState/PieChart";
import { useState } from "react";
import { useEffect } from "react";
import { getChartData, getChartData2 } from "views/TestState/db";
import { getStateChart } from "apis/teststate";

const cx = classNames.bind(style);

function ChartSection({chartData1, setChartData1, waitingData}, props) {

  const [stateChart, setStateChart] = useState([]);
  const [chartData2, setChartData2] = useState([]);

  useEffect(() => {
    async function fetchAndSetStateChart() {
      setStateChart(await getStateChart());
    }
    fetchAndSetStateChart();
  }, [chartData1])

  useEffect(() => {
    setChartData2(getChartData2());
  }, [chartData2])
  return (
    <>
      <Row>
        <Col flex={1} className={cx("chart")}>
          <PieChart category={"검사대기"} chartData={stateChart} />
        </Col>
        <Col flex={1} className={cx("chart")}>
          <PieChart category={"검사실인원"} chartData={chartData2} />
        </Col>
      </Row>
    </>
  );
}

export default ChartSection;