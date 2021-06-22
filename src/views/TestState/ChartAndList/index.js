import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Card } from 'antd';
import ChartSection from "./ChartSection";
import LabTable from "./LabTable";
import PatientStateList from "./PatientStateList";

const cx = classNames.bind(style);

function ChartAndList(props) {
  return (
    <Card className={cx("card")}>
      <div>{ new Date().toLocaleDateString('ko-KR') }</div>
      <ChartSection/>
      <div className={cx("teststate-lab")}>
        <LabTable/>
      </div>
      <PatientStateList/>
    </Card>
  );
}

export default ChartAndList;