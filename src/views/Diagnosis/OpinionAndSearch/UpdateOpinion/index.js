import Modal from "react-modal";
import style from "../../Diagnosis.module.css"
import classnames from "classnames/bind";
import { useState } from "react";
import OpinionMedicineListItem from "../UpdateOpinion/OpinionMedicineListItem";
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
    // const zz = props.opinions.map((medicine => medicine.medicines));
    // let hhh = [];
    // // console.log(zz)
    // for(let i of zz){
    //     for(let f of i){
    //         hhh  =  f
    //     }
    // }
    // console.log(hhh)
    // const [sibal, setSibal] = useState();
    // setSibal(hhh)
    // const kk = hhh.map((hoho) => hoho.medicine_id)
    // gasibal(kk);
    // setSibal({kk})
    // console.log(kk);

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
                <textarea name="receipt_opinion" value={props.opp.receipt_opinion} className={cx("textArea-font")} style={{width:"642px",height:"300px",resize:"none"}} onChange={props.updatOpinion}/>
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
            <MDBTable scrollY className={cx("table-hover")}>
                <MDBTableBody>
                    
                    {arr && arr.map((hoho) => {
                                        return (
                                            <OpinionMedicineListItem  key={hoho.medicine_id} hoho={hoho} />
                                        )
                                    })}
            {/* <tr> */}
                {/* <td>{kk}</td> */}
                {/* <td>{props.opp.medicine_name}</td>
                <td>{props.opp.medicine_unit}</td>
                <td>{props.opp.quantity}</td> */}
            {/* </tr> */}
                </MDBTableBody>
            </MDBTable>
           

            <h4 className="mb-3">특이 사항</h4>
            <textarea name="receipt_uniqueness" value={props.opp.receipt_uniqueness} className={cx("textArea-font")} style={{width:"642px",height:"100px",resize:"none"}} onChange={props.updatOpinion}/>
            <div className="d-flex justify-content-lg-end">
                <Button onClick={()=>{props.saveOpinion(props.opp.receipt_id)}}>수정 완료</Button>
                <Button onClick={props.closeUpdateModal}>닫기</Button>
            </div>
       </Modal>
    </>
    );
}

export default UpdateOpinion;