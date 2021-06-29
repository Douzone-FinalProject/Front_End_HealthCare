function TestAfterMedicineListItem(props) {
    console.log("TestAfterMedicineListItem 진입");
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

export default TestAfterMedicineListItem;