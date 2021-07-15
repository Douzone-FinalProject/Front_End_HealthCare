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
    receiptId,
    staffName: sessionStorage.getItem("staff_name")
  }
  await axios.put("/teststate", updateData);
}

// 왼쪽 chart(stateChart)
const stateChart = [
  {
    "id": "waiting",
    "label": "검사대기",
    "value": 0,
    "color": "rgb(255, 99, 132)"
  },
  {
    "id": "doing",
    "label": "검사중",
    "value": 0,
    "color": "rgb(255, 205, 86)"
  },
  {
    "id": "complete",
    "label": "검사완료",
    "value": 0,
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

export async function uploadImg(imgData) {
  await axios.post(`/teststate/img`, imgData)
}

export async function getPatientName(receiptId) {
  const patientName = await axios.get(`/teststate/patientname/${receiptId}`)
  return patientName.data;
}

const lab = [
  {
    "id": "lab1",
    "label": "검사실1",
    "value": 0,
    "color": "rgb(255, 159, 64)"
  },
  {
    "id": "lab2",
    "label": "검사실2",
    "value": 0,
    "color": "rgb(54, 162, 235)"
  },
  {
    "id": "lab3",
    "label": "검사실3",
    "value": 0,
    "color": "rgb(153, 102, 255)"
  },
]

export async function getLabChart() {
  const labChartData = await axios.get(`teststate/labchart`);
  lab[0].value = labChartData.data[0].lab1;
  lab[1].value = labChartData.data[0].lab2;
  lab[2].value = labChartData.data[0].lab3;
  return lab; 
}

export async function getReceiptState(receiptId) {
  const receiptState = await axios.get(`/teststate/receiptstate/${receiptId}`);
  return receiptState.data;
}