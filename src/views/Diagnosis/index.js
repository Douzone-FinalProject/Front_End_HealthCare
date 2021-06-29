import PatientList from "./PatientList";
import SymptomSearch from "./SymptomSearch";
import DiagnosticCheckList from "./DiagnosticCheckList";
import OpinionAndSearch from "./OpinionAndSearch";
import MedicinePrescriptionList from "./MedicinePrescriptionList";
import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import {useState} from "react";
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import { useEffect } from "react";
import Swal from 'sweetalert2';

const cx = classnames.bind(style);

function Diagnosis (props) {
    /* 환자 리스트  */
    function getPatients() {
        const patients = [
            {patient_id:"100552", patient_name:"이채정", patient_state:"진료 중", receipt_datetime: "2021. 06. 03. 13:10:15"},
            {patient_id:"100412", patient_name:"조민상", patient_state:"진료 중", receipt_datetime: "2021. 06. 03 13:15:31"},
            {patient_id:"100732", patient_name:"임도희", patient_state:"대기", receipt_datetime: "2021. 06. 03 13:17:55"},
            {patient_id:"100212", patient_name:"강병주", patient_state:"대기", receipt_datetime: "2021. 06. 03 13:50:11"},
            {patient_id:"100002", patient_name:"임꺽정", patient_state:"대기", receipt_datetime: "2021. 06. 03 14:36:31"}
        ];
        return patients;
    }
    
    const [patients, setpatients] = useState(getPatients);
    console.log(setpatients)
    const [selectedPatient, setSelectP] = useState({
        patient_id: "",
        patient_name: "",
        patient_state: "",
    });

    const selectPatient = (child_patient_id, child_patient_name, child_patient_state) => {
        if(child_patient_state !== "진료 중"){
            Swal.fire({
                icon: 'info',
                title: '진료 상태인 환자만 선택 가능합니다.',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else{
            setSelectP({
                ...selectedPatient,
                patient_id: child_patient_id,
                patient_name: child_patient_name,
                patient_state: child_patient_state
            });
        }
        
        
    };
   
    /* 증상 리스트  */
    function getSympTom(){
        const symptoms = [
            {search_id:"1", symptom_name:"고혈압", symptom_code:"BLD05", bundle_code:"C2202", bundle_name:"Total Protein", bundle_specimen:"Urine, 24hrs", bundle_bottle:"UrinePack", bundle_lab:"검사실2"},
            {search_id:"2", symptom_name:"고혈압", symptom_code:"BLD05", bundle_code:"E6540", bundle_name:"Blood Pressure", bundle_specimen:"", bundle_bottle:"", bundle_lab:"검사실2" },
            {search_id:"3", symptom_name:"고혈압", symptom_code:"BLD05", bundle_code:"C3791", bundle_name:"Na (Sodium)" , bundle_specimen:"Serum", bundle_bottle:"SST(8ml)", bundle_lab:"검사실1"},
            {search_id:"4", symptom_name:"고혈압", symptom_code:"BLD05", bundle_code:"C3791", bundle_name:"Na (Sodium)" , bundle_specimen:"Serum", bundle_bottle:"SST(8ml)", bundle_lab:"검사실1"},
            {search_id:"5", symptom_name:"고혈압", symptom_code:"BLD05", bundle_code:"C3791", bundle_name:"Na (Sodium)" , bundle_specimen:"Serum", bundle_bottle:"SST(8ml)", bundle_lab:"검사실1"},
            {search_id:"6", symptom_name:"고혈압", symptom_code:"BLD05", bundle_code:"C3791", bundle_name:"Na (Sodium)" , bundle_specimen:"Serum", bundle_bottle:"SST(8ml)", bundle_lab:"검사실1"},
            {search_id:"7", symptom_name:"당뇨", symptom_code:"ARQ21", bundle_code:"A3791", bundle_name:"PICKE" , bundle_specimen:"Serum", bundle_bottle:"SST(8ml)", bundle_lab:"검사실1"}
        ];
        return symptoms;
    }

    const [symptoms, setSympToms] = useState(getSympTom);
    const [symptomsCopy, setSympTomCopys] = useState([]);
    const [selectSymptoms, setSelectSymptoms] = useState([]);
    console.log(setSympToms)
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

    const deleteAll = () => {  //전체 삭제
        
        const symptomSelect = selectSymptoms.filter(symptom => symptom.search_id !== symptom.search_id);
        setSelectSymptoms([
            ...symptomSelect
        ]);  
    };

    /*검사 요청시 증상 및 소견에 해당 환자의 진료 추가되는 부분*/ 

    function getOpinion(){
        const opinions = [
            {receipt_id:2020, receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_uniqueness: "", receipt_datetime:"2021-06-13", patient_id:"100552", patient_name:"이채정", diagnostic_test_state:"검사 완료", medicines: []},
            {receipt_id:2022, receipt_opinion:"이중인격 의심. 심리 검사 후 재진 필요", receipt_uniqueness: "", receipt_datetime:"2021-06-10", patient_id:"100552", patient_name:"이채정", diagnostic_test_state:"", medicines: []},
            {receipt_id:2051, receipt_opinion:"정상인거 의심... 더 이상 재진 필요 없음", receipt_uniqueness: "", receipt_datetime:"2021-06-11", patient_id:"100412", patient_name:"조민상", diagnostic_test_state:"검사 완료", medicines: []},
            {receipt_id:2072, receipt_opinion:"정상인거 의심... 더 이상 재진 필요 없음", receipt_uniqueness: "", receipt_datetime:"2021-06-02", patient_id:"100412", patient_name:"조민상",diagnostic_test_state:"검사 완료", medicines: []},
            {receipt_id:2042, receipt_opinion:"어디에나 끼는 병 의심심각함", receipt_uniqueness: "",  receipt_datetime:"2021-06-13", patient_id:"100732", patient_name:"임도희",diagnostic_test_state:"", medicine_id:'', medicines: []},
            {receipt_id:2152, receipt_opinion:"형님병 의심", receipt_uniqueness: "",  receipt_datetime:"2021-06-13", patient_id:"100732", patient_name:"임도희",diagnostic_test_state:"", medicines: []},
            {receipt_id:3521, receipt_opinion:"중2병 의심. 심리 검사 후 재진 필요", receipt_uniqueness: "",  receipt_datetime:"2021-06-07", patient_id:"100212", patient_name:"강병주",diagnostic_test_state:"", medicines: []},
            {receipt_id:7212, receipt_opinion:"사진증 의심... 사진 찍을 때만 옷 입는...", receipt_uniqueness: "",  receipt_datetime:"2021-06-01", patient_id:"100212", patient_name:"강병주", diagnostic_test_state:"검사 완료", medicines: []},
            {receipt_id:9921, receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_uniqueness: "",  receipt_datetime:"2021-06-23", patient_id:"100002", patient_name:"임꺽정", diagnostic_test_state:"검사 완료", medicines: []},
            {receipt_id:9429, receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_uniqueness: "",  receipt_datetime:"2021-06-18", patient_id:"100002", patient_name:"임꺽정", diagnostic_test_state:"검사 완료", medicines: []},
            {receipt_id:5255, receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_uniqueness: "",  receipt_datetime:"2021-06-11", patient_id:"100002", patient_name:"임꺽정", diagnostic_test_state:"검사 완료", medicines: []},
            {receipt_id:9531, receipt_opinion:"당뇨 의심. 혈액 검사 후 재진 필요", receipt_uniqueness: "",  receipt_datetime:"2021-06-18", patient_id:"100002", patient_name:"임꺽정", diagnostic_test_state:"검사 완료", medicines: []}
           
            
            
        ];
        return opinions;
    }

    const [opinions, setOpinions] = useState(getOpinion);

    opinions.sort((a,b) => {return b.receipt_id - a.receipt_id});
    const fatientOpinion = opinions.filter(opinion => opinion.patient_id === selectedPatient.patient_id);

    const [newReceipt_id, setNewReceipt_id] = useState(10000);

    const [testFlag, setTestFlag] = useState(1);

    const testRequest = (event) => { //검사 요청
       
        

                let flag = true;
                for(let op of opinions) {
                    if(op.diagnostic_test_state === '검사 중') {
                        if(op.patient_id === event.patient_id){
                            flag = false;
                            Swal.fire({
                                icon: 'error',
                                title: '이미 검사 중인 목록이 있습니다.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    }
                }

                if(selectedPatient.patient_id && flag && selectSymptoms.length !== 0) {

                    let time = new Date();
                    let yy = time.getFullYear();
                    let tempmm = time.getMonth() + 1;
                    let dd = time.getDate();

                    if(10 > tempmm){
                        let mm = '0'+tempmm;
                        let myDateString = yy + '-' + mm + '-' + dd;
                        setOpinions(opinions.concat({
                            receipt_id: newReceipt_id,
                            receipt_opinion: '검사 완료 후 소견 작성 필요',
                            receipt_uniqueness: '',
                            receipt_datetime: myDateString,
                            patient_id: selectedPatient.patient_id+'',
                            patient_name: selectedPatient.patient_name+'',
                            diagnostic_test_state:'검사 중',
                            medicines: [],
                            test_flag: testFlag
                        }));
                        setNewReceipt_id(newReceipt_id + 1);
                        setTestFlag(testFlag +1);
                        console.log(opinions)
                    }
                    else{
                        let myDateString = yy + '-' + tempmm + '-' + dd;
                        setOpinions(opinions.concat({
                            receipt_id: newReceipt_id,
                            receipt_opinion: '검사 완료 후 작성 필요',
                            receipt_uniqueness: '',
                            receipt_datetime: myDateString,
                            patient_id: selectedPatient.patient_id+'',
                            patient_name: selectedPatient.patient_name+'',
                            diagnostic_test_state:'검사 중',
                            medicines: [],
                            test_flag: testFlag
                        }));
                        setNewReceipt_id(newReceipt_id + 1);
                        setTestFlag(testFlag +1);
                    }
                    
                    deleteAll();
                    Swal.fire({
                        icon: 'success',
                        title: '검사 요청을 완료하였습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
               
    }; 
     
    /*약품 관련 */
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [medicines, setMedicines] =  useState([]);
    
    const handleModal = () => { //모달 창 열기, 닫기      
        setIsModalVisible(!isModalVisible);
    }
   
    const addMedicines =  (data) => {    //약품 '추가'한 목록을 상태에 저장
        setIsModalVisible(!isModalVisible);

        if(data.filter(x => medicines.includes(x)).length === 0) {
            setMedicines(
                medicines.concat(data)
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: '중복된 약이 존재합니다.',
                showConfirmButton: false,
                timer: 1500
            })
        }
    };
   
    
    const [quantity, setQuantity] = useState({});

    const handleCount = (event, medicine_id) => {    //약품 수량 핸들링.
        
        setQuantity({
            ...quantity,
            [medicine_id]: event.target.value
        })
        
    }


    const handleT = (event) => {
        let tempMedicines = medicines;
        for (let temp of tempMedicines) {
            for (let qt in quantity) {
                if(temp.medicine_id === qt) {
                    temp.quantity = quantity[qt]
                }
            }
        }
        
        setMedicines(tempMedicines); 
        
    }
    

    const deleteMedicineAll = () => {  //전체 삭제
            const deleteAll = medicines && medicines.filter(medicine => medicine.medicine_id !== medicine.medicine_id);
            setMedicines(deleteAll); 
       
    };
    const deleteMedicine = (event) => {  // 삭제
        const deleteAll = medicines.filter(medicine => medicine.medicine_id !== event);
        setMedicines(deleteAll); 
    };

    

    //소견 작성시 
    const [report ,setReport] = useState({
        receipt_opinion: "",
        receipt_uniqueness: ""
    })

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
        if(!medicines){
            
        }
        else{
            handleT();
        }
        
        
    }

    function closeModal() {
        setIsOpen(false);
    }

    const reportOpinion = (event) => {
        setReport({
            ...report,
            [event.target.name]: event.target.value
        })
        
        
    }

    
    const reportSuccess = (event) => {
        
        
            let time = new Date();
            let yy = time.getFullYear();
            let tempmm = time.getMonth() + 1;
            let dd = time.getDate();


        if(medicines) {
                
            
            if(10 > tempmm){

                let mm = '0'+tempmm;
                let myDateString = yy + '-' + mm + '-' + dd;

                setOpinions(opinions.concat({
                    receipt_id: newReceipt_id,
                    receipt_opinion: report.receipt_opinion,
                    receipt_uniqueness: report.receipt_uniqueness,
                    receipt_datetime: myDateString,
                    patient_id: selectedPatient.patient_id+'',
                    patient_name: selectedPatient.patient_name+'',
                    diagnostic_test_state:'',
                    medicines: [medicines]
                }));
                setNewReceipt_id(newReceipt_id + 1);
                console.log(opinions)
                closeModal()
            }
            else{

                let myDateString = yy + '-' + tempmm + '-' + dd;

                setOpinions(opinions.concat({
                    receipt_id: newReceipt_id,
                    receipt_opinion: report.receipt_opinion,
                    receipt_uniqueness: report.receipt_uniqueness,
                    receipt_datetime: myDateString,
                    patient_id: selectedPatient.patient_id+'',
                    patient_name: selectedPatient.patient_name+'',
                    diagnostic_test_state:'',
                    medicines: [medicines]
                }));
                setNewReceipt_id(newReceipt_id + 1);
                closeModal()
            }
        }
        else{
            if(10 > tempmm){

                let mm = '0'+tempmm;
                let myDateString = yy + '-' + mm + '-' + dd;

                setOpinions(opinions.concat({
                    receipt_id: newReceipt_id,
                    receipt_opinion: report.receipt_opinion,
                    receipt_uniqueness: report.receipt_uniqueness,
                    receipt_datetime: myDateString,
                    patient_id: selectedPatient.patient_id+'',
                    patient_name: selectedPatient.patient_name+'',
                    diagnostic_test_state:'',
                    medicines: []
                }));
                setNewReceipt_id(newReceipt_id + 1);
                closeModal()
            }
            else{

                let myDateString = yy + '-' + tempmm + '-' + dd;

                setOpinions(opinions.concat({
                    receipt_id: newReceipt_id,
                    receipt_opinion: report.receipt_opinion,
                    receipt_uniqueness: report.receipt_uniqueness,
                    receipt_datetime: myDateString,
                    patient_id: selectedPatient.patient_id+'',
                    patient_name: selectedPatient.patient_name+'',
                    diagnostic_test_state:'',
                    medicines: []
                }));
                setNewReceipt_id(newReceipt_id + 1);
                closeModal()
            }
        };
    
    }
    

    //소견 읽기, 수정
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [selectReceipt_id, setSelectReceipt_id] = useState({
            receipt_id: "",
            diagnostic_test_state: ""
    });
    const [selectReceipt_id2, setSelectReceipt_id2] = useState({
            receipt_id: "",
            diagnostic_test_state: ""
    });


    const [opp, setOpp] = useState({});

    function openUpdateModal() {
        setUpdateIsOpen(true);
    }

    function closeUpdateModal() {
        setUpdateIsOpen(false);
    }
    
    const openOpinion = (event) => {
        setUpdateIsOpen(true);
        if(medicines){
            handleT();
            let getOpinion;
            for(let i of opinions){
                  if(event === i.receipt_id){
                    getOpinion = i
                  }
            }
            setOpp(getOpinion);
        }
        else{
            let getOpinion;
            for(let i of opinions){
                  if(event === i.receipt_id){
                    getOpinion = i
                  }
            }
            setOpp(getOpinion);
        }
        
    }
    
    const updatOpinion = (event) => {
        setOpp({
            ...opp,
            [event.target.name]: event.target.value
        })
    }

    const saveOpinion = (event) => {
        
        
    for(let i of opinions){
            
        if(event === i.receipt_id){
            i.receipt_opinion = opp.receipt_opinion;
            i.receipt_uniqueness = opp.receipt_uniqueness;
        }
    }
    Swal.fire({
        icon: 'success',
        title: '수정이 완료되었습니다.',
        showConfirmButton: false,
        timer: 1500
    })
      closeUpdateModal();
      deleteMedicineAll();  
    }

    const saveMedicine = (event) => {
        
        for(let i of opinions){
            
            if(event === i.receipt_id){
              i.medicines.push(medicines);
            }
            
      }
       Swal.fire({
        icon: 'success',
        title: '약 처방이 완료되었습니다.',
        showConfirmButton: false,
        timer: 1500
    })
       
       setMedicines(medicines && medicines.filter(medicine => medicine.medicine_id !== medicine.medicine_id)); 
    }
    
    
    const selectOpinion = (event1, event2) => {
        setSelectReceipt_id({
            receipt_id: event1,
            diagnostic_test_state: event2
        });
        
    }

    const selectOpinion2 = (event1, event2) => {
        setSelectReceipt_id2({
            receipt_id: event1,
            diagnostic_test_state: event2
        });
    }
    useEffect(() => {
        console.log("증상 선택 및 소견 추가시 재실행")
    }, [selectSymptoms], [opinions])
    
    return(
        <>
        <Header />
        <div className="d-flex flex-column ">
            <div>
                <div className="d-flex flex-row ml-3 mr-2 mt-2 mb-2">
                    <div className={cx("diagnosis-component-background", "diagnosis-patient-widthAndHeight", "mr-3")}>
                      <PatientList selectedPatient={selectedPatient} patients={patients} selectPatient={selectPatient}/>
                    </div>
                    <div className={cx("diagnosis-component-background", "diagnosis-symptom-widthAndHeight", "mr-3")}>
                      <SymptomSearch selectedPatient={selectedPatient} symptomsCopy={symptomsCopy} search={search} handleChange={handleChange} searchSymptom={searchSymptom} selectSymptom={selectSymptom}/>
                    </div>
                    <div className={cx("diagnosis-component-background", "diagnosis-medicine-widthAndHeight")}>
                      <MedicinePrescriptionList isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} medicines={medicines} handleModal={handleModal} addMedicines={addMedicines} deleteMedicineAll={deleteMedicineAll} deleteMedicine={deleteMedicine} handleCount={handleCount} />
                    </div>
                </div>
                
            </div>
            <div className="d-flex flex-row ">
                <div className={cx("diagnosis-checkList-widthAndHeight","diagnosis-checkList-Height", "ml-3")}>
                      <DiagnosticCheckList selectedPatient={selectedPatient} selectSymptoms={selectSymptoms} setSelectSymptoms={setSelectSymptoms} deletePrescript={deletePrescript} deleteAll={deleteAll} testRequest={testRequest}/>
                </div>
                <div className={cx("diagnosis-component-background","diagnosis-opinionAndSearch-Height")}>
                    <OpinionAndSearch fatientOpinion={fatientOpinion} opinions={opinions} medicines={medicines} selectedPatient={selectedPatient} handleCount={handleCount} quantity={quantity} handleT={handleT} reportOpinion={reportOpinion} reportSuccess={reportSuccess} modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} updateIsOpen={updateIsOpen} openUpdateModal={openUpdateModal} closeUpdateModal={closeUpdateModal} openOpinion={openOpinion} selectOpinion={selectOpinion} selectReceipt_id={selectReceipt_id}  selectOpinion2={selectOpinion2} selectReceipt_id2={selectReceipt_id2} opp={opp} updatOpinion={updatOpinion} saveOpinion={saveOpinion} saveMedicine={saveMedicine} />
                </div>
                <DialMenu />
            </div>
            
        </div>
        </>
        
    );

}

export default Diagnosis;