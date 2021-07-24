import Modal from "react-modal";
import style from "../../Diagnosis.module.css"
import classnames from "classnames/bind";
import OpinionMedicineListItem from "../UpdateOpinion/OpinionMedicineListItem";
import TestAfterMedicineListItem from "../UpdateOpinion/TestAfterMedicineListItem";
import {deleteReceiptMedic} from "apis/diagnostic";
import Button from "../../../common/Button";
import { MDBTable, MDBTableBody } from 'mdbreact';
import Swal from "sweetalert2";

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

    const DeleteSuccess = async (receipt_id) => {
        try{
            await deleteReceiptMedic(receipt_id);
        }catch(error){
          console.log(error);
        }
    };



    const deleteReceiptMedicines = async (receipt_id, medic) => {
        if(!medic[0]){
            Swal.fire({
                icon: 'error',
                title: '처방된 약이 없습니다.',
                showConfirmButton: false,
                timer: 1500
            })
           
        }else{
             Swal.fire({
                title: '처방된 약을 삭제하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
              }).then((result)  => {
                if (result.isConfirmed) {
                  Swal.fire(
                    '삭제되었습니다.',
                    'Your file has been deleted.',
                    'success'
                  )
                  DeleteSuccess(receipt_id);
                  props.closeUpdateModal();
                }
              })
            
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
            <MDBTable className={cx("table-hover", "diagnosis-table1", "modal-medic-width","moadl-textArea")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr>
                    <th>약품코드</th>
                    <th>약품명</th>
                    <th style={{width:"22%"}}>단위</th>
                    <th style={{width:"22%"}}>수량</th>
                    </tr>
                </thead>
            </MDBTable>   

            {props.medicines[0] ? //약품 목록에서 검색 했을 경우 검색한 약 띄우기
              <MDBTable scrollY className={cx("table-hover", "modal-medic-width")}>
                <MDBTableBody>
                    {props.medicines && props.medicines.map((hoho2) => {
                                        return (
                                            <TestAfterMedicineListItem key={hoho2.medicine_id} hoho2={hoho2}/>
                                        )
                                    })}
                </MDBTableBody>
                </MDBTable> 
              : //약품 목록에서 띄운게 없으면 해당 진료에 처방됫던 약 나타내기(없으면 안 뜸)
            <MDBTable scrollY className={cx("table-hover", "modal-medic-width")}> 
                <MDBTableBody>
                    {props.opmedic && props.opmedic.map((hoho) => {
                                        return (
                                            <OpinionMedicineListItem  key={hoho.medicine_id} hoho={hoho} />
                                        )
                                    })}

                </MDBTableBody>
            </MDBTable>
            } 

            <h4 className="mb-3 mt-3">특이 사항</h4>
            <textarea name="receipt_uniqueness" value={props.opp.receipt_uniqueness} className={cx("textArea-font","moadl-textArea")} style={{width:"642px",height:"100px",resize:"none"}} onChange={props.updatOpinion}/>
            
                
                
                    {props.medicines[0] ? 
                    <div className="d-flex justify-content-lg-end mr-3 mt-2">
                        <Button onClick={()=>{props.saveMedicine(props.opp.receipt_id)}}>약 처방</Button>
                        <Button className="ml-2" onClick={()=>{props.saveOpinion(props.opp.diagnostic_test_state)}}>수정 완료</Button>
                        <Button className="ml-2" onClick={props.closeUpdateModal}>닫기</Button>
                    </div>
                    :
                    <div className="d-flex justify-content-lg-end mr-3 mt-2">
                        <Button className="ml-2" onClick={()=>{deleteReceiptMedicines(props.opp.receipt_id, props.opmedic)}}>약 삭제</Button>
                        <Button className="ml-2" onClick={()=>{props.saveOpinion(props.opp.diagnostic_test_state)}}>수정 완료</Button>
                        <Button className="ml-2" onClick={props.closeUpdateModal}>닫기</Button>
                    </div>
                    }
                    
                
            
       </Modal>
    </>
    );
}

export default UpdateOpinion;