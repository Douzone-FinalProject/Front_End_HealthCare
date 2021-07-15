import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";
import { Card } from 'antd';
import ChartSection from "./ChartSection";
import LabTable from "./LabTable";
import PatientStateList from "./PatientStateList";
import Clock from 'react-live-clock';

const cx = classNames.bind(style);

function ChartAndList({waitingData, setWaitingData, setReceiptId, labTable, waitType, state, setWaitType, setState, stateChart, setStateChart, labChart, setLabChart}, props) {

  return (
    <div className={cx("flex-width")}>
      <Card className={cx("card")}>
        <div className={cx("mb-3", "clock")}><Clock format={'YYYY년 MM월 DD일 HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'}/></div>
        <ChartSection waitingData={waitingData} stateChart={stateChart} setStateChart={setStateChart}
                              labChart={labChart} setLabChart={setLabChart}/>
        <div className={cx("teststate-lab")}>
          <LabTable labTable={labTable}/>
        </div>
        <PatientStateList waitingData={waitingData} setWaitingData={setWaitingData} setReceiptId={setReceiptId} waitType={waitType} state={state} setWaitType={setWaitType} setState={setState}/>
      </Card>
    </div>
  );
}

export default ChartAndList;