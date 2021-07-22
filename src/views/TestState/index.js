import style from "./teststate.module.css";
import classNames from "classnames/bind";
import { Row, Col} from 'antd';
import ChartAndList from "./ChartAndList";
import TestStateDetail from "./TestStateDetail";
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import { useEffect, useRef, useState } from "react";
import { getPatientList, getStateChart, getTestStateDetailList } from "apis/teststate";

const cx = classNames.bind(style);


function TestState(props) {

  const [waitingData, setWaitingData] = useState([]);

  // 차트 아이디
  const [receiptId, setReceiptId] = useState();

  // TestStateDetail 에 prop
  const [detailData, setDetailData] = useState([]);

  // LabTab에 prop
  const [labTable, setLabTable] = useState();

  const [waitType, setWaitType] = useState("전체");
  const [state, setState] = useState("whole");
  
  const [stateChart, setStateChart] = useState([]);
  const [labChart, setLabChart] = useState([]);

  const realTimeReceiptList = async () => {
    console.log("realTimeReceiptList");
  }

  // websocket + redis
  const [connected, setConnected] = useState(false);
  const [pubMessage, setPubMessage] = useState({
    topic: "/" + sessionStorage.getItem("hospital_id") + "/",
    content: 'testStateDetail change',
  });

  let ws = useRef(null);
  const connectWebSocket = () => {

    ws.current = new WebSocket("ws://localhost:8080/websocket/redis");
    // ws.current = new WebSocket("ws://localhost:8080/websocket/redis");

    ws.current.onopen = () => {
      console.log("teststatedetail 접속 성공");
      setConnected(true);
      let json = {topic: "/" + sessionStorage.getItem("hospital_id") +"/"};
      let message = JSON.stringify(json);
      ws.current.send(message);
    };

    ws.current.onclose = () => {
      console.log("teststatedetail 접속 끊김");
      setConnected(false);
    };

    ws.current.onmessage = async (event) => {
      console.log("teststatedetail 메시지 수신");
      let json = event.data;
      let message = JSON.parse(json);
      if (message.content !== "testStateDetail change" && message.content !== 'ChangeReceiptState') {
        setLabTable(JSON.parse(message.content));
      }
      if (receiptId && message.content !== 'ChangeReceiptState') {
        setDetailData(await getTestStateDetailList(receiptId));
      }
      setStateChart(await getStateChart()); 
      setWaitingData(await getPatientList(waitType, state));
    }
  }

  const disconnectWebSocket = () => {
    ws.current.close();
  }

  useEffect(() => {
    connectWebSocket();
    console.log("1 메시지 마운트");
    return (() => {
        setConnected(false);
        disconnectWebSocket();
        console.log("메시지 언마운트");
    });
  }, [receiptId]);
  return (
    <>
      <div className={cx("whole-frame")}>
        <Header realTimeReceiptList={realTimeReceiptList}/>
        <Row>
          <Col xxl={7} className={cx("teststate-frame", "flex-width")}>
            <ChartAndList waitingData={waitingData} setWaitingData={setWaitingData} 
                          setReceiptId={setReceiptId} labTable={labTable} 
                          waitType={waitType} state={state} setWaitType={setWaitType} setState={setState} 
                          stateChart={stateChart} setStateChart={setStateChart}
                          labChart={labChart} setLabChart={setLabChart}/>
          </Col>
          <Col xxl={17} className={cx("flex-width")}>
            <TestStateDetail receiptId={receiptId} 
                            detailData={detailData} setDetailData={setDetailData} 
                            waitingData={waitingData} setWaitingData={setWaitingData}
                            pubMessage={pubMessage} waitType={waitType} state={state}
                            />
          </Col>
        </Row>
        <DialMenu />
      </div>
    </>
  );
}

export default TestState;