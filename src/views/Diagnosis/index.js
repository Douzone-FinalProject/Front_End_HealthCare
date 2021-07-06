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
import { useSelector } from "react-redux";
import { searchSymptomB, createRequestTest, fatientOpinions, createOpinion, createMedicines, createRequestTestOpinion } from "apis/diagnostic";
import { getReceiptList } from "apis/receipt";

const cx = classnames.bind(style);

function Diagnosis (props) {
    /* 환자 리스트  */
   
    // const receiptList = useSelector((state) => state.receiptReducer.receiptList); // 상태 receipt_state 컬럼명으로 수정하기
    const [patients, setpatients] = useState([]);

    const receiptPatients = async() => {
        try{
        const response = await getReceiptList();
        setpatients(response.data.receiptList);
        }
        catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        receiptPatients();
    }, [])


    const [selectedPatient, setSelectP] = useState({
        patient_id: "",
        patient_name: "",
        patient_state: "",
        receipt_id: ""
    });

    const [fatientOpinion, setFatientOpinion] = useState([]);
    const [reportOp, setReportOp] = useState();

    const selectPatient = async (child_patient_id, child_patient_name, child_patient_state, child_receipt_id) => {
        if(child_patient_state !== "진료중"){
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
                patient_state: child_patient_state,
                receipt_id: child_receipt_id
            });
            const response = await fatientOpinions(child_patient_id);
            setReportOp(response.data.fatientOpinionsList[0]);

            console.log(reportOp);

            const selectPatientChart = response.data.fatientOpinionsList;
            const chartOfNotNull = selectPatientChart.filter(opinion => opinion.receipt_opinion !== "") // 일단 테스트라 null로 바꿔야 함 후에
           
            setFatientOpinion([
                ...chartOfNotNull
            ]);
            
        }
        
        
    };
    /* 증상 리스트  */
    
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

    const searchSymptom = async (symptom_name) => { //검색
        try{
            const response = await searchSymptomB(symptom_name);
            
            const symptomInput = response.data.list
            setSympTomCopys([
                ...symptomInput
            ])
        }
        catch(error){
            console.log(error)
        }
            
            
    };
    const selectSymptom = (symptom_name) => { //선택
        if(selectSymptoms.find(symptom => symptom.symptom_name === symptom_name)){  //같은 증상이 이미 들어가 있으면 추가 못 함.
        }   
        else{//추가
          setSelectSymptoms(selectSymptoms.concat([
              ...symptomsCopy
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

   

    const [opinions, setOpinions] = useState([]);

    

    const testRequest = async (event) => { //검사 요청
       
                if(selectedPatient.patient_id && selectSymptoms.length !== 0) {

                    //검사 요청시 검사 목록, 진료id insert
                    let rtList=[];
                    for(let i of selectSymptoms){
                        rtList.push({search_id: i.search_id, receipt_id: selectedPatient.receipt_id});
                    }
                    await createRequestTest(rtList);

                    const reFatientOpinions = await fatientOpinions(selectedPatient.patient_id);
                    setFatientOpinion(reFatientOpinions.data.fatientOpinionsList)
                    const reReceiptList = await getReceiptList();
                    setpatients(reReceiptList.data.receiptList);
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
   
    const handleT = () => {
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
        setReportOp({
            ...reportOp,
            [event.target.name]: event.target.value
        })
    }

    const reportSuccess = async () => {

        if(medicines.length !== 0) {

            try{
                let cmlist=[];
                let tempMedicines = medicines;
                for (let temp of tempMedicines) {
                    for (let qt in quantity) {
                      if(temp.medicine_id === qt) {
                          temp.quantity = quantity[qt]
                      }
                    }
                }
                setMedicines(tempMedicines); 

                for(let i of medicines){
                    cmlist.push({medicine_id: i.medicine_id, medicine_pre_quantity: i.quantity, receipt_id: selectedPatient.receipt_id})
                }
                await createMedicines(cmlist);
                const newOpinion = {...reportOp};
                await createOpinion(newOpinion);

                const reFatientOpinions = await fatientOpinions(selectedPatient.patient_id);
                setFatientOpinion(reFatientOpinions.data.fatientOpinionsList)
                deleteMedicineAll();
                const reReceiptList = await getReceiptList();
                setpatients(reReceiptList.data.receiptList);
                closeModal()

            }
            catch(error){
                console.log(error);
            }
        }
            
        else{

            try{
                const newOpinion = {...reportOp};
                await createOpinion(newOpinion);
                const reFatientOpinions = await fatientOpinions(selectedPatient.patient_id);
                setFatientOpinion(reFatientOpinions.data.fatientOpinionsList)
                const reReceiptList = await getReceiptList();
                setpatients(reReceiptList.data.receiptList);
                closeModal()
        
                }
                catch(error){
                    console.log(error);
                }
        }

        Swal.fire({
            icon: 'success',
            title: '진료 작성이 완료되었습니다.',
            showConfirmButton: false,
            timer: 1500
        })
                
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
                      <DiagnosticCheckList selectedPatient={selectedPatient} selectSymptoms={selectSymptoms} setSelectSymptoms={setSelectSymptoms} deletePrescript={deletePrescript} deleteAll={deleteAll} testRequest={testRequest} />
                </div>
                <div className={cx("diagnosis-component-background","diagnosis-opinionAndSearch-Height")}>
                    <OpinionAndSearch opinions={opinions} fatientOpinion={fatientOpinion} medicines={medicines} selectedPatient={selectedPatient} handleCount={handleCount} quantity={quantity} handleT={handleT} reportOpinion={reportOpinion} modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} updateIsOpen={updateIsOpen} openUpdateModal={openUpdateModal} closeUpdateModal={closeUpdateModal} openOpinion={openOpinion} selectOpinion={selectOpinion} selectReceipt_id={selectReceipt_id}  selectOpinion2={selectOpinion2} selectReceipt_id2={selectReceipt_id2} opp={opp} updatOpinion={updatOpinion} saveOpinion={saveOpinion} saveMedicine={saveMedicine} reportOp={reportOp} reportSuccess={reportSuccess} />
                </div>
                <DialMenu />
            </div>
            
        </div>
        </>
        
    );
    
}

export default Diagnosis;