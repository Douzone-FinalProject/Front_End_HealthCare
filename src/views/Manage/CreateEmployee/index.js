import Modal from "react-modal";
import style from "../Manage.module.css"
import classnames from "classnames/bind";
import { useState, useCallback } from "react";
import Button from "views/common/Button";
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import {IconButton, InputAdornment, OutlinedInput } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { addNewEmployee } from 'apis/manage';
import { useSelector } from "react-redux";

const cx = classnames.bind(style);

const customStyles = {
    content: {
        width: '450px',
        height: '480px',
        top: '50%',
        left: '44%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-30%, -50%)',
    },
};

Modal.setAppElement('body');
function CreateEmployee(props) {
    
    //Redux를 이용한 병원코드 가져오기
    const globalHospital = useSelector((state) => state.authReducer.hospital_id);
    
    //직원 정보 입력 상태
    const [employee, setEmployee] = useState({
        staff_name: '',
        staff_phone: '',
        staff_login_id: '',
        staff_login_pwd: '',
        hospital_id: globalHospital
    });
    
    //핸드폰 상태
    const [phone, setPhone] = useState({
        phone1: '010',
        phone2: '',
        phone3: ''
    });
    
    //핸드폰 번호 입력 함수
    const handlePhoneChange = (event) => {
        setPhone({
            ...phone,
            [event.target.name]: event.target.value,
        })
        if(event.target.name === 'phone1') {
            setEmployee({
                ...employee,
                staff_phone: event.target.value + phone.phone2 + phone.phone3
            })
        } else if(event.target.name === 'phone2') {
            setEmployee({
                ...employee,
                staff_phone: phone.phone1 + event.target.value + phone.phone3
            })
        } else if(event.target.name === 'phone3') {
            setEmployee({
                ...employee,
                staff_phone: phone.phone1 + phone.phone2 + event.target.value
            })
        }
    };
    
    //이름, ID 입력 함수
    const handleChange = (event) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        })
    };
    
    // 생성시 함수
    const handleSave = (argEmployee, argProps) => {
        if(argEmployee.staff_name && argEmployee.staff_login_id && argEmployee.staff_login_pwd && phone.phone2 && phone.phone3 ) {
            if(props.staffs.some(staff => staff.staff_login_id === argEmployee.staff_login_id)){
                Swal.fire({
                            icon: 'error',
                            title: '중복된 ID가 존재합니다',
                            showConfirmButton: false,
                            timer: 1500
                        })
            }
            else if (props.staffs.some(staff => staff.staff_phone === argEmployee.staff_phone)){
                Swal.fire({
                    icon: 'error',
                    title: '중복된 HP 입니다.',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                addEmployee(argEmployee);
                console.log(argEmployee)
                setValues({...values, password: ''})
                setEmployee({
                    ...employee,
                    staff_name: '',
                    staff_phone: '',
                    staff_login_id: '',
                    staff_login_pwd: ''
                });
            
                setPhone({
                    phone1: '010',
                    phone2: '',
                    phone3: ''
                });
                Swal.fire({
                    icon: 'success',
                    title: '신규 직원이 등록되었습니다.',
                    showConfirmButton: false,
                    timer: 1500
                })
                argProps.closeModal();
            }

        }
        else {
            Swal.fire({
                icon: 'error',
                title: '필수 사항을 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            })
        }
    };
    
    //직원 생성 함수
    const addEmployee = async (employee) => {
        try{
                console.log("생성")
                await addNewEmployee(employee);
                props.getStaffList();
        }catch(error){
            console.log(error)
        }
    } 

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
      });
    
      const handleChange2 = (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setEmployee({
            ...employee,
            staff_login_pwd: event.target.value
        })
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    return (
        <Modal
            isOpen={props.isModal}
            onRequestClose={props.closeModal}
            contentLabel="Create Patient Modal"
            style={customStyles}
        >
            <h5 className="mb-4">직원 생성</h5>
            <div className="row">
                <div className="col-7">
                    <div className="d-flex flex-column">
                        <TextField style={{width:"200px", marginBottom:"10px"}} name="staff_name" label="NAME" variant="outlined" onChange={handleChange} />
                        <div className="d-flex flex-row">
                            <TextField style={{width:"100px", marginBottom:"10px"}} name="phone1" value={phone.phone1} label="Phone" variant="outlined" />
                            <TextField style={{width:"100px", marginBottom:"10px"}} name="phone2" value={phone.phone2} variant="outlined" onChange={handlePhoneChange} />
                            <TextField style={{width:"100px", marginBottom:"10px"}} name="phone3" value={phone.phone3} variant="outlined" onChange={handlePhoneChange} />
                        </div>
                        ID<TextField style={{width:"390px", marginBottom:"10px"}} name="staff_login_id" variant="outlined" onChange={handleChange}/>
                    </div> 
                    PW
                    <OutlinedInput
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
                    />
                </div>
            </div>
            <hr/>
            
            <div className="d-flex justify-content-end">
                <Button className={cx("mr-1")} onClick={() => handleSave(employee, props)}>생성</Button>
                <Button className={cx()} onClick={props.closeModal}>닫기</Button>
            </div>
            
        </Modal>
    );
}

export default CreateEmployee;
