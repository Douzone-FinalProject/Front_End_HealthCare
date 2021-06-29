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
  
    return(
    <>
    {props.medicines ?
       <Modal isOpen={props.modalIsOpen} onRequestClose={props.closeModal} style={opinionStyles}>
            <h4 className="mb-3">진단 기록 상세</h4>
            <div>
                <textarea name="receipt_opinion" className={cx("textArea-font", "moadl-textArea")} style={{width:"642px",height:"300px",resize:"none"}} onChange={props.reportOpinion}/>
            </div>
            <h4 className="mb-3 mt-3">약품 목록</h4>
            <MDBTable className={cx("table-hover", "diagnosis-table1", "modal-medic-width", "moadl-textArea")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr>
                    <th>약품코드</th>
                    <th>약품명</th>
                    <th style={{width:"20%"}}>단위</th>
                    <th style={{width:"25%"}}>수량</th>
                    </tr>
                </thead>
            </MDBTable>    
            <MDBTable scrollY className={cx("table-hover", "modal-medic-width")}>
                <MDBTableBody>
                    {props.medicines && props.medicines.map((medicine) => {
                                        return (
                                            <CreateOpinionMedicineListItem key={medicine.medicine_id} medicine={medicine} />
                                        )
                                    })}
                </MDBTableBody>
            </MDBTable>
           
            

            <h4 className="mb-3">특이 사항</h4>
            <textarea name="receipt_uniqueness" className={cx("textArea-font" , "moadl-textArea")} style={{width:"642px",height:"100px",resize:"none"}} onChange={props.reportOpinion}/>
            <div className="d-flex justify-content-lg-end mr-3 mt-2">
                <Button onClick={props.reportSuccess}>진료 완료</Button>
                <Button className="ml-2" onClick={props.closeModal}>닫기</Button>
            </div>
       </Modal>
        :
        <Modal isOpen={props.modalIsOpen} onRequestClose={props.closeModal} style={opinionStyles}>
            <h4 className="mb-3">진단 기록 상세</h4>
            <div>
                <textarea name="receipt_opinion" className={cx("textArea-font", "moadl-textArea")} style={{width:"642px",height:"400px",resize:"none"}} onChange={props.reportOpinion}/>
            </div>

            
            <h4 className="mb-3 mt-3">특이 사항</h4>
            <textarea name="receipt_uniqueness" className={cx("textArea-font", "mt-4", "moadl-textArea")} style={{width:"642px",height:"180px",resize:"none"}} onChange={props.reportOpinion}/>
            <div className="d-flex justify-content-lg-end mr-3 mt-2">
                <Button onClick={props.reportSuccess}>진료 완료</Button>
                <Button className="ml-2" onClick={props.closeModal}>닫기</Button>
            </div>
            </Modal>
    }

    </>
    );
}

export default CreateOpinion;