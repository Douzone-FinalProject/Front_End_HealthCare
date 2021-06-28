import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../common/Button";
import { MDBTable, MDBTableBody } from 'mdbreact';
import MedicineModal from "./MedicineModal";
import MedicinePrescriptionListItem from "./MedicinePrescriptionListItem";
import { useState } from "react";


const cx = classnames.bind(style);

function MedicinePrescriptionList(props) {

    const handleModal = () => { 
        props.handleModal();        
    }

    const deleteMedicineAll = (event) => {
        props.deleteMedicineAll(event);
    };

    return(
        <>
        <div className="mt-4">
            <h4 className="mb-1 ml-3 mb-4">약품 처방 목록</h4>
            {
                props.isModalVisible && (<MedicineModal handleModal={props.handleModal} addMedicines={props.addMedicines} medicines={props.medicines}/>)
            }
            <Button className={cx("diagnosis-medicine-button", "mb-2 mr-2")} onClick={handleModal}>검색</Button>
            <Button deleteButton={true} className="mb-2" onClick={deleteMedicineAll}>전체 삭제</Button>
            <MDBTable  className={cx("table-hover", "diagnosis-tbh")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr>
                    <th></th>
                    <th>약품코드</th>
                    <th>약품명</th>
                    <th>단위</th>
                    <th>수량</th>
                    </tr>
                </thead>
            </MDBTable>    
            <MDBTable scrollY className={cx("table-hover ", "diagnosis-tbb")}>
                <MDBTableBody>
                {props.medicines && props.medicines.map((medicine) => {
                                return (
                                    <MedicinePrescriptionListItem key={medicine.medicine_id} medicine={medicine} deleteMedicine={props.deleteMedicine} handleCount={props.handleCount}/>
                                )
                            })}
                </MDBTableBody>
            </MDBTable>
            {/* {medicines && medicines.map(medicine => <div key={medicine.medicine_id}>{medicine.medicine_id}</div>)} */}
        </div>
        </>
    );
}

export default MedicinePrescriptionList;