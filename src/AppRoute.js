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
import { useSelector } from "react-redux";
import PrivateRoute from 'views/common/PrivateRoute';
import PublicRoute from 'views/common/PublicRoute';

function AppRoute(props) {
    const globalAuthToken = useSelector((state) => state.authReducer.authToken);
    return(
        <Switch>
            
            {globalAuthToken ?
            <>
           <Route path='*' component={Main} />
                 <PublicRoute  path="/login" exact component={Page403}/>
                 <PublicRoute  path="/" exact component={Main}/>
                 <PrivateRoute path="/manage" exact component={Manage}/>
                 <PrivateRoute path="/guideline" exact component={Guideline}/>
                 <PrivateRoute path="/result" component={Result}/>
                 <PrivateRoute path="/teststate" exact component={TestState}/>
                 <PrivateRoute path="/diagnosis" component={diagnosis}/>
                 <PrivateRoute path="/receipt" component={Receipt}/>
                 <PrivateRoute path="/reserve" component={Reservation}/>
                 <PrivateRoute path="/page403" component={Page403}/>
                 </>
            :    
            <>
                <PublicRoute path="/" exact component={Main}/>
                <PublicRoute restricted path="/login" exact component={login}/>
            </>
        }
        </Switch>
        
    );
}

export default AppRoute;