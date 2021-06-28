import style from "./result.module.css"
import classnames from "classnames/bind";
import { useEffect } from "react";

const cx = classnames.bind(style);

function ResultTopTable(props) {
    useEffect(() => {
        console.log(props);
    }, [props]);
    //우측 상단 테이블(환자의 기본정보와 검체별 정보를 보여줌)
    return (
        <table className={cx("result-toptable", "table table-borderless mt-4")}>
            <tbody>
                <tr>
                    <td className={cx("result-toptablecol")} width='100'>환자이름</td>
                    <td width='150' style={{backgroundColor: '#f8f9fa'}}>{props.patientData.name}</td>
                    <td className={cx("result-toptablecol")} width='100'>진단명</td>
                    <td width='170' style={{backgroundColor: '#f8f9fa'}}>{props.patientData.diag_name}</td>
                    <td className={cx("result-toptablecol")} width='100'>채혈일시</td>
                    <td width='150' style={{backgroundColor: '#f8f9fa'}}>{props.patientData.blood_datetime}</td>
                    <td className={cx("result-toptablecol2")} width='100'>검체번호</td>
                    <td width='150' style={{backgroundColor: '#f8f9fa'}}>{props.specimenData.diagnostic_specimen_number}</td>
                    <td className={cx("result-toptablecol2")} width='100'>의사명</td>
                    <td width='150' style={{backgroundColor: '#f8f9fa'}}>{props.specimenData.doctor}</td>
                </tr>
                <tr>
                    <td className={cx("result-toptablecol")}>생년월일</td>
                    <td style={{backgroundColor: '#f8f9fa'}}>{props.patientData.ssn}</td>
                    <td className={cx("result-toptablecol")}>성별</td>
                    <td style={{backgroundColor: '#f8f9fa'}}>{props.patientData.sex}</td>
                    <td className={cx("result-toptablecol")}>접수일시</td>
                    <td style={{backgroundColor: '#f8f9fa'}}>{props.patientData.receipt_datetime}</td>
                    <td className={cx("result-toptablecol2")}>바코드</td>
                    <td style={{backgroundColor: '#f8f9fa'}}>{props.specimenData.barcode}</td>
                    <td className={cx("result-toptablecol2")}>검사자명</td>
                    <td style={{backgroundColor: '#f8f9fa'}}>{props.specimenData.nurse}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default ResultTopTable;