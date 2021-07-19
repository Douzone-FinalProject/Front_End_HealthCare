import React from 'react';
function OpinionMedicineListItem(props) {
    
    return(
        

        <tr key={props.hoho.medicine_id}>
            <td></td>
            <td></td>
            <td>{props.hoho.medicine_id}</td>
            <td></td>
            <td>{props.hoho.medicine_name}</td>
            <td></td>
            <td>{props.hoho.medicine_unit}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{props.hoho.quantity}</td>
            <td></td>
            <td></td>
        </tr>
    );
}

export default React.memo(OpinionMedicineListItem);