
let resultData1 = [
  {
    chartId: 1000101,
    name: "병주캉",
    data: [
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
        state: "검사대기"
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
        state: "검사대기"
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
      }
    ]
  },
  {
    chartId: 1010215,
    name: "채정리",
    data: [
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
        state: "검사대기"
      },
    ]
  },
  {
    chartId: 1001515,
    name: "민상조",
    data: [
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
    ]
  }
]

const waitingData = [
    {
      key: 1,
      order: 1,
      chart: 1000101,
      name: '병주캉',
      sex: "?",
      age: "900",
      state: "검사중",
    },
    {
      key: 2,
      order: 2,
      chart: 1010215,
      name: '채정리',
      sex: "여",
      age: "3",
      state: "검사대기"
    },
    {
      key: 3,
      order: 3,
      chart: 1001515,
      name: '민상조',
      sex: "남",
      age: "27",
      state: "검사대기"
    }
]

export function getTestStateDetailData(chartId) {
  let result = resultData1.filter(data => {
    if (data.chartId === chartId) {
       return data.data;
    }
  })
  return result[0].data; 
}

// PatientStateList toggle에 따른 데이터 변화
export function getLabData(waitType, state) {
  let results = [];
  if (waitType === "전체") {
    if (state === "whole") {
      return results = waitingData;
    } else {
      results = waitingData.filter(data => {
        console.log(data)
        if (data.state === state) {
          return data;
        }
      })
    }
  } else {
    results = waitingData.filter(data => {
      for (let result of resultData1) {
        if (result.name === data.name) {
          for (let item of result.data) {
            if (item.lab === waitType) {
              if (state === 'whole') {
                return data
              } else if (data.state === state) {
                return data
              }
            }
          }
        }
      }
    })
  }
  return results;
}

// TestStateDetail에서 상태가 변경 되었을 시 PatientStateList에 있는 상태가 변화
export function changeState(waitingDatas, datas, chartId) {
  let results = [];
  if (datas) {
    results = waitingDatas.map(wait => {
      if (wait.chart === chartId) {
        let waitCount = 0;
        let complete = 0;
        for (let data of datas) {
          if (data.state === "검사접수") {
            wait.state = "검사중";
            return wait;
          } else if (data.state === "검사완료") {
            complete++;
          } else {
            waitCount++;
          }
        }
        // watiCount, complete 길이에 따라 상태가 달라짐
        if (waitCount === datas.length) {
          wait.state = "검사대기";
          return wait;
        } else if (complete === datas.length) {
          wait.state = "검사완료";
          return wait;
        } else {
          wait.state = "검사중";
          return wait;
        }
      } else {
        return wait;
      }
    })
    return results;
  }
}

// LabTable 검사실 환자 현황
let patientNames = ["", "", ""];
export function getLabPatient(resultData, chartId) {
  let patientName = "";
  for (let wait of waitingData) {
    if (wait.chart === chartId) {
      patientName = wait.name
      break
    }
  }
  let index = patientNames.indexOf(patientName);
  for (let result of resultData) {
    if (result.state === "검사접수") {
      if (index) {
        patientNames[index] = "";
      }
      if (result.lab === "검사실1") {
        patientNames[0] = patientName;
      } else if (result.lab === "검사실2") {
        patientNames[1] = patientName;
      } else if (result.lab === "검사실3") {
        patientNames[2] = patientName;
      }
    } else if (result.state === "검사완료") {
      if (result.lab === "검사실1") {
        patientNames[0] = "";
      } else if (result.lab === "검사실2") {
        patientNames[1] = "";
      } else if (result.lab === "검사실3") {
        patientNames[2] = "";
      }
    }
  }
  return patientNames;
}

const datas = [
  {
    "id": "a",
    "label": "검사대기",
    "value": 297,
    "color": "rgb(255, 99, 132)"
  },
  {
    "id": "b",
    "label": "검사중",
    "value": 150,
    "color": "rgb(255, 205, 86)"
  },
  {
    "id": "c",
    "label": "검사완료",
    "value": 275,
    "color": "rgb(75, 192, 192)"
  },
]

const lab = [
  {
    "id": "a",
    "label": "검사실1",
    "value": 0,
    "color": "rgb(255, 159, 64)"
  },
  {
    "id": "b",
    "label": "검사실2",
    "value": 0,
    "color": "rgb(54, 162, 235)"
  },
  {
    "id": "c",
    "label": "검사실3",
    "value": 0,
    "color": "rgb(153, 102, 255)"
  },
]

// Pie Chart에 나오는 데이터
export function getChartData() {
  let chartData = [0, 0, 0];
  for (let wait of waitingData) {
    if (wait.state === "검사대기") {
      chartData[0]++;
    } else if (wait.state === "검사중") {
      chartData[1]++;
    } else if (wait.state === "검사완료") {
      chartData[2]++;
    }
  }
  for (let data of datas) {
    if (data.label === "검사대기") {
      data.value = chartData[0];
    } else if (data.label === "검사중") {
      data.value = chartData[1];
    } else if (data.label === "검사완료") {
      data.value = chartData[2];
    }
  }
  return datas;
}

export function getChartData2() {
  let count = [0, 0, 0];
  for (let result of resultData1) {
    for (let data of result.data) {
      if (data.lab === "검사실1") {
        count[0]++;
      } else if (data.lab === "검사실2") {
        count[1]++;
      } else if (data.lab === "검사실3") {
        count[2]++;
      }
    }
  }
  for (let data of lab) {
    console.log(data.value)
    if (data.label === "검사실1") {
      data.value = count[0];
    } else if (data.label === "검사실2") {
      data.value = count[1];
    } else if (data.label === "검사실3") {
      data.value = count[2];
    }
  }
  console.log(lab)
  return lab;
}


export function getPatientName(chartId) {
  for (let wait of waitingData) {
    if (wait.chart === chartId) {
      return wait.name
    }
  }
}