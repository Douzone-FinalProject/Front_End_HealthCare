import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(-1),
      marginLeft: "20px"
    },
    
  }));

function StaffListItem(props) {


  // const [phone, setPhone] = useState({
  //   phone1: props.staff.staff_phone.slice(0,3),
  //   phone2: props.staff.staff_phone.slice(3,7),
  //   phone3: props.staff.staff_phone.slice(7,11)
  // })
    const classes = useStyles();
    
    return(
            
                <tr onDoubleClick={() => props.openStaffInfo(props.staff.staff_id)} key={props.staff.staff_id} >
                    <td style={{width:"100px"}}>{props.staff.staff_name}</td>
                    <td style={{width:"100px"}}>{props.staff.staff_phone.slice(0,3)}-{props.staff.staff_phone.slice(3,7)}-{props.staff.staff_phone.slice(7,11)}</td>
                    <td style={{width:"100px"}}>{props.staff.staff_login_id}</td>
                    {/* <td style={{width:"50px", overflow:"hidden" ,textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{props.staff.staff_login_pwd}</td> */}
                    {props.staff.staff_enabled === 1 && <td style={{color:"#3bc9db", width:"100px"}}>활성화</td>}
                    {props.staff.staff_enabled === 0 && <td style={{color:"darkgrey", width:"100px"}}>비활성화</td>}
                    <td style={{width:"60px"}}>{props.staff.hospital_name}</td>
                   
                    
                </tr>
    );
}

export default StaffListItem;