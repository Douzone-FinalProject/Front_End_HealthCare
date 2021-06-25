function OpinionMedicineListItem(props) {
 
    return(
        

        <tr key={props.hoho.medicine_id}>
            <td>{props.hoho.medicine_id}</td>
            <td>{props.hoho.medicine_name}</td>
            <td>{props.hoho.medicine_unit}</td>
            <td>{props.hoho.quantity}</td>
        </tr>
    );
}

export default OpinionMedicineListItem;