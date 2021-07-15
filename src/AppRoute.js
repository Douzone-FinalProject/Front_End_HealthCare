import { Switch, Route, Redirect } from "react-router-dom";
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
import Page404 from "views/common/Page404";
import { useSelector } from "react-redux";
import PrivateRoute from 'views/common/PrivateRoute';
import PublicRoute from 'views/common/PublicRoute';

function AppRoute(props) {
    const globalAuthToken = useSelector((state) => state.authReducer.authToken);
    const globalRole = useSelector((state) => state.authReducer.staff_role);
    return(
        <>
            {globalAuthToken  ?
            <Switch>
                <PublicRoute  path="/" exact component={Main}/>
                <PublicRoute  path="/main" exact component={Main}/>
                {globalRole === "ROLE_DOCTOR" && <PrivateRoute path="/manage" exact component={Manage}/>}
                <PublicRoute path="/guideline" exact component={Guideline}/>
                <PrivateRoute path="/result" component={Result}/>
                <PrivateRoute path="/teststate" exact component={TestState}/>
                <PrivateRoute path="/diagnosis" component={diagnosis}/>
                <PrivateRoute path="/receipt" component={Receipt}/>
                <PrivateRoute path="/reserve" component={Reservation}/>
                <PrivateRoute path="/page403" component={Page403}/>
                <PrivateRoute path="/page404" component={Page404}/>
                <Redirect to="/page404"/>
            </Switch>
            :    
            <Switch>
                <PublicRoute path="/guideline" exact component={Guideline}/>
                <PublicRoute path="/" exact component={Main}/>
                <PublicRoute restricted path="/login" exact component={login}/>
                <Redirect to="/login"/>
            </Switch>
        }
        </>
        

    );
}

export default AppRoute;