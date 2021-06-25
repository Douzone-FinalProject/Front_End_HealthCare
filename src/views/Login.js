import style from "views/login.module.css";
import { useState } from "react";

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
              <div>
                <input type="radio" name="role" value="doctor" onChange={handleChange} checked={login.role === "doctor"}/><label>의사</label>
                <input className="ml-5" type="radio" name="role" value="nurse" onChange={handleChange} checked={login.role === "nurse"}/><label className="mr-5">간호사</label>
                <input type="radio" name="role" value="inspector" onChange={handleChange} checked={login.role === "inspector"}/><label>검사자</label>
              </div>
              
              <button onClick={handlePage} type="button" className={style.btn}>
                LOG IN 
              </button>
          </form>

     
        </div>
        
    );
}

export default Login;