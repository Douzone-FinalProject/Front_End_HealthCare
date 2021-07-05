import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHospitalUser, faComments, faSignInAlt, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import { useState } from "react";
import MessageBox from "./MessageBox";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthHeader } from "apis/axiosConfig";
import { createSetAuthTokenAction, createSetUidAction, createSetNameAction, createSetRoleAction} from "redux/auth-reducer";


function Header(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [messageArrived, setMessageArrived] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setMessageArrived(false);
    };

    const messageArrivedCheck = () => {
        setMessageArrived(true);
    }
    const globalUid = useSelector((state) => state.authReducer.staff_login_id);
    const globalName = useSelector((state) => state.authReducer.staff_name);
    const globalRole = useSelector((state) => state.authReducer.staff_role);
    const dispatch = useDispatch();

    const handleLogout = (event) => {
        //요청 헤더에 JWT 토큰 제거
        removeAuthHeader();
        //Redux에 인증 내용 제거
        dispatch(createSetUidAction(""));
        dispatch(createSetAuthTokenAction(""));
        dispatch(createSetNameAction(""));
        dispatch(createSetRoleAction(""));
        //SessionStorage에 인증 내용 제거
        sessionStorage.removeItem("staff_login_id");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("staff_name");
        sessionStorage.removeItem("staff_role");
    };

    return (
        <div>
            <nav className="navbar bg-dark navbar-dark justify-content-between">
                <div className="d-flex align-items-center">
                    <img src="http://localhost:3000/douzonelogo.png" alt="" height="20"/>
                    <h4 className="text-white font-weight-bold ml-3 mb-1">더조은병원</h4>
                </div>
                <div>
                    <div className="d-flex align-items-center">
                        <span className="d-flex align-items-center mr-2 mt-1">
                            <h5 className="text-white font-weight-bold">
                                <FontAwesomeIcon icon={faHospitalUser} className="mr-2"/>{globalName}
                            </h5>
                            {globalRole === "ROLE_DOCTOR" ?
                            <h6 className="text-white font-weight-bold ml-2">의사</h6>
                            :
                            <h6 className="text-white font-weight-bold ml-2">간호사</h6>
                            }
                        </span>
                        <button className="btn text-white font-weight-bold ml-4 d-flex align-items-center" onClick={toggleMenu}>
                            {messageArrived ? <div className="text-danger ml-n3"><FontAwesomeIcon icon={faExclamationCircle} className="mr-1"/></div> : <div></div>}
                            <FontAwesomeIcon icon={faComments} className="mr-1"/>Message
                        </button>
                        {globalUid === ""?
                        <Link to="/login"><button className="btn btn-secondary text-white font-weight-bold ml-2"><FontAwesomeIcon icon={faSignInAlt} className="mr-1"/>Login</button></Link>
                        :
                        <Link to="/"><button className="btn btn-secondary text-white font-weight-bold ml-2" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} className="mr-1"/>Logout</button></Link>
                        }
                    </div>
                </div>
            </nav>
            <MessageBox
                isMenuOpen={isMenuOpen}
                onMenuToggle={toggleMenu}
                messageArrivedCheck={messageArrivedCheck}
            />
        </div>
    );
}

export default Header;