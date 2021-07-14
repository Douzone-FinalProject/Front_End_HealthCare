import { Route, Switch, Redirect } from "react-router-dom";
import login from "views/Login";
import Result from "views/Result";
import Receipt from "views/Receipt";
import Reservation from "views/Reservation";
import TestState from "views/TestState";
import diagnosis from "views/Diagnosis/index";
import Main from "views/Main"
import Guideline from "views/Main/Guideline";
import Manage from "views/Manage/index";
import Page403 from "views/common/Page403";
import { useSelector } from "react-redux";

function AppRoute(props) {
    const globalAuthToken = useSelector((state) => state.authReducer.authToken);
    return(
        <Switch>
            
            {globalAuthToken === "" && <Redirect to="/"/>}
            <Route path="/" exact component={Main}/>
            <Route path="/manage" exact component={Manage}/>
            <Route path="/login" exact component={login}/>
            <Route path="/guideline" exact component={Guideline}/>
            <Route path="/result" component={Result}/>
            <Route path="/teststate" exact component={TestState}></Route>
            <Route path="/diagnosis" component={diagnosis}/>
            <Route path="/receipt" component={Receipt}/>
            <Route path="/reserve" component={Reservation}/>

            <Route path="/page403" component={Page403}/>
           
        </Switch>
    );
}

export default AppRoute;