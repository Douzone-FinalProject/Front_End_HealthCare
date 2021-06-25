import { useState } from "react";
function MedicinePrescriptionListItem(props) {

    // const [imsy, setImsy] = useState("");
    const deleteMedicine = (event) => {
        props.deleteMedicine(event);
    };
    
    // const handleCount = (event) => {
    //     // setImsy(event)
    //     props.handleCount(event);
    // }

    return(
        <tr key={props.medicine.medicine_id}>
            <td onClick={()=>{deleteMedicine(props.medicine.medicine_id)}} className="bold">X</td>
            <td>{props.medicine.medicine_id}</td>
            <td>{props.medicine.medicine_name}</td>
            <td>{props.medicine.medicine_unit}</td>
            <td><input onChange={event=> {props.handleCount(event,props.medicine.medicine_id)}} type="text" name="medicine_pre_quantity" style={{width:"40px"}}/></td>
            
        </tr>
    );
}

export default MedicinePrescriptionListItem;