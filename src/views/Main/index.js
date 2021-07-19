import "views/common/main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faDesktop, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import { useSelector } from "react-redux";
import { useState } from "react";
import NoticeModal from "./NoticeModal";

function Main(props) {
    const globalUid = useSelector((state) => state.authReducer.staff_login_id);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [notice, setNotice] = useState(0);
    function openModal(ntc) { setIsOpen(true); setNotice(ntc); }
    function closeModal() { setIsOpen(false); }

    return (
        <div className="bg-white">
            <Header />
            <div>
                <img src="http://localhost:3000/mainimg.jpg" alt="" width="" height="500" className="w-100"/>
            </div>
            <div>
                <div className="row w-100 mt-5">
                    <div className="col-1"></div>
                    <div className="col-4">
                        <div><h3>공지사항</h3></div>
                        <hr/>
                        <div className="row">
                            <div className="col-10">
                                <div className="d-flex align-items-center noticeBox" onClick={()=>openModal(1)}><FontAwesomeIcon icon={faChevronRight} className="mr-2"/><h5>이용 관련 불편사항을 들려주세요</h5></div>
                                <div className="d-flex align-items-center mt-2 noticeBox" onClick={()=>openModal(2)}><FontAwesomeIcon icon={faChevronRight} className="mr-2"/><h5>새로운 사이트를 오픈하였습니다.</h5></div>
                                <div className="d-flex align-items-center mt-2 noticeBox" onClick={()=>openModal(3)}><FontAwesomeIcon icon={faChevronRight} className="mr-2"/><h5>수정 사항이 있어 알려드립니다.</h5></div>
                                <div className="d-flex align-items-center mt-2 noticeBox" onClick={()=>openModal(4)}><FontAwesomeIcon icon={faChevronRight} className="mr-2"/><h5>뉴스 & 공지사항</h5></div>
                            </div>
                            <div className="col-2">
                                <div className="d-flex align-items-center"><h6>06-25</h6></div>
                                <div className="d-flex align-items-center mt-3"><h6>06-25</h6></div>
                                <div className="d-flex align-items-center mt-3"><h6>06-25</h6></div>
                                <div className="d-flex align-items-center mt-3"><h6>06-24</h6></div>
                            </div>
                        </div>
                    </div>
                    <NoticeModal modalIsOpen={modalIsOpen} closeModal={closeModal} notice={notice}/>
                    <div className="col-4">
                    <div><h3>검사의뢰지침</h3></div>
                        <hr/>
                        <div className="row">
                            <div className="col-10">
                            <Link to="/guideline?id=1" style={{textDecoration: 'none'}}><div className="d-flex align-items-center"><FontAwesomeIcon icon={faChevronRight} className="mr-2 text-dark"/><h5>환자가 자주 묻는 질문 및 답변</h5></div></Link>
                            <Link to="/guideline?id=2" style={{textDecoration: 'none'}}><div className="d-flex align-items-center mt-2"><FontAwesomeIcon icon={faChevronRight} className="mr-2 text-dark"/><h5>채혈용기 채혈순서</h5></div></Link>
                            <Link to="/guideline?id=3" style={{textDecoration: 'none'}}><div className="d-flex align-items-center mt-2"><FontAwesomeIcon icon={faChevronRight} className="mr-2 text-dark"/><h5>혈액배양 검체 채취</h5></div></Link>
                            <Link to="/guideline?id=4" style={{textDecoration: 'none'}}><div className="d-flex align-items-center mt-2"><FontAwesomeIcon icon={faChevronRight} className="mr-2 text-dark"/><h5>채혈시 부작용</h5></div></Link>
                            </div>
                            <div className="col-2">
                                <div className="d-flex align-items-center"><h6>06-25</h6></div>
                                <div className="d-flex align-items-center mt-3"><h6>06-25</h6></div>
                                <div className="d-flex align-items-center mt-3"><h6>06-25</h6></div>
                                <div className="d-flex align-items-center mt-3"><h6>06-24</h6></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <a href="http://www.douzone.com/company/about/about01_idea_01">
                            <button className="btn btn-primary w-100 h-50 d-flex align-items-center justify-content-center">
                                <h1 className="text-white"><FontAwesomeIcon icon={faDesktop} className="mr-3"/></h1><h3 className="text-white">더존 홈페이지</h3>
                            </button>
                        </a>
                        <a href="https://help.douzone.com/main/index.jsp">
                            <button className="btn btn-primary w-100 h-50 d-flex align-items-center justify-content-center mt-2">
                                <h1 className="text-white"><FontAwesomeIcon icon={faHeadset} className="mr-3"/></h1><h3 className="text-white">고객센터 문의</h3>
                            </button>
                        </a>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
            <Footer />
            {globalUid ? <DialMenu /> : <></>}  
        </div>
    );
}

export default Main;