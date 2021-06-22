import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../common/Button";
import { MDBTable, MDBTableBody } from 'mdbreact';
import MedicineModal from "./MedicineModal";
import { useState } from "react";


const cx = classnames.bind(style);

function MedicinePrescriptionList(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [medicines, setMedicines] =  useState();

    const handleModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    const addMedicines = (data) => {
        setIsModalVisible(!isModalVisible);
        setMedicines(data);
    }

    return(
        <>
        <div className="mt-4">
            <h4 className="mb-1 ml-3 mb-4">약품 처방 목록</h4>
            <Button className={cx("diagnosis-medicine-button", "mb-2")} onClick={handleModal}>검색</Button>
            {
                isModalVisible && (<MedicineModal handleModal={handleModal} addMedicines={addMedicines} medicines={medicines}/>)
            }
            <Button deleteButton={true} className="mb-2">전체 삭제</Button>
            <MDBTable  className={cx("table-hover", "diagnosis-table1")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th><input hidden type="checkbox"/></th>
                    <th>약품코드</th>
                    <th>약품명</th>
                    <th>단위</th>
                    <th>수량</th>
                    </tr>
                </thead>
            </MDBTable>    
            <MDBTable scrollY className={cx("table-hover ", "diagnosis-table2")}>
                <MDBTableBody>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td></td>
                    <td title="PULMICORT RESPULES Solution 0.5mg/2ml" className={cx("diagnosis-alphabet")}>PULMICORT RESPULES Solution 0.5mg/2ml </td>
                    <td>BAG</td>
                    <td><input className={cx("diagnosis-medicine-input")} type="text"/></td>
                    </tr>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td>ISOSP</td>
                    <td title="ISOKET Spray 15ml" className={cx("diagnosis-alphabet")}>ISOKET Spray 15ml </td>
                    <td>PEN</td>
                    <td className="mr-5"><input className={cx("diagnosis-medicine-input")} type="text"/></td>
                    </tr>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td>JCONCER</td>
                    <td title="PULMICORT RESPULES Solution 0.5mg/2ml" className={cx("diagnosis-alphabet")}>PULMICORT RESPULES Solution 0.5mg/2ml </td>
                    <td>BAG</td>
                    <td><input className={cx("diagnosis-medicine-input")} type="text"/></td>
                    </tr>
                    
                    
                

                </MDBTableBody>
            </MDBTable>
            {medicines && medicines.map(medicine => <div key={medicine.medicine_id}>{medicine.medicine_id}</div>)}
        </div>
        </>
    );
}

export default MedicinePrescriptionList;