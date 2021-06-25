import { Route, Switch, Redirect } from "react-router-dom";
import login from "views/Login";
import Result from "views/Result";
import Receipt from "views/Receipt";
import Reservation from "views/Reservation";
import TestState from "views/TestState";
import diagnosis from "views/Diagnosis/index";

function AppRoute(props) {
    return(
        <Switch>
            <Route path="/" exact component={login}/>
            <Route path="/result" component={Result}/>
            <Route path="/teststate" exact component={TestState}></Route>
            <Route path="/diagnosis" component={diagnosis}/>
            <Route path="/receipt" component={Receipt}/>
            <Route path="/reserve" component={Reservation}/>
            <Redirect to="/"/>
        </Switch>
    );
}

export default AppRoute;