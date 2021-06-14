import style from "views/login.module.css";
import { useState } from "react";
function Login(props) {

    const [login, serLogin] = useState({
        id: "",
        pw: "",
        hc:  "DZ_"
    })

    const handleChange = (event) => {
        serLogin({
            ...login,
            [event.target.name]: event.target.value
        })
    };

    return (
        
        <div className={style.zzz}>
            
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
                     <h4 className="mb-5">병원코드</h4>
                         <input type="text" name="hc" className={style.pw} value={login.hc} onChange={handleChange}/>
                    </div>
                    <div>
                         <select name="role">
                            <option value="">권한을 선택해주세요.</option>
                            <option value="doctor">의사</option>
                            <option value="Nurse">간호사</option>
                            <option value="inspector">검사자</option>
                        </select>
                    </div>
                        <button type="button" className={style.btn}>
                        LOG IN
                        </button>
                </form>
        </div>
    
    );
}

export default Login;