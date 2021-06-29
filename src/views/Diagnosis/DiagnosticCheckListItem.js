import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(-1),
    },
    
  }));
  


function DiagnosticCheckListItem(props) {
    const classes = useStyles();
    const deletePrescript = (event) => {
        props.deletePrescript(event);
    };
    
    return(
        <tr key={props.item.search_id}>
            <td onClick={()=>{deletePrescript(props.item.search_id)}}><IconButton aria-label="delete" className={classes.margin}><DeleteIcon fontSize="small"/></IconButton></td>
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