function PatientListItem(props) {

    const selectPatient = (patient_id, patient_name, receipt_state) => {
        props.selectPatient(patient_id, patient_name, receipt_state);
    };
    
    return(
                <tr key={props.patient.patient_id} onClick={() => {selectPatient(props.patient.patient_id, props.patient.patient_name, props.patient.receipt_state)}}>
                    <td>{props.patient.patient_id}</td>
                    <td>{props.patient.patient_name}</td>
                    {props.patient.receipt_state === "진료 중" && <td style={{color:"red"}}>{props.patient.receipt_state}</td>}
                    {props.patient.receipt_state === "수납 전" && <td style={{color:"blue"}}>{props.patient.receipt_state}</td>}  
                    {props.patient.receipt_state === "대기" && <td style={{color:"gold"}}>{props.patient.receipt_state}</td>}
                    {props.patient.receipt_state === "검사 중" && <td style={{color:"#3bc9db"}}>{props.patient.receipt_state}</td>}
                    <td>{props.patient.receipt_datetime}</td> 
                </tr>
    );
}

export default PatientListItem;