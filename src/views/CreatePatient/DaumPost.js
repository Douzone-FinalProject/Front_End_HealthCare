import Modal from "react-modal";
import DaumPostCode from 'react-daum-postcode';

const postStyles = {
    content: {
        width: '500px',
        height: '500px',
        top: '50%',
        left: '80%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('body');
function DaumPost(props) {
    return (
        <Modal isOpen={props.isModal}
                onRequestClose={props.closeAdModal}
                contentLabel="Daum Address Modal"
                style={postStyles}>
            <DaumPostCode
                onComplete={props.handleComplete}
            />
        </Modal>
    );
}

export default DaumPost;