import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import React from "react";
import Button from "../common/Button";
const cx = classnames.bind(style);

function DiagnosticCheckListItem(props) {

    const deletePrescript = (event) => {
        props.deletePrescript(event);
    };
    
    return(
        <tr key={props.item.search_id}>
            <td onClick={()=>{deletePrescript(props.item.search_id)}} className="bold">X</td>
            <td>{props.item.symptom_code}</td>
            <td>{props.item.bundle_code}</td>
            <td>{props.item.bundle_name}</td>
            <td>{props.item.bundle_specimen}</td>
            <td>{props.item.bundle_bottle}</td>
            <td>{props.item.bundle_lab}</td>
        </tr>
    );
}

export default DiagnosticCheckListItem;