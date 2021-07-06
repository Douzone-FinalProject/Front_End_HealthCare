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
export async function updateStateDetail(rowKeys, state, staff_login_id, bundleIds) {
  console.log(staff_login_id)
  
  const updateData = {
    rowKeys,
    state,
    staff_login_id,
    bundleIds
  }
  await axios.put("/teststate", updateData);
}