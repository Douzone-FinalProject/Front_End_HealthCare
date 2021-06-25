import { Route, Switch, Redirect } from "react-router-dom";
import login from "views/Login";
import Result from "views/Result";
import Receipt from "views/Receipt";
import Reservation from "views/Reservation";
import TestState from "views/TestState";
import diagnosis from "views/Diagnosis/index";
import Main from "views/Main"
import Guideline from "views/Main/Guideline";

function AppRoute(props) {
    return(
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/login" exact component={login}/>
            <Route path="/guideline" exact component={Guideline}/>
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