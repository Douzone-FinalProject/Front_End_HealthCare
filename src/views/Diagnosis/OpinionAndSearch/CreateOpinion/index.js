import Modal from "react-modal";
import style from "../../Diagnosis.module.css"
import classnames from "classnames/bind";
import { useState } from "react";
import MedicinePrescriptionList from "../../MedicinePrescriptionList";
import Button from "../../../common/Button";

const cx = classnames.bind(style);
const opinionStyles = {
    content: {
        width: '700px',
        height: '800px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('body');
function CreateOpinion(props) {
    const [isModal, setModal] = useState(false);
    const [opinion, setOpinion] = useState({
        receipt_opinion: '',
        receipt_medicine: [],
        receipt_uniqueness: ''
    });

    const handleChange = (event) => {
        setOpinion({
            ...opinion,
            [event.target.name]: event.target.value
        });
    };

    const openAdModal = (event) => {
        setModal(true);
    }

    const closeAdModal = (event) => {
        setModal(false);
    }

    return(
        <>
       <Modal isOpen={props.modalIsOpen} onRequestClose={props.closeModal} style={opinionStyles}>
            <h4 className="mb-3">진단 기록 상세</h4>
            <div>
                <textarea style={{width:"642px",height:"300px",resize:"none"}}/>
            </div>
            <MedicinePrescriptionList/>
            <h4 className="mb-3">특이 사항</h4>
            <textarea style={{width:"642px",height:"100px",resize:"none"}}/>
            <div className="d-flex justify-content-lg-end">
                <Button>진료 완료</Button>
                <Button onClick={props.closeModal}>닫기</Button>
            </div>
       </Modal>


        </>
    );
}

export default CreateOpinion;