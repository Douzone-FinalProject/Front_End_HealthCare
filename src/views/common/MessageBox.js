import "views/common/main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'

function MessageBox(props) {
    const options = [
        { value: '신용권', label: '신용권' },
        { value: '양미연', label: '양미연' },
        { value: '허민민', label: '허민민' }
    ];

    return (
        <div className={`sidebar-menu${props.isMenuOpen === true ? ' open' : ''}`}>
            <button type="button" className="btn btn-sm btn-secondary small float-right" onClick={props.onMenuToggle}>Close</button>
            <div className="row menu">이름: 신용권</div>
            <hr className="bg-white mt-0 mb-3"/>
            <div className="mb-2">
                <div className="text-white ml-3">메시지 작성</div>
                <div className="d-flex justify-content-center mb-2">
                    <input type="textarea" className="sendbox"/>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="text-white ml-2">받는사람: </div>
                        <Select options={options} className="ml-2 selectbox" placeholder="선택"/>
                    </div>
                    <button className="btn btn-sm btn-secondary mr-2">전송</button>
                </div>
            </div>
            <hr className="bg-white mt-4 mb-3"/>
            <div>
                <div className="text-white ml-3">메시지 내용</div>
                <div className="d-flex justify-content-center">
                    <div className="receivebox pb-2 mb-2">
                        <div className="d-flex justify-content-lg-between mt-2">
                            <div className="ml-2"><FontAwesomeIcon icon={faUserCircle} className="mr-2"/>양미연</div>
                            <div>2020-06-25 11:30</div>
                        </div>
                        <hr className="mt-1 mb-1"/>
                        <div className="ml-2">간염환자 채혈 완료 했습니다.</div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="receivebox pb-2 mb-2">
                        <div className="d-flex justify-content-lg-between mt-2">
                            <div className="ml-2"><FontAwesomeIcon icon={faUserCircle} className="mr-2"/>양미연</div>
                            <div>2020-06-25 11:30</div>
                        </div>
                        <hr className="mt-1 mb-1"/>
                        <div className="ml-2">간염환자 채혈 완료 했습니다.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageBox;