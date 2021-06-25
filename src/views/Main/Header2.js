import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faHospitalUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";




function Header2(props) {
    return (
        <div>
            <nav className="navbar bg-dark navbar-dark justify-content-between">
                <div className="d-flex align-items-center">
                    <img src="http://localhost:3000/douzonelogo.png" alt="" height="20"/>
                    <h4 className="text-white font-weight-bold ml-3 mb-1">더조은병원</h4>
                </div>
                <div>
                    <div className="d-flex align-items-center">
                        <span className="d-flex align-items-center mr-2">
                            <h5 className="text-white font-weight-bold">
                                <FontAwesomeIcon icon={faHospitalUser} className="mr-2"/>
                            </h5>
                            {/* <h6 className="text-white font-weight-bold ml-2"></h6> */}
                        </span>
                        <Link to="/login">
                        <button className="btn btn-secondary text-white font-weight-bold ml-4"><FontAwesomeIcon icon={faSignInAlt} className="mr-1"/>Login</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header2;