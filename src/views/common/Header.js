import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHospitalUser, faComments } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import { useState } from "react";
import MessageBox from "./MessageBox";
import { Link } from "react-router-dom";


function Header(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

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
                                <FontAwesomeIcon icon={faHospitalUser} className="mr-2"/>신용권
                            </h5>
                            <h6 className="text-white font-weight-bold ml-2">의사</h6>
                        </span>
                        <button className="btn text-white font-weight-bold ml-4" onClick={toggleMenu}><FontAwesomeIcon icon={faComments} className="mr-1"/>Message</button>
                        <Link to="/"><button className="btn btn-secondary text-white font-weight-bold ml-2"><FontAwesomeIcon icon={faSignOutAlt} className="mr-1"/>Logout</button></Link>
                    </div>
                </div>
            </nav>
            <MessageBox
                isMenuOpen={isMenuOpen}
                onMenuToggle={toggleMenu}
            />
        </div>
    );
}

export default Header;