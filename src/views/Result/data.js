let patientData = [
    {
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        name: '강병주',
        diag_name: 'B형 바이러스성 간염',
        sex: 'M',
        ssn: '960206',
        blood_datetime: '2021-06-28'
    },
    {
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        name: '강병주',
        diag_name: '당뇨',
        sex: 'M',
        ssn: '960206',
        blood_datetime: '2021-06-23'
    },
    {
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        name: '조민상',
        diag_name: '간경화',
        sex: 'M',
        ssn: '951106',
        blood_datetime: '2021-06-28'
    },
    {
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        name: '임도희',
        diag_name: '황달',
        sex: 'M',
        ssn: '930506',
        blood_datetime: '2021-06-28'
    },
    {
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        name: '이채정',
        diag_name: '간염',
        sex: 'F',
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
        name: '강병주',
    },
    {
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        receipt_state: '완료',
        patient_id: '10001',
        name: '강병주',
    },
    {
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        name: '조민상',
    },
    {
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        name: '임도희',
    },
    {
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10004',
        name: '이채정',
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
        name: '강병주',
        barcode: 'EDTABNP1',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '2',
        diagnostic_specimen_number: '11112',
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10001',
        name: '강병주',
        barcode: 'EDTABNP2',
        doctor: '신용권',
        nurse: '신압권'
    },
    {
        diagnostic_list_id: '3',
        diagnostic_specimen_number: '11113',
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10001',
        name: '강병주',
        barcode: 'EDTABNP3',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '4',
        diagnostic_specimen_number: '11114',
        receipt_id: '10001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10001',
        name: '강병주',
        barcode: 'EDTABNP4',
        doctor: '신용권',
        nurse: '신압권'
    },
    {
        diagnostic_list_id: '5',
        diagnostic_specimen_number: '11121',
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        receipt_state: '완료',
        patient_id: '10001',
        name: '강병주',
        barcode: 'EDTABNP5',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '6',
        diagnostic_specimen_number: '11122',
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        receipt_state: '완료',
        patient_id: '10001',
        name: '강병주',
        barcode: 'EDTABNP6',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '7',
        diagnostic_specimen_number: '11123',
        receipt_id: '10002',
        receipt_datetime: '2021-06-23',
        receipt_state: '완료',
        patient_id: '10001',
        name: '강병주',
        barcode: 'EDTABNP7',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '8',
        diagnostic_specimen_number: '21111',
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        name: '조민상',
        barcode: 'EDTABNP8',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '9',
        diagnostic_specimen_number: '21112',
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        name: '조민상',
        barcode: 'EDTABNP9',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '10',
        diagnostic_specimen_number: '21113',
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        name: '조민상',
        barcode: 'EDTABNP10',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '11',
        diagnostic_specimen_number: '21114',
        receipt_id: '20001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10002',
        name: '조민상',
        barcode: 'EDTABNP11',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '12',
        diagnostic_specimen_number: '31111',
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        name: '임도희',
        barcode: 'EDTABNP12',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '13',
        diagnostic_specimen_number: '31112',
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        name: '임도희',
        barcode: 'EDTABNP13',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '14',
        diagnostic_specimen_number: '31113',
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        name: '임도희',
        barcode: 'EDTABNP14',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '15',
        diagnostic_specimen_number: '31114',
        receipt_id: '30001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10003',
        name: '임도희',
        barcode: 'EDTABNP15',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '16',
        diagnostic_specimen_number: '41111',
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10004',
        name: '이채정',
        barcode: 'EDTABNP16',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '17',
        diagnostic_specimen_number: '41112',
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10004',
        name: '이채정',
        barcode: 'EDTABNP17',
        doctor: '신용권',
        nurse: '양미연'
    },
    {
        diagnostic_list_id: '18',
        diagnostic_specimen_number: '41113',
        receipt_id: '40001',
        receipt_datetime: '2021-06-28',
        receipt_state: '완료',
        patient_id: '10004',
        name: '이채정',
        barcode: 'EDTABNP18',
        doctor: '신용권',
        nurse: '양미연'
    },
];

let resultData = [
    {
        field: 'H1',
        diagnosisname: 'CBC ROU & ESR',
        result: 1.0,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11111',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        diagnosisname: 'WBC',
        result: 55,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11111',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        diagnosisname: 'RBC',
        result: 35,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11111',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        diagnosisname: 'WBC',
        result: 57,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11112',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        diagnosisname: 'RBC',
        result: 36,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11113',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        diagnosisname: 'HB',
        result: 52,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11114',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        diagnosisname: 'HB',
        result: 53,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11114',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        diagnosisname: 'HB',
        result: 54,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11114',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        diagnosisname: 'HB',
        result: 55,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11114',
        receipt_id: '10001'
    },
    {
        field: 'H1',
        diagnosisname: 'Hct',
        result: 90,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11121',
        receipt_id: '10002',
    },
    {
        field: 'H1',
        diagnosisname: 'MCV',
        result: 33,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11122',
        receipt_id: '10002',
    },
    {
        field: 'H1',
        diagnosisname: 'CBC ROU & ESR',
        result: 40,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '11123',
        receipt_id: '10002',
    },
    {
        field: 'H1',
        diagnosisname: 'WBC',
        result: 45,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '21111',
        receipt_id: '20001',
    },
    {
        field: 'H1',
        diagnosisname: 'CBC ROU & ESR',
        result: 65,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '21112',
        receipt_id: '20001',
    },
    {
        field: 'H1',
        diagnosisname: 'HB',
        result: 60,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '21113',
        receipt_id: '20001',
    },
    {
        field: 'H1',
        diagnosisname: 'WBC',
        result: 45,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '21114',
        receipt_id: '20001',
    },
    {
        field: 'H1',
        diagnosisname: 'CBC ROU & ESR',
        result: 35,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '31111',
        receipt_id: '30001',
    },
    {
        field: 'H1',
        diagnosisname: 'HB',
        result: 25,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '31112',
        receipt_id: '30001',
    },
    {
        field: 'H1',
        diagnosisname: 'WBC',
        result: 45,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '31113',
        receipt_id: '30001',
    },
    {
        field: 'H1',
        diagnosisname: 'Hct',
        result: 85,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '31114',
        receipt_id: '30001',
    },
    {
        field: 'H1',
        diagnosisname: 'WBC',
        result: 50,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '41111',
        receipt_id: '40001',
    },
    {
        field: 'H1',
        diagnosisname: 'CBC ROU & ESR',
        result: 40,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '41112',
        receipt_id: '40001',
    },
    {
        field: 'H1',
        diagnosisname: 'HB',
        result: 60,
        prevResult: "",
        prevDate: "",
        referenceValue: "4.0~10.0",
        unit: "",
        diagnostic_specimen_number: '41113',
        receipt_id: '40001',
    },
];

export function getReceiptData(name, receipt_datetime) {
    let data
    if(name !== '') {
        data = receiptData.filter(temp => temp.name === name && temp.receipt_datetime === receipt_datetime);
    } else {
        data = receiptData.filter(temp => temp.receipt_datetime === receipt_datetime);
    }
    return data;
};

export function getDiagnosticData(name, receipt_datetime) {
    let data
    if(name !== '') {
        data = diagnosticData.filter(temp => temp.name === name && temp.receipt_datetime === receipt_datetime);
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