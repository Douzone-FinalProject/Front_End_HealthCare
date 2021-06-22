import style from "./teststate.module.css";
import classNames from "classnames/bind";
import { Row, Col} from 'antd';
import ChartAndList from "./ChartAndList";
import TestStateDetail from "./TestStateDetail";
import { TestStateContextProvider } from "./TestStateContext";


const cx = classNames.bind(style);


function TestState(props) {
    
  const resultData1 = [
    {
      symptom_id: "STS335",
      bundle_id: "H1001",
      prescription_name: "Hematocrit",
      specimen: "Blood/DeTA tube",
      bottle: "EDTA",
      barcode: "EDTABNP1",
      lab: "검사실2",    
      doctor: "닥터후",
      staff: "스펀지밥",
      state: "검사대기"
    },
    {
      symptom_id: "STS335",
      bundle_id: "M1515",
      prescription_name: "Mean Cell Volume",
      specimen: "Blood/DeTA tube",
      bottle: "EDTA",
      barcode: "EDTABNP2",
      lab: "검사실1",    
      doctor: "닥터 스트레인지",
      staff: "별가",
      state: "검사접수"
    },
    {
      symptom_id: "STS335",
      bundle_id: "H1232",
      prescription_name: "Hemoglobin",
      specimen: "Blood/DeTA tube",
      bottle: "EDTA",
      barcode: "EDTABNP3",
      lab: "검사실3",    
      doctor: "익준",
      staff: "깐깐징어",
      state: "검사완료"
    },
    {
      symptom_id: "UDR",
      bundle_id: "D0175",
      prescription_name: "Diabets melitus Test",
      specimen: "Spot urine/cup",
      bottle: "Urine",
      barcode: "Urine",
      lab: "검사실2",    
      doctor: "낭만닥터",
      staff: "야나두",
      state: "검사대기"
    },
  ]

  // const handleState = (event) => {
  //   const value = event.currentTarget.getAttribute('value');
  //   const check = event.target.checked;
  //   const tag = event.target
  //   if (value === "검사" || value === "진료") {
  //     setWaitType(value);
  //     setColor("blue")
  //   } else {
  //     setState(value)
  //   }
  // }

  // useEffect(() => {
  //   return () => {
  //     setWaitingData([
  //       {
  //         key: 2,
  //         order: 2,
  //         chart: 1010215,
  //         name: '채정리',
  //         sex: "여",
  //         age: "3",
  //         state: "대기"
  //       },
  //       {
  //         key: 3,
  //         order: 3,
  //         chart: 1001515,
  //         name: '민상조',
  //         sex: "남",
  //         age: "27",
  //         state: "대기"
  //       }
  //     ])
  //   }
  // }, [waitType, state])


  return (
    <>
      <TestStateContextProvider>
        <Row>
          <Col flex={2} className={cx("teststate-frame")}>
            <ChartAndList/>
          </Col>
          <Col flex={3} className="m-2">
            <TestStateDetail/>
          </Col>
        </Row>
      </TestStateContextProvider>
    </>
  );
}

export default TestState;