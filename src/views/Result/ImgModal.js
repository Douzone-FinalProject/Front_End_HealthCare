import Modal from "react-modal";

//신규 환자 생성 modal 스타일 설정
const customStyles = {
    content: {
        width: '600px',
        height: '700px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('body');
function ImgModal(props) {

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            contentLabel="Create Patient Modal"
            style={customStyles}
        >
            <img src="http://localhost:3000/mri1.jpg" alt="" height="100%"/>
        </Modal>
    );
}

export default ImgModal;