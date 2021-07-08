import "views/common/main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'
import { useCallback, useEffect, useRef, useState } from "react";
import { sendRedisMessage, getMessageList, insertMessage, getHospitalStaff, deleteMessage } from "apis/message";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

function MessageBox(props) {

    const globalUid = useSelector((state) => state.authReducer.staff_login_id);
    const globalName = useSelector((state) => state.authReducer.staff_name);
    const globalHospital = useSelector((state) => state.authReducer.hospital_id);
    const [connected, setConnected] = useState(false);
    const [pubMessage, setPubMessage] = useState({
        topic: 0,
        content: '',
    });
    const [contents, setContents] = useState([]);

    const changePubMessage = (event) => {
        setPubMessage({
          ...pubMessage,
          [event.target.name]: event.target.value
        });
    };

    const changePubTopic = (event) => {
        setPubMessage({
            ...pubMessage,
            topic: "/" + globalHospital+ "/" + event.value
        });
    };

    let ws = useRef(null);
    const connectWebSocket = () => {
        ws.current = new WebSocket("ws://192.168.3.29:8080/websocket/redis");
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
            }
        };
    };

    const disconnectWebSocket = () => {
        ws.current.close();
    };

    const publishTopic = async () => {
        try{
            var message = {};
            message.message_content = pubMessage.content;
            message.staff_login_id = pubMessage.topic.substring(2+globalHospital.length);
            message.staff_id = 8;   //수정해야함...
            message.message_sender = globalName;
            await insertMessage(message);
            // var curr = new Date();
            // let hours = curr.getHours(); // 시
            // let minutes = curr.getMinutes();  // 분
            // curr.setDate(curr.getDate());
            // var date = curr.toISOString().substr(0,10);
            // var datetime = date + " " + hours + ":" + minutes;
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
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        connectWebSocket();
        console.log("메시지 마운트");
        return (() => {
            setConnected(false);
            disconnectWebSocket();
            console.log("메시지 언마운트");
        });
    }, []);

    const getMessage = async (globalUid) => {
        try {
            const response = await getMessageList(globalUid);
            setContents(response.data.messageList);
        } catch (error) {
            console.log(error);
        }
    };
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
    
    useEffect(() => {
        getMessage(globalUid);
        getHospitalStaffList(globalUid);
    }, [globalUid, getHospitalStaffList]);

    const handleMessageDelete = async (content) => {
        console.log(content);
        try{
            console.log(content);
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
                    await deleteMessage(content.message_id);
                    Swal.fire({
                        title: '삭제되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    })
                    const response = await getMessageList(globalUid);
                    setContents(response.data.messageList);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }; 

    return (
        <div className={`sidebar-menu${props.isMenuOpen === true ? ' open' : ''}`}>
            <button type="button" className="btn btn-sm btn-secondary small float-right" onClick={props.onMenuToggle}>Close</button>
            <div className="row menu">이름: 신용권</div>
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
                    <button className="btn btn-sm btn-secondary mr-2" onClick={publishTopic}>전송</button>
                </div>
            </div>
            <hr className="bg-white mt-4 mb-3"/>
            <div>
                <div className="text-white ml-3">메시지 내용</div>
                {contents.map((content, index) => 
                <div key={index} className="d-flex justify-content-center" onClick={()=>handleMessageDelete(content)}>
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
    );
}

export default MessageBox;