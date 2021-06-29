let patientData = [
    {
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        patient_name: '강병주',
        symptom_name: 'B형 바이러스성 간염',
        patient_sex: 'M',
        ssn: '960206',
        blood_datetime: '2021-06-28'
    },
    {
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        patient_name: '강병주',
        symptom_name: '당뇨',
        patient_sex: 'M',
        ssn: '960206',
        blood_datetime: '2021-06-23'
    },
    {
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        patient_name: '조민상',
        symptom_name: '간경화',
        patient_sex: 'M',
        ssn: '951106',
        blood_datetime: '2021-06-28'
    },
    {
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        patient_name: '임도희',
        symptom_name: '황달',
        patient_sex: 'M',
        ssn: '930506',
        blood_datetime: '2021-06-28'
    },
    {
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        patient_name: '이채정',
        symptom_name: '간염',
        patient_sex: 'F',
        ssn: '970806',
        blood_datetime: '2021-06-28'
    }
];

let receiptData = [
    {
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10001',
        patient_name: '강병주',
    },
    {
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        receipt_state: '완료',
        patient_id: '10001',
        patient_name: '강병주',
    },
    {
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        patient_name: '조민상',
    },
    {
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        patient_name: '임도희',
    },
    {
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10004',
        patient_name: '이채정',
    }
];

let diagnosticData = [
    {
        diagnostic_list_id: '1',
        diagnostic_specimen_number: '11111',
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10001',
        patient_name: '강병주',
        diagnostic_list_barcode: 'EDTABNP1',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '2',
        diagnostic_specimen_number: '11112',
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10001',
        patient_name: '강병주',
        diagnostic_list_barcode: 'EDTABNP2',
        doctor: '신용권',
        staff_name: '허민민'
    },
    {
        diagnostic_list_id: '3',
        diagnostic_specimen_number: '11113',
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10001',
        patient_name: '강병주',
        diagnostic_list_barcode: 'EDTABNP3',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '4',
        diagnostic_specimen_number: '11114',
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10001',
        patient_name: '강병주',
        diagnostic_list_barcode: 'EDTABNP4',
        doctor: '신용권',
        staff_name: '허민민'
    },
    {
        diagnostic_list_id: '5',
        diagnostic_specimen_number: '11121',
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        receipt_state: '완료',
        patient_id: '10001',
        patient_name: '강병주',
        diagnostic_list_barcode: 'EDTABNP5',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '6',
        diagnostic_specimen_number: '11122',
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        receipt_state: '완료',
        patient_id: '10001',
        patient_name: '강병주',
        diagnostic_list_barcode: 'EDTABNP6',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '7',
        diagnostic_specimen_number: '11123',
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        receipt_state: '완료',
        patient_id: '10001',
        patient_name: '강병주',
        diagnostic_list_barcode: 'EDTABNP7',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '8',
        diagnostic_specimen_number: '21111',
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        patient_name: '조민상',
        diagnostic_list_barcode: 'EDTABNP8',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '9',
        diagnostic_specimen_number: '21112',
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        patient_name: '조민상',
        diagnostic_list_barcode: 'EDTABNP9',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '10',
        diagnostic_specimen_number: '21113',
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        patient_name: '조민상',
        diagnostic_list_barcode: 'EDTABNP10',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '11',
        diagnostic_specimen_number: '21114',
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        patient_name: '조민상',
        diagnostic_list_barcode: 'EDTABNP11',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '12',
        diagnostic_specimen_number: '31111',
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        patient_name: '임도희',
        diagnostic_list_barcode: 'EDTABNP12',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '13',
        diagnostic_specimen_number: '31112',
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        patient_name: '임도희',
        diagnostic_list_barcode: 'EDTABNP13',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '14',
        diagnostic_specimen_number: '31113',
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        patient_name: '임도희',
        diagnostic_list_barcode: 'EDTABNP14',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '15',
        diagnostic_specimen_number: '31114',
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        patient_name: '임도희',
        diagnostic_list_barcode: 'EDTABNP15',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '16',
        diagnostic_specimen_number: '41111',
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10004',
        patient_name: '이채정',
        diagnostic_list_barcode: 'EDTABNP16',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '17',
        diagnostic_specimen_number: '41112',
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10004',
        patient_name: '이채정',
        diagnostic_list_barcode: 'EDTABNP17',
        doctor: '신용권',
        staff_name: '양미연'
    },
    {
        diagnostic_list_id: '18',
        diagnostic_specimen_number: '41113',
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10004',
        patient_name: '이채정',
        diagnostic_list_barcode: 'EDTABNP18',
        doctor: '신용권',
        staff_name: '양미연'
    },
];

let resultData = [
    {
        field: 'H1',
        prescription_name: 'CBC ROU & ESR',
        diagnostic_result: 1.0,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11111',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        prescription_name: 'WBC',
        diagnostic_result: 55,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11111',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        prescription_name: 'RBC',
        diagnostic_result: 35,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11111',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        prescription_name: 'WBC',
        diagnostic_result: 57,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11112',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        prescription_name: 'RBC',
        diagnostic_result: 36,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11113',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        prescription_name: 'HB',
        diagnostic_result: 52,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11114',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        prescription_name: 'HB',
        diagnostic_result: 53,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11114',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        prescription_name: 'HB',
        diagnostic_result: 54,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11114',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        prescription_name: 'HB',
        diagnostic_result: 55,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11114',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        prescription_name: 'Hct',
        diagnostic_result: 90,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11121',
        receipt_id: '10002',
    },
    {
        field: 'H1',
        prescription_name: 'MCV',
        diagnostic_result: 33,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11122',
        receipt_id: '10002',
    },
    {
        field: 'H1',
        prescription_name: 'CBC ROU & ESR',
        diagnostic_result: 40,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '11123',
        receipt_id: '10002',
    },
    {
        field: 'H1',
        prescription_name: 'WBC',
        diagnostic_result: 45,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '21111',
        receipt_id: '20001',
    },
    {
        field: 'H1',
        prescription_name: 'CBC ROU & ESR',
        diagnostic_result: 65,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '21112',
        receipt_id: '20001',
    },
    {
        field: 'H1',
        prescription_name: 'HB',
        diagnostic_result: 60,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '21113',
        receipt_id: '20001',
    },
    {
        field: 'H1',
        prescription_name: 'WBC',
        diagnostic_result: 45,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '21114',
        receipt_id: '20001',
    },
    {
        field: 'H1',
        prescription_name: 'CBC ROU & ESR',
        diagnostic_result: 35,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '31111',
        receipt_id: '30001',
    },
    {
        field: 'H1',
        prescription_name: 'HB',
        diagnostic_result: 25,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '31112',
        receipt_id: '30001',
    },
    {
        field: 'H1',
        prescription_name: 'WBC',
        diagnostic_result: 45,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '31113',
        receipt_id: '30001',
    },
    {
        field: 'H1',
        prescription_name: 'Hct',
        diagnostic_result: 85,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '31114',
        receipt_id: '30001',
    },
    {
        field: 'H1',
        prescription_name: 'WBC',
        diagnostic_result: 50,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '41111',
        receipt_id: '40001',
    },
    {
        field: 'H1',
        prescription_name: 'CBC ROU & ESR',
        diagnostic_result: 40,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '41112',
        receipt_id: '40001',
    },
    {
        field: 'H1',
        prescription_name: 'HB',
        diagnostic_result: 60,
        diagnostic_previous_result: "",
        diagnostic_previous_date: "",
        prescription_reference_value: "4.0~10.0",
        prescription_unit: "/uL",
        diagnostic_specimen_number: '41113',
        receipt_id: '40001',
    },
];

export function getReceiptData(patient_name, receipt_datetime) {
    let data
    if(patient_name !== '') {
        data = receiptData.filter(temp => temp.patient_name === patient_name && temp.receipt_datetime === receipt_datetime);
    } else {
        data = receiptData.filter(temp => temp.receipt_datetime === receipt_datetime);
    }
    return data;
};

export function getDiagnosticData(patient_name, receipt_datetime) {
    let data
    if(patient_name !== '') {
        data = diagnosticData.filter(temp => temp.patient_name === patient_name && temp.receipt_datetime === receipt_datetime);
    } else {
        data = diagnosticData.filter(temp => temp.receipt_datetime === receipt_datetime);
    }
    return data;
};

export function getResultDataBySpecimen(diagnostic_specimen_number) {
    const data = resultData.filter(temp => temp.diagnostic_specimen_number === diagnostic_specimen_number);
    return data;
}

export function getResultDataByReceipt(receipt_id) {
    const data = resultData.filter(temp => temp.receipt_id === receipt_id);
    return data;
}

export function getPatientData(receipt_id) {
    const data = patientData.find(temp => temp.receipt_id === receipt_id);
    return data;
}

export function getSpecimenData(diagnostic_specimen_number) {
    const data = diagnosticData.find(temp => temp.diagnostic_specimen_number === diagnostic_specimen_number);
    return data;
}