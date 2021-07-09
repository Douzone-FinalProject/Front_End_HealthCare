import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const cx = classnames.bind(style);
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(-1),
      marginLeft: "20px"
    },
    
  }));

function SymptomSearchItem(props) {
    const classes = useStyles();
    return(
            
        <tr key={props.symptom.search_id}>
            <td style={{width:"55px", marginRight:"50px"}} onClick={()=>{props.deleteBeforePrescript(props.symptom.search_id)}}><IconButton aria-label="delete" className={classes.margin}><DeleteIcon fontSize="small"/></IconButton></td>
            <td>{props.symptom.symptom_name}</td>
            <td>{props.symptom.symptom_id}</td>
            <td>{props.symptom.bundle_id}</td>
            <td>{props.symptom.bundle_name}</td>
        </tr>
    );
}

export default SymptomSearchItem;