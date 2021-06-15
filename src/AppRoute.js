import { Route, Switch, Redirect } from "react-router-dom";
import login from "views/Login";
import Receipt from "views/Receipt";
import test from "views/test";


function AppRoute(props) {
    return(
        <Switch>
            <Route path="/" exact component={login}/>
            <Route path="/test" exact component={test}/>
            <Route path="/receipt" component={Receipt}/>
            <Redirect to="/"/>
        </Switch>
    );
}

export default AppRoute;