import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";

const cx = classnames.bind(style);

function MedicinePrescriptionList(props) {
    return(
        <>
        <div className="mt-4">
            <h4 className="mb-1 ml-3">약품 처방 목록</h4>
            <Button className={cx("diagnosis-medicine-button", "mb-2")}>검색</Button>
            <Button deleteButton={true} className="mb-2">삭제</Button>
            <table className={cx("table table-hover ml-3", "diagnosis-table")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th></th>
                    <th>약품코드</th>
                    <th>약품명</th>
                    <th>수량</th>
                    <th>단위</th>
                    </tr>
                </thead>
                <tbody className={cx("diagnosis-table-body")}>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td>JCONCER</td>
                    <td>PULMICORT RESPULES Solution 0.5mg/2ml </td>
                    <td><input className={cx("diagnosis-medicine-input")} type="text"/></td>
                    <td>BAG</td>
                    </tr>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td>ISOSP</td>
                    <td>ISOKET Spray 15ml </td>
                    <td><input className={cx("diagnosis-medicine-input")} type="text"/></td>
                    <td>PEN</td>
                    </tr>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td>XHER</td>
                    <td>HERCEPTIN Inj 150mg </td>
                    <td><input className={cx("diagnosis-medicine-input")} type="text"/></td>
                    <td>EA</td>
                    </tr>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td>PAS-K</td>
                    <td>PAS Granule 3.3g/pk </td>
                    <td><input className={cx("diagnosis-medicine-input")} type="text"/></td>
                    <td>T</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    );
}

export default MedicinePrescriptionList;