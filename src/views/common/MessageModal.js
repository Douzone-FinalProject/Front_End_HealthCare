import "views/common/main.scss";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { getChatList } from "apis/message";
import { useSelector } from "react-redux";
import ScrollToBottom from 'react-scroll-to-bottom';

//주소 찾기 modal 스타일 설정
const postStyles = {
    content: {
        width: '500px',
        height: '500px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#343a40',
    },
};
Modal.setAppElement('body');
function MessageModal(props) {
    const globalName = useSelector((state) => state.authReducer.staff_name);
    //오늘 날짜
    var date = useMemo(() => {
        var curr = new Date();
        curr.setDate(curr.getDate());
        return curr.toISOString().substr(0,10);
    }, []);
    let checkDate = date;
    return (
        <Modal isOpen={props.isModal}
                onRequestClose={props.closeModal}
                contentLabel="Message Chat Modal"
                style={postStyles}>
            <div className="text-white">
                {props.content.message_sender} 님과의 대화기록
            </div>
            <ScrollToBottom className="chatBox pb-2" >
                {props.chatting.map((content, index) => {
                    if(checkDate !== content.message_date.substring(0, 10)) {
                        checkDate = content.message_date.substring(0, 10);
                        if(content.message_sender === globalName) {
                            if(content.message_content === "삭제된 메시지입니다.") {
                                return (
                                    <div key={index} className="d-flex justify-content-end">
                                        <div>
                                            <div className="d-flex justify-content-center mt-2 text-white"
                                                 style={{backgroundColor:"gray", marginLeft:"150px", marginRight:"150px", borderRadius:"8px"}}>
                                                    {content.message_date.substring(0, 10)}
                                            </div>
                                            <div className="d-flex align-items-center mt-2">
                                                <div>{content.message_date.substring(11)}</div>
                                                <div className="ml-2 bg-white mr-2" style={{borderRadius: "4px", padding:"5px"}}>{content.message_content}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className="d-flex justify-content-end">
                                        <div>
                                        <div className="d-flex justify-content-center mt-2 text-white"
                                             style={{backgroundColor:"gray", marginLeft:"150px", marginRight:"150px", borderRadius:"8px"}}>
                                                {content.message_date.substring(0, 10)}
                                        </div>
                                            <div className="d-flex align-items-center mt-2">
                                                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" onClick={()=>props.handleMessageDelete(content)} />
                                                <div>{content.message_date.substring(11)}</div>
                                                <div className="ml-2 bg-white mr-2" style={{borderRadius: "4px", padding:"5px"}}>{content.message_content}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        } else {
                            return (
                                <div key={index}>
                                    <div className="d-flex justify-content-center mt-2 text-white"
                                         style={{backgroundColor:"gray", marginLeft:"150px", marginRight:"150px", borderRadius:"8px"}}>
                                            {content.message_date.substring(0, 10)}
                                    </div>
                                    <div className="d-flex justify-content-lg-between mt-2">
                                        <div className="ml-2">
                                            <FontAwesomeIcon icon={faUserCircle} className="mr-2"/>{content.message_sender}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="ml-2 bg-white mr-2" style={{borderRadius: "4px", padding:"5px"}}>{content.message_content}</div>
                                        <div>{content.message_date.substring(11)}</div>
                                    </div>
                                </div>
                            )
                        }
                    } else {
                        if(content.message_sender === globalName) {
                            if(content.message_content === "삭제된 메시지입니다.") {
                                return (
                                    <div key={index} className="d-flex justify-content-end">
                                        <div className="d-flex align-items-center mt-2">
                                            <div>{content.message_date.substring(11)}</div>
                                            <div className="ml-2 bg-white mr-2" style={{borderRadius: "4px", padding:"5px"}}>{content.message_content}</div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className="d-flex justify-content-end">
                                        <div className="d-flex align-items-center mt-2">
                                            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" onClick={()=>props.handleMessageDelete(content)} />
                                            <div>{content.message_date.substring(11)}</div>
                                            <div className="ml-2 bg-white mr-2" style={{borderRadius: "4px", padding:"5px"}}>{content.message_content}</div>
                                        </div>
                                    </div>
                                )
                            }
                        } else {
                            return (
                                <div key={index}>
                                    <div className="d-flex justify-content-lg-between mt-2">
                                        <div className="ml-2">
                                            <FontAwesomeIcon icon={faUserCircle} className="mr-2"/>{content.message_sender}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="ml-2 bg-white mr-2" style={{borderRadius: "4px", padding:"5px"}}>{content.message_content}</div>
                                        <div>{content.message_date.substring(11)}</div>
                                    </div>
                                </div>
                            )
                        }
                    }
                })}
            </ScrollToBottom>
            <div className="d-flex w-100">
                <input type="text" name="content" className="inputBox" placeholder="메시지 입력" value={props.pubMessage.content} onChange={props.changePubMessage}/>
                <button className="btn btn-sm btn-secondary" onClick={props.publishTopic}>전송</button>
            </div>
        </Modal>
    );
}

export default MessageModal;