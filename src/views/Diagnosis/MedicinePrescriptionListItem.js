import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(-0.5),
    },
    
  }));

function MedicinePrescriptionListItem(props) {

    const classes = useStyles();
    
    const deleteMedicine = (event) => {
        props.deleteMedicine(event);
    };
    
    

    return(
        <tr key={props.medicine.medicine_id}>
            <td onClick={()=>{deleteMedicine(props.medicine.medicine_id)}}><IconButton aria-label="delete" className={classes.margin}><DeleteIcon fontSize="small"/></IconButton></td>
            <td>{props.medicine.medicine_id}</td>
            <td>{props.medicine.medicine_name}</td>
            <td>{props.medicine.medicine_unit}</td>
            <td><input onChange={event=> {props.handleCount(event,props.medicine.medicine_id)}} type="text" name="medicine_pre_quantity" style={{width:"40px"}}/></td>
            
        </tr>
    );
}

export default MedicinePrescriptionListItem;