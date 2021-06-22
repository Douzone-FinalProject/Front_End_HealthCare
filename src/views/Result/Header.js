import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHospitalUser } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
    return (
        <div>
            <nav className="navbar bg-dark navbar-dark justify-content-between">
                <div className="d-flex align-items-center">
                    <img src="http://localhost:3000/logo192.png" alt="" height="30"/>
                    <h4 className="text-white font-weight-bold ml-2">더조은병원</h4>
                </div>
                <div>
                    <div className="d-flex align-items-center">
                        <span className="d-flex align-items-center mr-2">
                            <h5 className="text-white font-weight-bold">
                                <FontAwesomeIcon icon={faHospitalUser} className="mr-2"/>신용권
                            </h5>
                            <h6 className="text-white font-weight-bold ml-2">의사</h6>
                        </span>
                        <button className="btn btn-secondary text-white font-weight-bold ml-4"><FontAwesomeIcon icon={faSignOutAlt} className="mr-1"/>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;