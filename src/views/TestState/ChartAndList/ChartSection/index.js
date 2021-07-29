import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Row, Col } from "antd";
import PieChart from "views/TestState/PieChart";
import { useState } from "react";
import { useEffect } from "react";
import { getLabChart, getStateChart } from "apis/teststate";

const cx = classNames.bind(style);

function ChartSection({stateChart, setStateChart, labChart, setLabChart}, props) {


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
          <PieChart category={"검사현황"} chartData={stateChart} />
        </Col>
        <Col flex={1} className={cx("chart")}>
          <PieChart category={"검사실 검사개수"} chartData={labChart} />
        </Col>
      </Row>
    </>
  );
}

export default ChartSection;