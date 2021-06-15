import style from "views/test1.module.css";
import Button from "./common/Button";
function Login(props) {
    return (
        <body>
        <form action="index.html" method="post" className={style.loginForm}>
        <h2>Login</h2>
        <div className={style.idForm}>
          <input type="text" className={style.id} placeholder="ID"/>
        </div>
        <div className={style.passForm}>
          <input type="password" className={style.pw} placeholder="PW"/>
        </div>
        <Button>
          LOG IN
        </Button>
      </form>
    </body>
    );
}

export default Login;