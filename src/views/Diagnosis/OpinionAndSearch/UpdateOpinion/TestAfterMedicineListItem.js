import React from 'react';
function TestAfterMedicineListItem(props) {
    
    return(
        

        <tr key={props.hoho2.medicine_id}>
            <td></td>
            <td></td>
            <td>{props.hoho2.medicine_id}</td>
            <td></td>
            <td>{props.hoho2.medicine_name}</td>
            <td></td>
            <td>{props.hoho2.medicine_unit}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{props.hoho2.quantity}</td>
            <td></td>
            <td></td>
        </tr>
    );
}

export default React.memo(TestAfterMedicineListItem);