import style from "views/login.module.css";
import { useState } from "react";
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

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
    })

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    };

    const handlePage = (event) => {
        if(user.staff_role === 'doctor') {
            props.history.push('/diagnosis')
        } else if(user.staff_role === 'nurse') {
            props.history.push('/receipt')
        } else {
            props.history.push('/teststate')
        }
    };
    const login = async () => {
      try {
        console.log(user);
        const response = await axios.post("http://localhost:8080/auth/login", user);
        console.log(response.data);
      } catch(error) {
        console.log(error);
      } 
    };

    return (
        
        <div className={style.loginbackGround}>
            
          <form className={style.loginForm}>
            <h2>의료정보시스템</h2>
              <h4>Login</h4>
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
                                checked={user.staff_role === "doctor"}
                                onChange={handleChange}
                                value ="doctor"
                                name="staff_role"
                                
                            />}
                            label="의사"
                            
                            />
                    <FormControlLabel
                            value="doctor"
                            control={  <CustomRadio
                                checked={user.staff_role === "nurse"}
                                onChange={handleChange}
                                value="nurse"
                                name="staff_role"
                                
                              />}
                            label="간호사"
                            
                            />
                    <FormControlLabel
                            value="doctor"
                            control={  <CustomRadio
                                checked={user.staff_role === "inspector"}
                                onChange={handleChange}
                                value="inspector"
                                name="staff_role"
                                
                              />}
                            label="검사자"
                            
                            />     
     
                </RadioGroup>
            </div>

              <button onClick={login} type="button" className={style.btn}>
                LOG IN 
              </button>
             
              
          </form>

     
        </div>
        
    );
}

export default Login;