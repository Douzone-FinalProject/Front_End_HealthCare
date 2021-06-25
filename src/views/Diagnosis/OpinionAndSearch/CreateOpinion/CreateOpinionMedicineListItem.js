function MedicinePrescriptionListItem(props) {
 
    return(
        

        <tr key={props.medicine.medicine_id}>
            <td>{props.medicine.medicine_id}</td>
            <td>{props.medicine.medicine_name}</td>
            <td>{props.medicine.medicine_unit}</td>
            <td>{props.medicine.quantity}</td>
        </tr>
    );
}

export default MedicinePrescriptionListItem;