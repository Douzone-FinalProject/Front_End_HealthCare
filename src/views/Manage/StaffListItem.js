import React from "react";
function StaffListItem(props) {

    return(
            
                <tr onDoubleClick={() => props.openStaffInfo(props.staff.staff_id)} key={props.staff.staff_id} >
                    <td style={{width:"100px"}}>{props.staff.staff_name}</td>
                    <td style={{width:"100px"}}>{props.staff.staff_phone.slice(0,3)}-{props.staff.staff_phone.slice(3,7)}-{props.staff.staff_phone.slice(7,11)}</td>
                    <td style={{width:"100px"}}>{props.staff.staff_login_id}</td>
                    {props.staff.staff_enabled === 1 && <td style={{color:"#3bc9db", width:"100px"}}>활성화</td>}
                    {props.staff.staff_enabled === 0 && <td style={{color:"darkgrey", width:"100px"}}>비활성화</td>}
                    <td style={{width:"60px"}}>{props.staff.hospital_name}</td>
                   
                    
                </tr>
    );
}

export default React.memo(StaffListItem);