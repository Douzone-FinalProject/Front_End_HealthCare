import style from "views/login.module.css";
import { useState } from "react";
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const CustomRadio = withStyles({
  root: {
    color: "#748ffc",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function Login(props) {

    


    const [login, serLogin] = useState({
        id: "",
        pw: "",
        hc:  "",
        role: ""
    })

    const handleChange = (event) => {
        serLogin({
            ...login,
            [event.target.name]: event.target.value
        })
    };

    const handlePage = (event) => {
        if(login.role === 'doctor') {
            props.history.push('/diagnosis')
        } else if(login.role === 'nurse') {
            props.history.push('/receipt')
        } else {
            props.history.push('/teststate')
        }
    };

    return (
        
        <div className={style.loginbackGround}>
            
          <form className={style.loginForm}>
            <h2>의료정보시스템</h2>
              <h4>Login</h4>
              <div className={style.idForm}>
                  <input type="text" name="id" value={login.id}  className={style.id} onChange={handleChange} placeholder="ID"/>
              </div>
              <div className={style.passForm}>
                  <input type="password" name="pw" value={login.pw}  className={style.pw} onChange={handleChange} placeholder="PW"/>
              </div>
              <div className={style.passForm}>
                  <input type="text" name="hc" className={style.pw} value={login.hc} onChange={handleChange} placeholder="병원코드"/>
              </div>
              
              
              <div className={style.selectDiv}>
                <RadioGroup row>
                    <FormControlLabel
                            value="doctor"
                            control={ <CustomRadio
                                checked={login.role === "doctor"}
                                onChange={handleChange}
                                value="doctor"
                                name="role"
                                inputProps={{ 'aria-label': 'A' }}
                            />}
                            label="의사"
                            labelPlacement="doctor"
                            />
                    <FormControlLabel
                            value="doctor"
                            control={  <CustomRadio
                                checked={login.role === "nurse"}
                                onChange={handleChange}
                                value="nurse"
                                name="role"
                                inputProps={{ 'aria-label': 'B' }}
                              />}
                            label="간호사"
                            labelPlacement="nurse"
                            />
                    <FormControlLabel
                            value="doctor"
                            control={  <CustomRadio
                                checked={login.role === "inspector"}
                                onChange={handleChange}
                                value="inspector"
                                name="role"
                                inputProps={{ 'aria-label': 'C' }}
                              />}
                            label="검사자"
                            labelPlacement="inspector"
                            />     
     
                </RadioGroup>
            </div>

              <button onClick={handlePage} type="button" className={style.btn}>
                LOG IN 
              </button>
             
              
          </form>

     
        </div>
        
    );
}

export default Login;