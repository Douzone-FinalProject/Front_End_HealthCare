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
import { searchSymptomB, createRequestTest, fatientOpinions, createOpinion, createMedicines, readOpinion, receiptMedicines, updateOpinion, updateOpinionOfMedicines, updateTestAndReceiptState } from "apis/diagnostic";
import { getReceiptList } from "apis/receipt";
import { useSelector } from "react-redux";
import { sendRedisMessage } from "apis/message";

const cx = classnames.bind(style);

function Diagnosis (props) {
    /* 환자 리스트  */
   
    const [patients, setpatients] = useState([]);

    const globalHospital = useSelector((state) => state.authReducer.hospital_id);
    const pubMessage = {
        topic:'/'+globalHospital+'/#',
        content:'ChangeReceiptState',
    };
    
    const receiptPatients = async() => {
        try{
        const response = await getReceiptList();
        setpatients(response.data.receiptList);
        }
        catch(error){
            console.log(error);
        }
    };

    // const [changeSort, setChangeSort] = useState(1);

    // const receiptingLists = async (sort) => {
    //     // setChangeSort(sort)
    //     // // console.log(sort)
    //     // if(changeSort == 1){
         
    //     //     console.log("1들어옴")   
    //     //     const response = await getReceiptList();
    //     //     setpatients(response.data.receiptList)
    //     // }else if(changeSort == 2){
        
    //     //     // console.log(h)
    //     //     console.log("2들어옴")
    //     //     // const zz = patients.filter(receiptList => receiptList.receipt_state === '진료중');
    //     //     const response = await getReceiptList();
    //     //     setpatients(response.data.receiptList)
    //     //     // setpatients(zz)
    //     // }else if(changeSort == 3){

    //     //     // console.log(h)
    //     //     console.log("3들어옴")
    //     //     // const zz = patients.filter(receiptList => receiptList.receipt_state === '검사중');
    //     //     // setpatients(zz)
    //     //     const response = await getReceiptList();
    //     //     setpatients(response.data.receiptList)
    //     // }
        
        
    // };
  

    useEffect(() => {
        receiptPatients();
    }, [])


    const [selectedPatient, setSelectP] = useState({
        patient_id: "",
        patient_name: "",
        receipt_state: "",
        receipt_id: ""
    });

    const [fatientOpinion, setFatientOpinion] = useState([]);
    const [reportOp, setReportOp] = useState();
    // const [reportOpList, setReportOpList] = useState();

    const selectPatient = async (child_patient_id, child_patient_name, child_receipt_state, child_receipt_id) => {
        if(child_receipt_state !== "진료중"){
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
                receipt_state: child_receipt_state,
                receipt_id: child_receipt_id
            });
            const response = await fatientOpinions(child_patient_id);
            setReportOp(response.data.fatientOpinionsList[0]);

            // console.log(reportOp);

            const selectPatientChart = response.data.fatientOpinionsList;
            const chartOfNotNull = selectPatientChart.filter(opinion => opinion.receipt_opinion !== null) // 일단 테스트라 null로 바꿔야 함 후에
           
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
            console.log(error);

        }     
    };

    const symptomEnter = (e, symptom_name) => {
        if(e.key === 'Enter'){
            searchSymptom(symptom_name);
        }
    }
   
    const selectSymptom = (symptom_name) => { //선택
       
        for(let i of symptomsCopy){
           
            if(i.search_id !== selectSymptoms.map(x => x.search_id)){
                // console.log("같은게 없을시 추가 ")
                
                setSelectSymptoms(selectSymptoms.concat([
                    ...symptomsCopy
                ]));  
                const selectAfterDelete = symptomsCopy.filter(symptom => symptom.search_id !== symptom.search_id);
                setSympTomCopys([
                    ...selectAfterDelete
                ])
            }
            

        for(let z of selectSymptoms){
                
            if(i.search_id === z.search_id){

                
                setSelectSymptoms(selectSymptoms.concat([
                        
                ]));  
                Swal.fire({
                    icon: 'error',
                    title: '중복된 요청이 존재합니다.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            else if(z.search_id !== z.search_id){
                // console.log("같은게 없을시2")
                    setSelectSymptoms(selectSymptoms.concat([
                        ...symptomsCopy
                    ]));  
                    const selectAfterDelete = symptomsCopy.filter(symptom => symptom.search_id !== symptom.search_id);
                    setSympTomCopys([
                        ...selectAfterDelete
                    ])
                    
                }
            }
        }
        
     
    };
    
    const deletePrescript = (search_id) => {  // 삭제
        const symptomSelect = selectSymptoms.filter(symptom => symptom.search_id !== search_id);
        setSelectSymptoms([
            ...symptomSelect
        ]);  
    };

    const deleteBeforePrescript = (search_id) => {  // 증상 검색 리스트에서의 삭제
        const symptomSelect = symptomsCopy.filter(symptom => symptom.search_id !== search_id);
        setSympTomCopys([
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


    const globalName = useSelector((state) => state.authReducer.staff_name);

    const testRequest = async (event) => { //검사 요청                          **'검사완료'상태인거는 소견 및 약 처방 후 진료 상태를'수납전'으로 바꾸게 하고 검사 상태를 '처방완료'로 나타내게 하기**
                try{
                    if(selectedPatient.patient_id && selectSymptoms.length !== 0) {
                        //검사 요청시 검사 목록, 진료id insert
                        let rtList=[];
                        for(let i of selectSymptoms){
                            rtList.push({search_id: i.search_id, receipt_id: selectedPatient.receipt_id, doctor_name: globalName});
                        }
                        await createRequestTest(rtList);

                        const reFatientOpinions = await fatientOpinions(selectedPatient.patient_id);
                        setFatientOpinion(reFatientOpinions.data.fatientOpinionsList)
                        // const reReceiptList = await getReceiptList();
                        // setpatients(reReceiptList.data.receiptList);
                        await sendRedisMessage(pubMessage);
                        deleteAll();
                        setSelectP({
                            patient_id: ""
                        })

                        Swal.fire({
                            icon: 'success',
                            title: '검사 요청을 완료하였습니다.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                catch(error){
                    props.history.push("/page403");
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
        for(let i of data){
            if(i.medicine_id !== medicines.map(x => x.medicine_id)){
                // console.log("같은게 없을시 추가 ")
                setMedicines(medicines.concat([
                    ...data
                ]));  
            }
        for(let z of medicines){
            if(i.medicine_id === z.medicine_id){
                setMedicines(medicines.concat([       
                ]));  
                Swal.fire({
                    icon: 'error',
                    title: '중복된 약이 존재합니다.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else if(z.medicine_id !== z.medicine_id){
                // console.log("같은게 없을시2")
                    setMedicines(medicines.concat([
                        ...data
                    ]));    
                }
            }
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
        handleT();
            if(medicines.some(z => z.quantity === null) || medicines.some(z => z.quantity === '')|| medicines.some(z => z.quantity == 0)){
                Swal.fire({
                    icon: 'error',
                    title: '약 수량을 입력해주세요.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else {
                
                setIsOpen(true);
                
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
        if(reportOp.diagnostic_test_state !== '검사완료'){ // 즉 검사 완료 후 바로 또 접수를 해서 진료를 받을 경우(한 진료id로 또 올 경우 and 검사완료 상태 일 경우) 신규 소견 작성이 안됨
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
                        cmlist.push({medicine_id: i.medicine_id, quantity: i.quantity, receipt_id: selectedPatient.receipt_id})
                    }
                    await createMedicines(cmlist);
                    const newOpinion = {...reportOp};
                    await createOpinion(newOpinion);

                    await sendRedisMessage(pubMessage);
                    const reFatientOpinions = await fatientOpinions(selectedPatient.patient_id);
                    setFatientOpinion(reFatientOpinions.data.fatientOpinionsList)
                    
                    deleteMedicineAll();
                    closeModal()
                    Swal.fire({
                        icon: 'success',
                        title: '진료 작성이 완료되었습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
                catch(error){
                    props.history.push("/page403");
                    console.log(error);
                }
            }
                
            else{

                try{
                    const newOpinion = {...reportOp};
                    await createOpinion(newOpinion);
                    await sendRedisMessage(pubMessage);
                    const reFatientOpinions = await fatientOpinions(selectedPatient.patient_id);
                    setFatientOpinion(reFatientOpinions.data.fatientOpinionsList)
                    
                    setSelectP({
                        patient_id: ""
                    })
                    closeModal()
                    Swal.fire({
                        icon: 'success',
                        title: '진료 작성이 완료되었습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
            
                    }
                    catch(error){
                        props.history.push("/page403");
                        console.log(error);
                    }
            }

        }
        else{
            Swal.fire({
                icon: 'error',
                title: '최근 검사 완료인 항목에 처방해주세요.',
                showConfirmButton: false,
                timer: 1500
            })
        }
                
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
    const [opmedic, setOpmedic] = useState([]);

    function openUpdateModal() {
        setUpdateIsOpen(true);
    }

    function closeUpdateModal() {
        setUpdateIsOpen(false);
    }
    
    const openOpinion = async (receipt_id) => {
        
            if(medicines.length !== 0){
                handleT();
                if(medicines.some(z => z.quantity === null) || medicines.some(z => z.quantity === '')|| medicines.some(z => z.quantity == 0)){
                    Swal.fire({
                        icon: 'error',
                        title: '약 수량을 입력해주세요.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else {
                    setUpdateIsOpen(true);
                    const response2 = await readOpinion(receipt_id);
                    const getOpinion = response2.data.readReceiptOpinion;
                    setOpp(getOpinion)
                }



                
                
            }
            else{
                setUpdateIsOpen(true);
                setOpmedic()
                const response = await receiptMedicines(receipt_id);
                setOpmedic(response.data.readReceiptMedicines)
                const response2 = await readOpinion(receipt_id);
                const getOpinion = response2.data.readReceiptOpinion;
                setOpp(getOpinion)
            }
    }
    


    const updatOpinion = (event) => {
        setOpp({
            ...opp,
            [event.target.name]: event.target.value
        })
        
    }

    const saveOpinion = async (diagnostic_test_state) => {
        try{
            if(medicines.length === 0){
                if(diagnostic_test_state === "검사완료"){
                    const handleOpinion = {...opp};
                    await updateOpinion(handleOpinion);
                    await updateTestAndReceiptState(opp.receipt_id);
                    const reFatientOpinions = await fatientOpinions(selectedPatient.patient_id);  //-검사 요청 후 검사 소견에 검사 후 진료 작성 후 실행 시키기(새로 고침 역할)
                    setFatientOpinion(reFatientOpinions.data.fatientOpinionsList)
                    //검사완료-> 처방완료 and 진료 상태를 '수납전'으로 바꾸기
                    await sendRedisMessage(pubMessage);
                    Swal.fire({
                        icon: 'success',
                        title: '수정이 완료되었습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setOpinionCopys([]);
                    closeUpdateModal();
                    deleteMedicineAll();  


                }
                else{
                    const handleOpinion = {...opp};
                    await updateOpinion(handleOpinion);
                    const reFatientOpinions = await fatientOpinions(selectedPatient.patient_id); 
                    setFatientOpinion(reFatientOpinions.data.fatientOpinionsList)
                    
                    Swal.fire({
                        icon: 'success',
                        title: '수정이 완료되었습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setOpinionCopys([]);
                    closeUpdateModal();
                    deleteMedicineAll();  
                }

            }
            else{
                Swal.fire({
                    icon: 'info',
                    title: '약 처방 후 완료해주세요.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        
        }catch(error){
            props.history.push("/page403");
            console.log(error)
        }
    }

    const saveMedicine = async (receipt_id) => {
        try{
        let handleMedicines=[]
        for(let i of medicines){
            handleMedicines.push({medicine_id: i.medicine_id, quantity: i.quantity, receipt_id: receipt_id})
        }
        await updateOpinionOfMedicines(handleMedicines, receipt_id);

        const response = await receiptMedicines(receipt_id);
        setOpmedic(response.data.readReceiptMedicines)
       
       Swal.fire({
        icon: 'success',
        title: '약 처방이 완료되었습니다.',
        showConfirmButton: false,
        timer: 1500
    })
       
       setMedicines(medicines && medicines.filter(medicine => medicine.medicine_id !== medicine.medicine_id)); 
    }
    catch(error){
        props.history.push("/page403");
    }
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

    const realTimeReceiptList = async () => {
        const response = await getReceiptList();
        setpatients(response.data.receiptList);
    };

    const [opinionsCopy, setOpinionCopys] = useState([]);

    useEffect(() => {
        console.log("증상 선택 및 소견 추가시 재실행")
    }, [opinionsCopy])
    
    return(
        <>
        <Header realTimeReceiptList={realTimeReceiptList}/>
        <div className="d-flex flex-column">
            <div>
                <div className="d-flex flex-row ml-3 mr-2 mt-2 mb-2">
                    <div className={cx("diagnosis-component-background", "diagnosis-patient-widthAndHeight", "mr-3")}>
                      <PatientList  selectedPatient={selectedPatient} patients={patients} setpatients={setpatients} selectPatient={selectPatient} />
                    </div>
                    <div className={cx("diagnosis-component-background", "diagnosis-symptom-widthAndHeight", "mr-3")}>
                      <SymptomSearch symptomEnter={symptomEnter} deleteBeforePrescript={deleteBeforePrescript} selectedPatient={selectedPatient} symptomsCopy={symptomsCopy} search={search} handleChange={handleChange} searchSymptom={searchSymptom} selectSymptom={selectSymptom}/>
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
                    <OpinionAndSearch opinionsCopy={opinionsCopy} setOpinionCopys={setOpinionCopys} opmedic={opmedic} fatientOpinion={fatientOpinion} medicines={medicines} selectedPatient={selectedPatient} handleCount={handleCount} quantity={quantity} handleT={handleT} reportOpinion={reportOpinion} modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} updateIsOpen={updateIsOpen} openUpdateModal={openUpdateModal} closeUpdateModal={closeUpdateModal} openOpinion={openOpinion} selectOpinion={selectOpinion} selectReceipt_id={selectReceipt_id}  selectOpinion2={selectOpinion2} selectReceipt_id2={selectReceipt_id2} opp={opp} updatOpinion={updatOpinion} saveOpinion={saveOpinion} saveMedicine={saveMedicine} reportOp={reportOp} reportSuccess={reportSuccess} />
                </div>
                <DialMenu />
            </div>
            
        </div>
        </>
        
    );
    
}

export default Diagnosis;