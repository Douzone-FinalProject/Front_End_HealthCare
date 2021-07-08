import axios from "axios";

// patientStateList 
export async function getPatientList(waitType, state) {
  const waitingDatas = await axios.get(`/teststate?type=${waitType}&state=${state}`);
  console.log(waitingDatas.data);
  return waitingDatas.data;
}

// testStateDetail 
export async function getTestStateDetailList(receiptId) {
  const detailDatas = await axios.get(`/teststate/detail?receiptId=${receiptId}`);
  // console.log(detailDatas.data);
  return detailDatas.data;
}

// testStateDetail
export async function updateStateDetail(rowKeys, state, staff_login_id, bundleSpecimens) {
  console.log(staff_login_id)
  
  const updateData = {
    rowKeys,
    state,
    staff_login_id,
    bundleSpecimens
  }
  await axios.put("/teststate", updateData);
}

// 왼쪽 chart(stateChart)
const stateChart = [
  {
    "id": "waiting",
    "label": "검사대기",
    "value": 297,
    "color": "rgb(255, 99, 132)"
  },
  {
    "id": "doing",
    "label": "검사중",
    "value": 150,
    "color": "rgb(255, 205, 86)"
  },
  {
    "id": "complete",
    "label": "검사완료",
    "value": 275,
    "color": "rgb(75, 192, 192)"
  },
]
export async function getStateChart() {
  const stateChartData = await axios.get(`/teststate/statechart`);
  stateChart[0].value = stateChartData.data[0].waiting;
  stateChart[1].value = stateChartData.data[0].doing;
  stateChart[2].value = stateChartData.data[0].complete;
  return stateChart; 
}