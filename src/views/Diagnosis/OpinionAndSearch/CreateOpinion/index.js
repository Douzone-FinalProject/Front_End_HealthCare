import Modal from "react-modal";
import style from "../../Diagnosis.module.css"
import classnames from "classnames/bind";
import { useState } from "react";
import CreateOpinionMedicineListItem from "./CreateOpinionMedicineListItem";
import Button from "../../../common/Button";
import { MDBTable, MDBTableBody } from 'mdbreact';

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
    // const [isModal, setModal] = useState(false);
    // const [opinion, setOpinion] = useState({
    //     receipt_opinion: '',
    //     receipt_medicine: [],
    //     receipt_uniqueness: ''
    // });

    // const handleChange = (event) => {
    //     setOpinion({
    //         ...opinion,
    //         [event.target.name]: event.target.value
    //     });
    // };

    // const openAdModal = (event) => {
    //     setModal(true);
    // }

    // const closeAdModal = (event) => {
    //     setModal(false);
    // }



    return(
    <>
    {props.medicines ?
       <Modal isOpen={props.modalIsOpen} onRequestClose={props.closeModal} style={opinionStyles}>
            <h4 className="mb-3">진단 기록 상세</h4>
            <div>
                <textarea name="receipt_opinion" className={cx("textArea-font")} style={{width:"642px",height:"300px",resize:"none"}} onChange={props.reportOpinion}/>
            </div>

            <MDBTable className={cx("table-hover", "diagnosis-table1")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr>
                    <th>약품코드</th>
                    <th>약품명</th>
                    <th>단위</th>
                    <th>수량</th>
                    </tr>
                </thead>
            </MDBTable>    
            <MDBTable scrollY className={cx("table-hover ")}>
                <MDBTableBody>
                    {props.medicines && props.medicines.map((medicine) => {
                                        return (
                                            <CreateOpinionMedicineListItem key={medicine.medicine_id} medicine={medicine} handleCount={props.handleCount} />
                                        )
                                    })}
                </MDBTableBody>
            </MDBTable>
           
            

            <h4 className="mb-3">특이 사항</h4>
            <textarea name="receipt_uniqueness" className={cx("textArea-font")} style={{width:"642px",height:"100px",resize:"none"}} onChange={props.reportOpinion}/>
            <div className="d-flex justify-content-lg-end">
                <Button onClick={props.reportSuccess}>진료 완료</Button>
                <Button onClick={props.closeModal}>닫기</Button>
            </div>
       </Modal>
        :
        <Modal isOpen={props.modalIsOpen} onRequestClose={props.closeModal} style={opinionStyles}>
            <h4 className="mb-3">진단 기록 상세</h4>
            <div>
                <textarea name="receipt_opinion" className={cx("textArea-font")} style={{width:"642px",height:"400px",resize:"none"}} onChange={props.reportOpinion}/>
            </div>

            
            <h4 className="mt-3">특이 사항</h4>
            <textarea name="receipt_uniqueness" className={cx("textArea-font", "mt-4")} style={{width:"642px",height:"180px",resize:"none"}} onChange={props.reportOpinion}/>
            <div className="d-flex justify-content-lg-end mr-3 mt-2">
                <Button onClick={props.reportSuccess}>진료 완료</Button>
                <Button onClick={props.closeModal}>닫기</Button>
            </div>
            </Modal>
    }

    </>
    );
}

export default CreateOpinion;