import { Route, Switch, Redirect } from "react-router-dom";
import login from "views/Login";
import Receipt from "views/Receipt";
import Reservation from "views/Reservation";
import test from "views/test";
import diagnosis from "views/Diagnosis/index";


function AppRoute(props) {
    return(
        <Switch>
            <Route path="/" exact component={login}/>
            <Route path="/test" exact component={test}/>
            <Route path="/diagnosis" component={diagnosis}/>
            <Route path="/receipt" component={Receipt}/>
            <Route path="/reserve" component={Reservation}/>
            <Redirect to="/"/>
        </Switch>
    );
}

export default AppRoute;