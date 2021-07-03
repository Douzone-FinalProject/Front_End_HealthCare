
let resultData1 = [
  {
    chartId: 1000101,
    name: "병주캉",
    data: [
      {
        symptom_id: "STS335",
        bundle_id: "ANM05",
        prescription_name: "Valproic acid therapeutic drug monitoring",
        specimen: "Whole Blood",
        bottle: "Sodium Citrate",
        barcode: "",
        lab: "검사실2",    
        doctor: "황성욱",
        staff: "홍종현",
        state: "검사대기"
      },
      {
        symptom_id: "STS335",
        bundle_id: "M1515",
        prescription_name: "Mean Cell Volume",
        specimen: "Whole Blood",
        bottle: "EDTA",
        barcode: "",
        lab: "검사실1",    
        doctor: "홍종현",
        staff: "박시현",
        state: "검사대기"
      },
      {
        symptom_id: "STS335",
        bundle_id: "H1232",
        prescription_name: "Hemoglobin",
        specimen: "Whole Blood",
        bottle: "EDTA",
        barcode: "",
        lab: "검사실3",    
        doctor: "박시현",
        staff: "김형윤",
        state: "검사대기"
      },
      {
        symptom_id: "UDR",
        bundle_id: "D0175",
        prescription_name: "Diabets melitus Test",
        specimen: "Spot urine/cup",
        bottle: "Urine",
        barcode: "",
        lab: "검사실2",    
        doctor: "김형윤",
        staff: "박빛나",
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
        specimen: "Whole Blood",
        bottle: "EDTA",
        barcode: "",
        lab: "검사실2",    
        doctor: "박빛나",
        staff: "윤서영",
        state: "검사대기"
      },
      {
        symptom_id: "STS335",
        bundle_id: "M1515",
        prescription_name: "Mean Cell Volume",
        specimen: "Whole Blood",
        bottle: "EDTA",
        barcode: "",
        lab: "검사실1",    
        doctor: "윤서영",
        staff: "이종현",
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
        specimen: "Whole Blood",
        bottle: "EDTA",
        barcode: "",
        lab: "검사실2",    
        doctor: "이종현",
        staff: "민지현",
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
      age: "90",
      state: "검사대기",
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
    return "";
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
      results = waitingData.filter(data => data.state === state)
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
      return "";
    })
  }
  return results;
}

// TestStateDetail에서 상태가 변경 되었을 시 PatientStateList에 있는 상태가 변화
export function changeState(waitingDatas, resultDatas, chartId) {
  let results = [];
  if (resultDatas) {
    results = waitingDatas.map(wait => {
      if (wait.chart === chartId) {
        let waitCount = 0;
        let complete = 0;
        for (let data of resultDatas) {
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
        if (waitCount === resultDatas.length) {
          wait.state = "검사대기";
          return wait;
        } else if (complete === resultDatas.length) {
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
export function getChartData(waitingData) {
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
    if (data.label === "검사실1") {
      data.value = count[0];
    } else if (data.label === "검사실2") {
      data.value = count[1];
    } else if (data.label === "검사실3") {
      data.value = count[2];
    }
  }
  return lab;
}


export function getPatientName(chartId) {
  for (let wait of waitingData) {
    if (wait.chart === chartId) {
      return wait.name
    }
  }
}

// 바코드 생성(내가 그냥 만든거)
export function barcode(resultData, rows) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  let barcodes = [];
  let results = [];
  for (let row in rows) {
    let barcode = "";
    for (let i = 0; i < 13; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      barcode += chars.substring(rnum, rnum + 1)
    }
    barcodes.push(barcode)
  }
  for (let index in rows) {
    for (let i in barcodes) {
      if (index === i && !rows[index].barcode) {
        rows[index].barcode = barcodes[i]
      }
    }
  }
  results = resultData.map(result => {
    for (let row of rows) {
      if (result.bundle_id === row.bundle_id) {
        return row
      } 
    }
    return result;
  })
  return results;
}

export function deleteBarcode(resultData, rows) {
  for (let row of rows) {
    for (let result of resultData) {
      if (row.bundle_id === result.bundle_id) {
        result.barcode = ""
      }
    }
  }
  return resultData;
}