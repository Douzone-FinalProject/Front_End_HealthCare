import Modal from "react-modal";

//신규 환자 생성 modal 스타일 설정
const customStyles = {
    content: {
        width: '750px',
        height: '430px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('body');
function NoticeModal(props) {
    

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            contentLabel="Notice Modal"
            style={customStyles}
        >
            <div><h3>공지사항</h3></div>
            <div className="d-flex mt-2">
                <div>
                    제목 :
                </div>
                <div className="ml-2 mb-2">
                    {props.notice === 1 ?
                    <div>이용 관련 불편사항을 들려주세요</div>:
                    props.notice === 2 ?
                    <div>새로운 사이트를 오픈하였습니다.</div>:
                    props.notice === 3 ?
                    <div>수정 사항이 있어 알려드립니다.</div>:
                    <div>뉴스 & 공지사항</div>}
                </div>
            </div>
            <div style={{border:"1px solid black", height:"270px"}}>
                {props.notice === 1 ?
                <div>저희 홈페이지는 조그만 불만사항도 크게 귀 기울여 듣고 최선을 다해
                <br/> 해결해 드리기 위해 항상 노력하고 있습니다.
                <br/> 고객님께서 이용중 느끼신 불편하셨던 사항 및 건의사항 등 불만족스러운 부분에 대하여 알려주시면 
                <br/> 절차에 따라 신속히 처리해 드리겠습니다.
                <br/> 고객센터 문의를 이용해 주시면 더 신속한 처리가 가능합니다.</div>:
                props.notice === 2 ?
                <div>더존 의료정보시스템 웹사이트를 새롭게 개편하여 오픈하였습니다.
                <br/>저희는 대한민국 시장의 의료정보시스템을 선도하겠다는 목표로
                <br/>IT 시장의 요구에 맞추어 보다 다양하고 보다 선도적인 솔루션을 확보하여 공급함으로써,
                <br/>대한민국 IT 부분의 선도적인 기업이 될 수 있도록 최선을 다하겠습니다.</div>:
                props.notice === 3 ?
                <div>홈페이지의 수정사항이 있어 알려드립니다.
                <br/>저희는 보다 효율적인 시스템을 만들고자 항상 노력중입니다.
                <br/>UI 개선사항이 있는지 항상 생각하여 최선을 다하겠습니다.</div>:
                <div>안녕하세요. 글을 읽어주셔서 감사합니다.
                <br/>항상 고객님들꼐 감사하는 마음으로 최선을 다하는 중입니다.
                <br/>뉴스와 공지사항의 자세한 내용은 더존 홈페이지에서 확인바랍니다.</div>}
            </div>
            <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-sm btn-primary" onClick={props.closeModal}>닫기</button>
            </div>
        </Modal>
    );
}

export default NoticeModal;