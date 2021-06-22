import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Row, Col } from "antd";
import PieChart from "views/TestState/PieChart";

const cx = classNames.bind(style);

function ChartSection(props) {
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
  return (
    <>
      <Row>
        <Col flex={1} className={cx("chart")}>
          <PieChart category={"검사대기"} chartData={data} />
        </Col>
        <Col flex={1} className={cx("chart")}>
          <PieChart category={"진료대기"} chartData={data}/>
        </Col>
      </Row>
    </>
  );
}

export default ChartSection;