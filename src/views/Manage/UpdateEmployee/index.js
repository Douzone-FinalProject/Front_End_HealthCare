import Modal from "react-modal";
import classnames from "classnames/bind";
import style from "../Manage.module.css"
import {TextField } from "@material-ui/core";
import Button from "views/common/Button";
// import OpinionMedicineListItem from "./OpinionMedicineListItem";
// import TestAfterMedicineListItem from "./TestAfterMedicineListItem";
// import Button from "../../../common/Button";
// import { MDBTable, MDBTableBody } from 'mdbreact';

const cx = classnames.bind(style);
const staffInfoStyles = {
    content: {
        width: '450px',
        height: '480px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('body');
function UpdateEmployee(props) {
    
    return(
        
    <>
     <Modal
            isOpen={props.updateIsOpen}
            onRequestClose={props.closeUpdateModal}
            style={staffInfoStyles}
        >
       <h5 className="mb-4">직원 생성</h5>
            <div className="row">
                <div className="col-7">
                    <div className="d-flex flex-column">
                        <TextField style={{width:"200px", marginBottom:"10px"}} name="staff_name" value={props.nowStaff.staff_name} label="NAME" variant="outlined"  />
                        <div className="d-flex flex-row">
                            <TextField style={{width:"100px", marginBottom:"10px"}} name="phone1" value={props.nowStaff.staff_phone}  label="Phone" variant="outlined" />
                        </div>
                        ID<TextField style={{width:"390px", marginBottom:"10px"}} name="staff_login_id" value={props.nowStaff.staff_login_id} variant="outlined" />
                    </div> 
                    <TextField style={{width:"80px", marginBottom:"10px"}} name="staff_enabled" value={props.nowStaff.staff_enabled} variant="outlined" />
                    {/* <OutlinedInput
                    style={{width:"390px"}}
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange2('password')}
                        name="staff_login_pwd"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    /> */}
                </div>
            </div>
            <hr/>
            
            <div className="d-flex justify-content-end">
                <Button className={cx("mr-1")}>저장</Button>
                <Button className={cx("mr-1")} onClick={props.deleteStaff}>삭제</Button>
                <Button className={cx()} onClick={props.closeUpdateModal}>닫기</Button>
            </div>
        </Modal>    
    </>
    );
}

export default UpdateEmployee;