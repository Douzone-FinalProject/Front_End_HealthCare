import "views/common/main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'
import { useCallback, useEffect, useRef, useState } from "react";
import { sendRedisMessage, getMessageList, insertMessage, getHospitalStaff, deleteMessage, getChatList, getStaffId, getStaffLoginId } from "apis/message";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import MessageModal from "./MessageModal";

function MessageBox(props) {

    //전역 상태 Redux로부터 불러오기
    const globalUid = useSelector((state) => state.authReducer.staff_login_id);
    const globalName = useSelector((state) => state.authReducer.staff_name);
    const globalHospital = useSelector((state) => state.authReducer.hospital_id);
    //메시지 모달을 열고 닫는 상태
    const [isModal, setModal] = useState(false);
    //redis 연결 상태
    const [, setConnected] = useState(false);
    //redis에 보낼 메시지 상태
    const [pubMessage, setPubMessage] = useState({
        topic: 0,
        content: '',
    });
    const [pubMessage2, setPubMessage2] = useState({
        topic: 0,
        content: '',
    });
    //메시지 내용을 담는 상태
    const [contents, setContents] = useState([]);
    const [content, setContent] = useState({});
    const [label, setLabel] = useState('');
    //채팅 기록을 담는 상태
    const [chatting, setChatting] = useState([]);

    //메시지 상태 변경
    const changePubMessage = (event) => {
        setPubMessage({
          ...pubMessage,
          [event.target.name]: event.target.value
        });
    };
    const changePubMessage2 = (event) => {
        setPubMessage2({
          ...pubMessage2,
          [event.target.name]: event.target.value
        });
    };
    const changePubTopic = (event) => {
        setLabel(event.label);
        setPubMessage({
            ...pubMessage,
            topic: "/" + globalHospital+ "/" + event.value
        });
    };

    //Redis
    let ws = useRef(null);
    const connectWebSocket = () => {
        ws.current = new WebSocket("ws://kosa3.iptime.org:50003/websocket/redis");
        // ws.current = new WebSocket("ws://localhost:8080/websocket/redis");
        ws.current.onopen = () => {
            console.log("접속 성공");
            setConnected(true);
            var json = {topic: "/" + globalHospital+ "/" + globalUid};
            var message = JSON.stringify(json);
            ws.current.send(message);
        };

        ws.current.onclose = () => {
            console.log("접속 끊김");
            setConnected(false);
        };

        ws.current.onmessage = async (event) => {
            console.log("메시지 수신");
            var json = event.data;
            var message = JSON.parse(json);  //{topic:xxx, content:yyy}
            console.log(message);
            //setContents((contents) => {return [{message_sender:message.sender, message_content:message.content, message_date:message.datetime}].concat(contents)});
            if(message.content === 'ChangeReceiptState') {
                props.realTimeReceiptList();
            } else {
                props.messageArrivedCheck();
                const response = await getMessageList(globalUid);
                setContents(response.data.messageList);
                props.openMenu();
                if(Object.keys(content).length !== 0) {
                    getChattingList(content);
                }
            }
        };
    };
    //Redis 접속 끊겼을 때
    const disconnectWebSocket = () => {
        ws.current.close();
    };
    //Redis 메시지 전송 및 DB저장
    const publishTopic = async () => {
        try{
            var message = {};
            message.message_content = pubMessage.content;
            message.staff_login_id = pubMessage.topic.substring(2+globalHospital.length);
            const res = await getStaffId(globalUid)
            message.staff_id = res.data.staffId;
            message.message_sender = globalName;
            await insertMessage(message);
            pubMessage.content = "SendMessage";
            await sendRedisMessage(pubMessage);
            setPubMessage({
                ...pubMessage,
                content: ''
            });
            Swal.fire({
                icon: 'success',
                title: '메시지가 전송되었습니다.',
                showConfirmButton: false,
                timer: 500
            });
            if(Object.keys(content).length !== 0) {
                getChattingList(content);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const publishTopic2 = async () => {
        try{
            var message = {};
            message.message_content = pubMessage2.content;
            message.staff_login_id = pubMessage2.topic.substring(2+globalHospital.length);
            const res = await getStaffId(globalUid)
            message.staff_id = res.data.staffId;
            message.message_sender = globalName;
            await insertMessage(message);
            pubMessage2.content = "SendMessage";
            await sendRedisMessage(pubMessage2);
            setPubMessage2({
                ...pubMessage2,
                content: ''
            });
            Swal.fire({
                icon: 'success',
                title: '메시지가 전송되었습니다.',
                showConfirmButton: false,
                timer: 500
            });
            if(Object.keys(content).length !== 0) {
                getChattingList(content);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //처음 마운트 되었을 때, 메시지를 누른 경우 Redis 접속
    useEffect(() => {
        connectWebSocket();
        console.log("메시지 마운트");
        return (() => {
            setConnected(false);
            disconnectWebSocket();
            console.log("메시지 언마운트");
        });
    }, [content]);

    //로그인한 아이디로 메시지 내용 불러오기
    const getMessage = async (globalUid) => {
        try {
            const response = await getMessageList(globalUid);
            setContents(response.data.messageList);
        } catch (error) {
            console.log(error);
        }
    };
    //받는 사람 리스트를 병원 기준으로 불러오기
    const [options, ] = useState([])
    const getHospitalStaffList = useCallback( async (staff_login_id) => {
        try {
            const response = await getHospitalStaff(staff_login_id);
            for(let staff of response.data.staffList) {
                options.push({value: staff.staff_login_id, label: staff.staff_name});
            }
        } catch (error) {
            console.log(error);
        }
    }, [options]);
    
    //처음 마운트될 때, 메시지 내용과 받는사람 리스트 불러오기
    useEffect(() => {
        getMessage(globalUid);
        getHospitalStaffList(globalUid);
    }, [globalUid, getHospitalStaffList]);

    //삭제할 때 이벤트
    const handleMessageDelete = async (cont) => {
        console.log(cont);
        try{
            console.log(cont);
            Swal.fire({
              title: '메시지를 삭제하시겠습니까?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '삭제',
              cancelButtonText: '취소'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteMessage(cont.message_id);
                    Swal.fire({
                        title: '삭제되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    });
                    const resp = await getStaffLoginId(content.staff_id)
                    getChattingList(content);
                    await sendRedisMessage({
                        topic: "/"+globalHospital+"/"+resp.data.staffLoginId,
                        content: "sendMessage"
                    });
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    //메시지 내용 클릭 시, 메시지 기록 모달을 열고 닫음
    const openMessageModal = useCallback(async (content) => {
        console.log(content)
        setContent(content);
        getChattingList(content);
        const resp = await getStaffLoginId(content.staff_id);
        setPubMessage2({
            ...pubMessage2,
            topic: "/" + globalHospital+ "/" + resp.data.staffLoginId
        });
        setModal(true);
    }, [globalHospital, pubMessage2]);
    const closeMessageModal = useCallback(() => {
        setModal(false);
    }, []);

    const openMessageModalByButton = useCallback(async () => {
        try {
            const res = await getStaffId(pubMessage.topic.substring(2+globalHospital.length))
            const response = await getChatList(res.data.staffId, globalUid);
            setContent({
                ...content,
                staff_id: res.data.staffId,
                message_sender: label,
                staff_login_id: globalUid
            });
            setChatting(response.data.chatList);
            setPubMessage2({
                ...pubMessage2,
                topic: "/" + globalHospital+ "/" + pubMessage.topic.substring(2+globalHospital.length)
            });
            setModal(true);
        } catch (error) {
            console.log(error);
        }
    }, [globalHospital, globalUid, pubMessage, pubMessage2, content, label]);

    //채팅 기록 불러오기
    const getChattingList = async (content) => {
        try {
            console.log(content);
            const response = await getChatList(content.staff_id, content.staff_login_id);
            setChatting(response.data.chatList);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`sidebar-menu${props.isMenuOpen === true ? ' open' : ''}`}>
            <button type="button" className="btn btn-sm btn-secondary small float-right" onClick={props.onMenuToggle}>Close</button>
            <div className="row menu">이름: {globalName}</div>
            <hr className="bg-white mt-0 mb-3"/>
            <div className="mb-2">
                <div className="text-white ml-3">메시지 작성</div>
                <div className="d-flex justify-content-center mb-2">
                    <textarea className="sendbox" name="content" value={pubMessage.content} onChange={changePubMessage}/>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="text-white ml-2">받는사람: </div>
                        <Select
                            options={options}
                            className="ml-2 selectbox"
                            name="topic" placeholder="선택"
                            value={options.find(op => {return op.value === pubMessage.topic})}
                            onChange={(value) => {changePubTopic(value)}}/>
                    </div>
                    <div>
                        {pubMessage.topic ?
                        <button className="btn btn-sm btn-primary mr-2 h-100" onClick={openMessageModalByButton}>채팅</button>
                        :
                        <div></div>}
                        <button className="btn btn-sm btn-secondary mr-2 h-100" onClick={publishTopic}>전송</button>
                    </div>
                </div>
            </div>
            <hr className="bg-white mt-4 mb-3"/>
            <div>
                <div className="text-white ml-3">메시지 내용</div>
                <div style={{overflowY:"auto", height:"450px"}}>
                    {contents.map((content, index) => 
                    <div key={index} className="d-flex justify-content-center" onClick={()=>openMessageModal(content)}>
                        <div className="receivebox pb-2 mb-2">
                            <div className="d-flex justify-content-lg-between mt-2">
                                <div className="ml-2"><FontAwesomeIcon icon={faUserCircle} className="mr-2"/>{content.message_sender}</div>
                                <div>{content.message_date}</div>
                            </div>
                            <hr className="mt-1 mb-1"/>
                            <div className="ml-2">{content.message_content}</div>
                        </div>
                    </div>)
                    }
                </div>
            </div>
            <MessageModal
                isModal={isModal}
                closeModal={closeMessageModal}
                content={content}
                handleMessageDelete={handleMessageDelete}
                chatting={chatting}
                getChattingList={getChattingList}
                pubMessage={pubMessage2}
                changePubMessage={changePubMessage2}
                changePubTopic={changePubTopic}
                publishTopic={publishTopic2} />
        </div>
    );
}

export default MessageBox;