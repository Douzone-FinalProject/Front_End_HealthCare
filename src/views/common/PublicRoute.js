import { Redirect, Route } from "react-router-dom";
import isLogin from "views/common/isLogin";




const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={(props) => (isLogin() && restricted  ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default PublicRoute;