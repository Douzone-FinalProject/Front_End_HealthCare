import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Card } from 'antd';
import ChartSection from "./ChartSection";
import LabTable from "./LabTable";
import PatientStateList from "./PatientStateList";
import Clock from 'react-live-clock';

const cx = classNames.bind(style);

function ChartAndList({waitingData, setWaitingData, setChartId, patientNames, chartData1, setChartData1}, props) {

  return (
    <Card className={cx("card")}>
      <div className={cx("mb-3", "clock")}><Clock format={'YYYY년 MM월 DD일 HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'}/></div>
      <ChartSection chartData1={chartData1} setChartData1={setChartData1} waitingData={waitingData}/>
      <div className={cx("teststate-lab")}>
        <LabTable patientNames={patientNames}/>
      </div>
      <PatientStateList waitingData={waitingData} setWaitingData={setWaitingData} setChartId={setChartId}/>
    </Card>
  );
}

export default ChartAndList;