import style from "views/login.module.css";
import { useState } from "react";
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { login } from "apis/auth";
import { addAuthHeader } from "apis/axiosConfig";
import { useDispatch } from "react-redux";
import { createSetAuthTokenAction, createSetUidAction, createSetNameAction, createSetRoleAction, createSetHospitalAction } from "redux/auth-reducer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CustomRadio = withStyles({
  root: {
    color: "#748ffc",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function Login(props) {

    const [user, setUser] = useState({
        staff_login_id: "",
        staff_login_pwd: "",
        hospital_id:  "",
        staff_role: ""
    });
    const [role, setRole] = useState('')
    
    const dispatch = useDispatch();

    const handleChange = (event) => {
      setUser({
        ...user,
        [event.target.name]: event.target.value
      })
    };

    const handleRoleChange = (event) => {
      setRole(event.target.value);
      if(event.target.value === "doctor") {
        setUser({
          ...user,
          staff_role: "ROLE_DOCTOR"
        });
      } else {
        setUser({
          ...user,
          staff_role: "ROLE_NURSE"
        });
      }
    };

    const handleLogin = async () => {
      try {
        console.log(user);
        //로그인 요청
        const userInfo = {...user};
        const response = await login(userInfo);
        console.log(response.data);
        if(response.data.login_status === "success") {
          //요청 헤더에 JWT 토큰 추가
          addAuthHeader(response.data.authToken);
          //Redux에 인증 내용 저장
          dispatch(createSetUidAction(response.data.staff_login_id));
          dispatch(createSetAuthTokenAction(response.data.authToken));
          dispatch(createSetNameAction(response.data.staffName));
          dispatch(createSetRoleAction(response.data.staffRole));
          dispatch(createSetHospitalAction(response.data.hospital_id));
          //SessionStorage에 인증 내용 저장(브라우저 갱신시 사용)
          sessionStorage.setItem("staff_login_id", response.data.staff_login_id);
          sessionStorage.setItem("authToken", response.data.authToken);
          sessionStorage.setItem("staff_name", response.data.staffName);
          sessionStorage.setItem("staff_role", response.data.staffRole);
          sessionStorage.setItem("hospital_name", response.data.hospital_name);
          sessionStorage.setItem("hospital_id", response.data.hospital_id);

          //로그인한 이름과 권한 헤더에 보이게 하기
         

          if(role === 'doctor') {
            props.history.push('/diagnosis')
          } else if(role === 'nurse') {
            props.history.push('/receipt')
          } else {
            props.history.push('/teststate')
          }
        } else if(response.data.login_status === "hospitalIdFailure") {
            Swal.fire({
            icon: 'error',
            title: '병원코드가 맞지 않습니다.',
            showConfirmButton: false,
            timer: 1500
          })
        } else if(response.data.login_status === "roleFailure"){
            Swal.fire({
            icon: 'error',
            title: '권한이 일치하지 않습니다.',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
           Swal.fire({
            icon: 'error',
            title: 'ID 및 PW가 맞지 않습니다.',
            showConfirmButton: false,
            timer: 1500
          })
        }
      } catch(error) {
        alert("로그인에 실패하였습니다.")
        console.log(error);
      } 
    };

    return (
        
        <div className={style.loginbackGround}>
          <form className={style.loginForm}>
          
          <Link to="/"><img src="http://localhost:3000/douzone_mark.PNG" width="240px" height="45px" style={{marginTop:"7%", marginBottom:"7%"}} alt=""/></Link>
          
            <h3>의료정보시스템</h3>
              <div className={style.idForm}>
                  <input type="text" name="staff_login_id" value={user.staff_login_id}  className={style.id} onChange={handleChange} placeholder="ID"/>
              </div>
              <div className={style.passForm}>
                  <input type="password" name="staff_login_pwd" value={user.staff_login_pwd}  className={style.pw} onChange={handleChange} placeholder="PW"/>
              </div>
              <div className={style.passForm}>
                  <input type="text" name="hospital_id" className={style.pw} value={user.hospital_id} onChange={handleChange} placeholder="병원코드"/>
              </div>
              
              
              <div className={style.selectDiv}>
                <RadioGroup row>
                    <FormControlLabel
                            value="doctor"
                            control={ <CustomRadio
                                checked={role === "doctor"}
                                onChange={handleRoleChange}
                                value ="doctor"
                                name="role"
                                
                            />}
                            label="의사"
                            
                            />
                    <FormControlLabel
                            value="doctor"
                            control={  <CustomRadio
                                checked={role === "nurse"}
                                onChange={handleRoleChange}
                                value="nurse"
                                name="role"
                                
                              />}
                            label="간호사"
                            
                            />
                    <FormControlLabel
                            value="doctor"
                            control={  <CustomRadio
                                checked={role === "inspector"}
                                onChange={handleRoleChange}
                                value="inspector"
                                name="role"
                                
                              />}
                            label="검사자"
                            
                            />     
     
                </RadioGroup>
            </div>

              <button onClick={handleLogin} type="button" className={style.btn}>
                LOG IN 
              </button>
             
              
          </form>

     
        </div>
        
    );
}

export default Login;