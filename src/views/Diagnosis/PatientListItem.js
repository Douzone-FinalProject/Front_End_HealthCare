import React from "react";
function PatientListItem(props) {

    return(
        <>
                {props.selectedPatient.patient_id === props.patient.patient_id ? 

                <tr key={props.patient.patient_id} onClick={(e) => {props.selectPatient(props.patient.patient_id, props.patient.patient_name, props.patient.receipt_state, props.patient.receipt_id)}} style={{backgroundColor:"#c5f6fa"}}>
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
                
                <tr key={props.patient.patient_id} onClick={(e) => {props.selectPatient(props.patient.patient_id, props.patient.patient_name, props.patient.receipt_state, props.patient.receipt_id)}} >
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
               </>
    );
}

export default React.memo(PatientListItem);