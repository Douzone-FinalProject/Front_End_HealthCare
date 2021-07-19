import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../common/Button";
import { MDBTable, MDBTableBody } from 'mdbreact';
import MedicineModal from "./MedicineModal";
import MedicinePrescriptionListItem from "./MedicinePrescriptionListItem";
import LocalPharmacyOutlinedIcon from '@material-ui/icons/LocalPharmacyOutlined';

const cx = classnames.bind(style);

function MedicinePrescriptionList(props) {
    const deleteMedicineAll = () => {
        props.deleteMedicineAll();
    };

    return(
        <>
        <div className="mt-4">
            <h4 className="mb-1 ml-3 mb-4">약품 처방 목록</h4>
            {
                props.isModalVisible && (<MedicineModal handleModal={props.handleModal} addMedicines={props.addMedicines} medicines={props.medicines}/>)
            }
            <Button className={cx("diagnosis-medicine-button", "mb-2 mr-2")} onClick={props.handleModal}>검색</Button>
            <Button deleteButton={true} className="mb-2" onClick={deleteMedicineAll}>전체 삭제</Button>
            <MDBTable  className={cx("table-hover", "diagnosis-tbh")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr>
                    <th style={{width:"50px"}}></th>
                    <th>약품코드</th>
                    <th>약품명</th>
                    <th>단위</th>
                    <th>수량</th>
                    </tr>
                </thead>
                
            </MDBTable>

            {props.medicines.length > 0 ?
                <MDBTable scrollY className={cx("table-hover ", "diagnosis-tbb")}>
                    <MDBTableBody>
                    {props.medicines && props.medicines.map((medicine) => {
                                    return (
                                        <MedicinePrescriptionListItem key={medicine.medicine_id} medicine={medicine} deleteMedicine={props.deleteMedicine} handleCount={props.handleCount}/>
                                    )
                                })}
                    </MDBTableBody>
                </MDBTable>
            :
                <LocalPharmacyOutlinedIcon  style={{width: "100%", height: "6em", color:"#ced4da", marginTop:"5%"}} />
            }
        </div>
        </>
    );
}

export default MedicinePrescriptionList;