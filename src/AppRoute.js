import { Route, Switch, Redirect } from "react-router-dom";
import login from "views/Login";
import test from "views/test";
import TestState from "views/TestState";

function AppRoute(props) {
    return(
        <Switch>
            <Route path="/" exact component={login}/>
            <Route path="/test" exact component={test}/>
            <Route path="/teststate" exact component={TestState}></Route>
            <Redirect to="/"/>
        </Switch>
    );
}

export default AppRoute;