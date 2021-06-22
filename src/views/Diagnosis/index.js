import PatientList from "./PatientList";
import SymptomSearch from "./SymptomSearch";
import DiagnosticCheckList from "./DiagnosticCheckList";
import OpinionAndSearch from "./OpinionAndSearch";
import MedicinePrescriptionList from "./MedicinePrescriptionList";
import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import {useState, useCallback} from "react";
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import { useEffect } from "react";

const cx = classnames.bind(style);

function Diagnosis(props) {
    /* 환자 리스트  */
    function getPatients() {
        const patients = [
            {patient_id:100552, patient_name:"이채정", patient_state:"진료 중", receipt_datetime: "2021/06/03 13:10:15"},
            {patient_id:100412, patient_name:"조민상", patient_state:"수납 전", receipt_datetime: "2021/06/03 13:15:31"},
            {patient_id:100732, patient_name:"임도희", patient_state:"대기", receipt_datetime: "2021/06/03 13:17:55"},
            {patient_id:100212, patient_name:"강병주", patient_state:"대기", receipt_datetime: "2021/06/03 13:50:11"},
            {patient_id:100002, patient_name:"임꺽정", patient_state:"대기", receipt_datetime: "2021/06/03 14:36:31"}
        ];
        return patients;
    }

    const [patients, setpatients] = useState(getPatients);
    const [selectedPatient, setSelectP] = useState({
        patient_id: ""
    });

    const selectPatient = (child_patient_id) => {
        setSelectP({
            ...selectedPatient,
            patient_id: child_patient_id
        });
        
    };
   
    /* 증상 리스트  */
    function getSympTom(){
        const symptoms = [
            {search_id:"1", symptom_name:"고혈압", symptom_code:"BLD05", bundle_code:"C2202", bundle_name:"Total Protein", bundle_specimen:"Urine, 24hrs", bundle_bottle:"UrinePack", bundle_lab:"검사실2"},
            {search_id:"2", symptom_name:"고혈압", symptom_code:"BLD05", bundle_code:"E6540", bundle_name:"Blood Pressure", bundle_specimen:"", bundle_bottle:"", bundle_lab:"검사실2" },
            {search_id:"3", symptom_name:"고혈압", symptom_code:"BLD05", bundle_code:"C3791", bundle_name:"Na (Sodium)" , bundle_specimen:"Serum", bundle_bottle:"SST(8ml)", bundle_lab:"검사실1"},
            {search_id:"4", symptom_name:"당뇨", symptom_code:"ARQ21", bundle_code:"A3791", bundle_name:"PICKE" , bundle_specimen:"Serum", bundle_bottle:"SST(8ml)", bundle_lab:"검사실1"}
        ];
        return symptoms;
    }

    const [symptoms, setSympToms] = useState(getSympTom);
    const [symptomsCopy, setSympTomCopys] = useState([]);
    const [selectSymptoms, setSelectSymptoms] = useState([]);

    const [search, setSearch] = useState({
        symptom_name : ""
    });
    
    const handleChange = (event) => {
        setSearch({
            ...search,
            symptom_name : event.target.value
            
        })
    };

    const searchSymptom = (symptom_name) => { //검색
            const symptomInput = symptoms.filter(symptom => symptom.symptom_name === symptom_name);
            setSympTomCopys([
                ...symptomInput
            ])
    };
    const selectSymptom = (symptom_name) => { //선택
        if(selectSymptoms.find(symptom => symptom.symptom_name === symptom_name)){  //같은 증상이 이미 들어가 있으면 추가 못 함.
        }   
        else{//추가
          const symptomSelect = symptoms.filter(symptom => symptom.symptom_name === symptom_name);
          setSelectSymptoms(selectSymptoms.concat([
              ...symptomSelect
          ]));  
        }
            
    };
    const deletePrescript = (search_id) => {  // 삭제
        const symptomSelect = selectSymptoms.filter(symptom => symptom.search_id !== search_id);
        setSelectSymptoms([
            ...symptomSelect
        ]);  
    };

    const deleteAll = (event) => {  //전체 삭제
        const symptomSelect = selectSymptoms.filter(symptom => symptom.search_id !== symptom.search_id);
        setSelectSymptoms([
            ...symptomSelect
        ]);  
    };

    /*검사 요청시 증상 및 소견에 해당 환자의 진료 추가되는 부분*/ 

    function getOpinion(){
        const opinions = [
            {receipt_id:"2020", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-13", patient_id:100552, diagnostic_test_state:"검사 완료"},
            {receipt_id:"2022", receipt_opinion:"이중인격 의심. 심리 검사 후 재진 필요", receipt_datetime:"2021-06-10", patient_id:100552 , diagnostic_test_state:""},
            {receipt_id:"2051", receipt_opinion:"정상인거 의심... 더 이상 재진 필요 없음", receipt_datetime:"2021-06-11", patient_id:100412, diagnostic_test_state:"검사 완료"},
            {receipt_id:"2072", receipt_opinion:"정상인거 의심... 더 이상 재진 필요 없음", receipt_datetime:"2021-06-02", patient_id:100412, diagnostic_test_state:"검사 완료"},
            {receipt_id:"2042", receipt_opinion:"어디에나 끼는 병 의심심각함", receipt_datetime:"2021-06-13", patient_id:100732, diagnostic_test_state:""},
            {receipt_id:"2152", receipt_opinion:"형님병 의심", receipt_datetime:"2021-06-13", patient_id:100732, diagnostic_test_state:""},
            {receipt_id:"3521", receipt_opinion:"중2병 의심. 심리 검사 후 재진 필요", receipt_datetime:"2021-06-07", patient_id:100212, diagnostic_test_state:""},
            {receipt_id:"7212", receipt_opinion:"사진증 의심... 사진 찍을 때만 옷 입는...", receipt_datetime:"2021-06-01", patient_id:100212, diagnostic_test_state:"검사 완료"},
            {receipt_id:"9921", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-23", patient_id:100002, diagnostic_test_state:"검사 완료"},
            {receipt_id:"9429", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-18", patient_id:100002, diagnostic_test_state:"검사 완료"},
            {receipt_id:"5255", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-11", patient_id:100002, diagnostic_test_state:"검사 완료"},
            {receipt_id:"9531", receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_datetime:"2021-06-18", patient_id:100002, diagnostic_test_state:"검사 완료"}
           
            
            
        ];
        return opinions;
    }

    const [opinions, setOpinions] = useState(getOpinion);
    const fatientOpinion = opinions.filter(opinion => opinion.patient_id === selectedPatient.patient_id);

    const [newReceipt_id, setNewReceipt_id] = useState(10000);

    const testRequest = (event) => {
        let flag = true;
        for(let op of opinions) {
            if(op.diagnostic_test_state === '검사 중') {
                flag = false;
            }
        }
        if(selectedPatient.patient_id && flag && selectSymptoms.length !== 0) {
            console.log(opinions);
                setOpinions(opinions.concat({
                    patient_id: selectedPatient.patient_id,
                    receipt_id: newReceipt_id,
                    receipt_opinion: "검사 완료 후 소견 작성 필요",
                    receipt_datetime: new Date().toLocaleDateString(),
                    diagnostic_test_state:"검사 중"
                }));
                setNewReceipt_id(newReceipt_id + 1);

        }
    }; 
     

    return(
        <>
        <Header />
        <div className="d-flex flex-column">
            <div>
                <div className="d-flex flex-row ml-3 mr-2 mt-4 mb-2">
                    <div className={cx("diagnosis-component-background", "diagnosis-patient-widthAndHeight", "mr-3")}>
                      <PatientList selectedPatient={selectedPatient} patients={patients} selectPatient={selectPatient}/>
                    </div>
                    <div className={cx("diagnosis-component-background", "diagnosis-symptom-widthAndHeight", "mr-3")}>
                      <SymptomSearch symptomsCopy={symptomsCopy} search={search} handleChange={handleChange} searchSymptom={searchSymptom} selectSymptom={selectSymptom}/>
                    </div>
                    <div className={cx("diagnosis-component-background", "diagnosis-medicine-widthAndHeight")}>
                      <MedicinePrescriptionList/>
                    </div>
                </div>
                
            </div>
            <div className="d-flex flex-row ">
                <div className={cx("diagnosis-checkList-widthAndHeight","diagnosis-checkList-Height", "ml-3")}>
                      <DiagnosticCheckList selectSymptoms={selectSymptoms} setSelectSymptoms={setSelectSymptoms} deletePrescript={deletePrescript} deleteAll={deleteAll} testRequest={testRequest}/>
                </div>
                <div className={cx("diagnosis-component-background","diagnosis-opinionAndSearch-Height")}>
                    <OpinionAndSearch fatientOpinion={fatientOpinion}/>
                </div>
            </div>
        </div>
        <DialMenu />
        </>
        
    );

}

export default Diagnosis;