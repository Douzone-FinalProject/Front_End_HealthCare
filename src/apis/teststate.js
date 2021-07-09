import axios from "axios";

// patientStateList 
export async function getPatientList(waitType, state) {
  const waitingDatas = await axios.get(`/teststate?type=${waitType}&state=${state}`);
  return waitingDatas.data;
}

// testStateDetail 
export async function getTestStateDetailList(receiptId) {
  const detailDatas = await axios.get(`/teststate/detail?receiptId=${receiptId}`);
  // console.log(detailDatas.data);
  return detailDatas.data;
}

// testStateDetail (바코드출력/접수 취소/검사 완료)
export async function updateStateDetail(rowKeys, state, staff_login_id, bundleSpecimens, receiptId) {  
  const updateData = {
    rowKeys,
    state,
    staff_login_id,
    bundleSpecimens,
    receiptId
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

export async function updateReceiptState(state, receiptId) {
  const updateData = {
    state,
    receiptId
  }
  await axios.put(`/teststate/receiptstate`, updateData)
}

export async function uploadImg(formData) {
  await axios.post(`/testate/img`, formData, {headers: {"Content-Type": "multipart/form-data"}})
}