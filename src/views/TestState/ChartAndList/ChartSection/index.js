import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Row, Col } from "antd";
import PieChart from "views/TestState/PieChart";
import { useState } from "react";
import { useEffect } from "react";
import { getLabChart, getStateChart } from "apis/teststate";

const cx = classNames.bind(style);

function ChartSection({chartData1, setChartData1, waitingData}, props) {

  const [stateChart, setStateChart] = useState([]);
  const [labChart, setLabChart] = useState([]);

  useEffect(() => {
    async function fetchAndSetStateChart() {
      setStateChart(await getStateChart());
    }
    fetchAndSetStateChart();
  }, [stateChart])

  useEffect(() => {
    async function fetchAndSetLabChart() {
      setLabChart(await getLabChart());
    }
    fetchAndSetLabChart();
  }, [labChart])
  return (
    <>
      <Row>
        <Col flex={1} className={cx("chart")}>
          <PieChart category={"검사대기"} chartData={stateChart} />
        </Col>
        <Col flex={1} className={cx("chart")}>
          <PieChart category={"검사실인원"} chartData={labChart} />
        </Col>
      </Row>
    </>
  );
}

export default ChartSection;