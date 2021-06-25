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
        state: "검사접수"
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

export function getChartData(chartId) {
  let result = resultData1.filter(data => {
    if (data.chartId === chartId) {
       return data.data;
    }
  })
  return result[0].data; 
}  