import Modal from "react-modal";
import classnames from "classnames/bind";
import style from "../Manage.module.css"
import {IconButton, InputAdornment, OutlinedInput, Switch, TextField } from "@material-ui/core";
import Button from "views/common/Button";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Swal from "sweetalert2";
import { updateStaffNoPw, updateStaff } from 'apis/manage';
import React from 'react';

const cx = classnames.bind(style);
const staffInfoStyles = {
    content: {
        width: '450px',
        height: '640px',
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

    const handleEnable = (event) => {
        console.log(event.target.value)
        props.setNowStaff({...props.nowStaff, staff_enabled: event.target.value});
        
    };

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });

    const [values2, setValues2] = useState({
        password: '',
        showPassword: false,
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        props.setNowStaff({
            ...props.nowStaff,
            staff_login_pwd: event.target.value
        })
      };
    const handleChange3 = (prop) => (event) => {
        setValues2({ ...values2, [prop]: event.target.value });
    };  
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowPassword2 = () => {
        setValues2({ ...values2, showPassword: !values2.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };
    const handleCheck = (event) => {
        console.log(event.target.checked)
        props.setState({ ...props.state, [event.target.name]: event.target.checked });
    };

    const saveEmployeeInfo = async (pw1, pw2) => {

        if(props.state.checkedA === false){   //??? ??????????????? ??? ??? ??????
            await updateStaffNoPw(props.nowStaff);
            props.getStaffList();
            props.setNowStaff({})
            props.closeUpdateModal();
            Swal.fire({
                icon: 'success',
                title: '????????? ?????????????????????.',
                showConfirmButton: false,
                timer: 1500
            })
        }




        else{ //??? ??????????????? ?????? ??? ??????
            if(pw1 === '' || pw2 === ''){
                Swal.fire({
                    icon: 'error',
                    title: '??????????????? ???????????????.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else if(pw1 !== pw2){
                Swal.fire({
                    icon: 'error',
                    title: '??????????????? ???????????? ????????????.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                await updateStaff(props.nowStaff);
                props.getStaffList();
                props.setNowStaff({})
                props.setState({...props.state, checkedA:false});
                setValues({ ...values, password: ''});
                setValues2({ ...values2, password: ''});
                props.closeUpdateModal();
                
                Swal.fire({
                    icon: 'success',
                    title: '????????? ?????????????????????.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }



        
    };
    
    return(
        
    <>
     <Modal
            isOpen={props.updateIsOpen}
            onRequestClose={props.closeUpdateModal}
            style={staffInfoStyles}
        >
       <h5 className="mb-4">?????? ??????</h5>
            <div className="row">
                <div className="col-7">
                    <div className="d-flex flex-column">
                        <TextField style={{width:"200px", marginBottom:"10px"}} name="staff_name" value={props.nowStaff.staff_name} onChange={props.updateNameAndIdChange}  variant="outlined"  />
                        <div className="d-flex flex-row" style={{marginBottom:"10px"}}>
                            <TextField style={{width:"100px", marginBottom:"10px"}} name="phone1" value={props.phone.phone1} onChange={props.updatePhoneChange}  variant="outlined" />
                            <TextField style={{width:"100px", marginBottom:"10px"}} name="phone2" value={props.phone.phone2} onChange={props.updatePhoneChange}  variant="outlined" />
                            <TextField style={{width:"100px", marginBottom:"10px"}} name="phone3" value={props.phone.phone3} onChange={props.updatePhoneChange}  variant="outlined" />
                        </div>
                            <select name="staff_enabled" style={{width:"150px", marginBottom:"10px"}} value={props.nowStaff.staff_enabled} onChange={handleEnable}>
                                <option value='1'>?????????</option>
                                <option value='0'>????????????</option>
                            </select>
                        
                        </div> 
                    ID<TextField style={{width:"390px", marginBottom:"10px"}} name="staff_login_id" value={props.nowStaff.staff_login_id} onChange={props.updateNameAndIdChange} variant="outlined" />
                    <div><Switch name="checkedA" color="primary" inputProps={{ 'aria-label': 'checkbox' }} checked={props.state.checkedA} onChange={handleCheck} /></div>
                    {props.state.checkedA === true ?
                    <>
                    New PW
                    <OutlinedInput 
                    style={{width:"390px"}}
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
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
                    />
                    New PW ??????
                    <OutlinedInput 
                    style={{width:"390px"}}
                        type={values2.showPassword ? 'text' : 'password'}
                        value={values2.password}
                        onChange={handleChange3('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                            edge="end"
                            >
                            {values2.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    </>
                    :
                    <>
                     <span style={{color:"#ced4da"}}>New PW</span>
                    <OutlinedInput disabled
                    style={{width:"390px"}} name="staff_login_pwd"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            edge="end"   
                            >
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    <span style={{color:"#ced4da"}}>New PW ??????</span>
                    <OutlinedInput disabled
                    style={{width:"390px"}} name="staff_login_pwd"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            edge="end"
                            >
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    </>
                    }
                </div>
            </div>
            <hr/>
            
            <div className="d-flex justify-content-end">
                <Button className={cx("mr-1")} onClick={() => saveEmployeeInfo(values.password, values2.password)}>??????</Button>
                <Button className={cx("mr-1")} onClick={props.deleteStaff}>??????</Button>
                <Button className={cx()} onClick={props.closeUpdateModal}>??????</Button>
            </div>
        </Modal>    
    </>
    );
}

export default React.memo(UpdateEmployee);