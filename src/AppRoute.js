import { Route, Switch, Redirect } from "react-router-dom";
import login from "views/Login";
import Result from "views/Result";
import test from "views/test";

function AppRoute(props) {
    return(
        <Switch>
            <Route path="/" exact component={login}/>
            <Route path="/test" exact component={test}/>
            <Route path="/result" component={Result}/>
            <Redirect to="/"/>
        </Switch>
    );
}

export default AppRoute;