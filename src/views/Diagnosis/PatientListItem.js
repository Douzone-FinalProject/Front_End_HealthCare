import PatientModal from '../Receipt/PatientModal';
import React, {useState, useEffect} from 'react';
import { getPatientById } from 'apis/receipt';

function PatientListItem(props) {
    // 모달 state
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [patientDetail, setPatientDetail] = useState({});
    
    const getPatient = async () => {
        const response = await getPatientById(props.patient.patient_id);
        setPatientDetail(response.data.patient);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const selectPatient = (patient_id, patient_name, receipt_state, receipt_id) => {
        props.selectPatient(patient_id, patient_name, receipt_state, receipt_id);
    };
    
    const handleDoubleClick = () => {
        getPatient();
        setModalIsOpen(true);
    }

    // {/* {props.selectedPatient.patient_id === props.patient.patient_id ? <td style={{color:"gold"}} >{props.patient.patient_id}</td> : <td>{props.patient.patient_id}</td>}
                    // {props.selectedPatient.patient_id === props.patient.patient_id ? <td style={{color:"gold"}} >{props.patient.patient_name}</td> : <td>{props.patient.patient_name}</td>} */}

    return(
        <>
                {props.selectedPatient.patient_id === props.patient.patient_id ? 

                <tr key={props.patient.patient_id} onClick={() => {selectPatient(props.patient.patient_id, props.patient.patient_name, props.patient.receipt_state, props.patient.receipt_id)}} style={{backgroundColor:"#c5f6fa"}}
                    onDoubleClick={() => {props.patient.receipt_state === "진료중" && handleDoubleClick()}}>  
                    <td>{props.patient.patient_id}</td>
                    <td>{props.patient.patient_name}</td>
                    {props.patient.receipt_state === "진료중" && <td style={{color:"red"}}>{props.patient.receipt_state}</td>}
                    {props.patient.receipt_state === "수납전" && <td style={{color:"blue"}}>{props.patient.receipt_state}</td>}  
                    {props.patient.receipt_state === "대기" && <td style={{color:"gold"}}>{props.patient.receipt_state}</td>}
                    {props.patient.receipt_state === "검사중" && <td style={{color:"#3bc9db"}}>{props.patient.receipt_state}</td>}
                    {props.patient.receipt_state === "완료" && <td style={{color:"black"}}>{props.patient.receipt_state}</td>}
                    <td>{props.patient.receipt_datetime.substring(10)}</td> 
                </tr>
                :
                
                <tr key={props.patient.patient_id} onClick={() => {selectPatient(props.patient.patient_id, props.patient.patient_name, props.patient.receipt_state, props.patient.receipt_id)}} 
                    onDoubleClick={() => {props.patient.receipt_state === "진료중" && handleDoubleClick()}}>  
                    <td>{props.patient.patient_id}</td>
                    <td>{props.patient.patient_name}</td>
                    {props.patient.receipt_state === "진료중" && <td style={{color:"red"}}>{props.patient.receipt_state}</td>}
                    {props.patient.receipt_state === "수납전" && <td style={{color:"blue"}}>{props.patient.receipt_state}</td>}  
                    {props.patient.receipt_state === "대기" && <td style={{color:"gold"}}>{props.patient.receipt_state}</td>}
                    {props.patient.receipt_state === "검사중" && <td style={{color:"#3bc9db"}}>{props.patient.receipt_state}</td>}
                    {props.patient.receipt_state === "완료" && <td style={{color:"black"}}>{props.patient.receipt_state}</td>}
                    <td>{props.patient.receipt_datetime.substring(10)}</td> 
                </tr>
                }
                <PatientModal patient={patientDetail} modalIsOpen={modalIsOpen} closeModal={closeModal}/>
        </>
    );
}

export default PatientListItem;