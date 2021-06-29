import Modal from "react-modal";
import style from "../../Diagnosis.module.css"
import classnames from "classnames/bind";
import OpinionMedicineListItem from "../UpdateOpinion/OpinionMedicineListItem";
import TestAfterMedicineListItem from "../UpdateOpinion/TestAfterMedicineListItem";
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
function UpdateOpinion(props) {
    
    const hait = props.opinions.filter(opinion => opinion.receipt_id === props.opp.receipt_id);
    let arr;
    for(let i of hait){
        for(let z of i.medicines){
           arr = z
        }
    }


    return(
        
    <>
       <Modal isOpen={props.updateIsOpen} onRequestClose={props.closeUpdateModal} style={opinionStyles}>
            <h4 className="mb-3">진단 기록 상세</h4>
            <div>
                <textarea name="receipt_opinion" value={props.opp.receipt_opinion} className={cx("textArea-font" , "moadl-textArea")} style={{width:"642px",height:"300px",resize:"none"}} onChange={props.updatOpinion}/>
            </div>
            <h4 className="mb-3 mt-3">약품 목록</h4>
            <MDBTable className={cx("table-hover", "diagnosis-table1", "moadl-textArea")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr>
                    <th>약품코드</th>
                    <th>약품명</th>
                    <th style={{width:"20%"}}>단위</th>
                    <th style={{width:"25%"}}>수량</th>
                    </tr>
                </thead>
            </MDBTable>   

            {props.opp.test_flag && props.medicines[0] ? //백 할 때는 '검사 완료'로 수정해야 함.
              <MDBTable scrollY className={cx("table-hover", "modal-medic-width")}>
                <MDBTableBody>
                    {props.medicines && props.medicines.map((hoho2) => {
                                        return (
                                            <TestAfterMedicineListItem key={hoho2.medicine_id} hoho2={hoho2}/>
                                        )
                                    })}
                </MDBTableBody>
                </MDBTable> 
              : 
            <MDBTable scrollY className={cx("table-hover", "modal-medic-width")}>
                <MDBTableBody>
                    
                    {!props.medicines || arr && arr.map((hoho) => {
                                        return (
                                            <OpinionMedicineListItem  key={hoho.medicine_id} hoho={hoho} />
                                        )
                                    })}

                </MDBTableBody>
            </MDBTable>
            } 

            <h4 className="mb-3 mt-3">특이 사항</h4>
            <textarea name="receipt_uniqueness" value={props.opp.receipt_uniqueness} className={cx("textArea-font","moadl-textArea")} style={{width:"642px",height:"100px",resize:"none"}} onChange={props.updatOpinion}/>
            
                
                
                    {props.opp.test_flag && props.medicines[0] ? //백 할 때는 '검사 완료'로 수정해야 함. props.opp.diagnostic_test_state === "검사 중" props.opp.medicines === null
                    <div className="d-flex justify-content-lg-end mr-3 mt-2">
                        <Button onClick={()=>{props.saveMedicine(props.opp.receipt_id)}}>약 처방</Button>
                        <Button className="ml-2" onClick={()=>{props.saveOpinion(props.opp.receipt_id)}}>수정 완료</Button>
                        <Button className="ml-2" onClick={props.closeUpdateModal}>닫기</Button>
                    </div>
                    :
                    <div className="d-flex justify-content-lg-end mr-3 mt-2">
                        <Button className="ml-2" onClick={()=>{props.saveOpinion(props.opp.receipt_id)}}>수정 완료</Button>
                        <Button className="ml-2" onClick={props.closeUpdateModal}>닫기</Button>
                    </div>
                    }
                    
                
            
       </Modal>
    </>
    );
}

export default UpdateOpinion;