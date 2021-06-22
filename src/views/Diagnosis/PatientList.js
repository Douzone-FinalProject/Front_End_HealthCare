import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import PatientListItem from "./PatientListItem";

const cx = classnames.bind(style);

function PatientList(props) {
    
    const selectPatient = (event) => {
        props.selectPatient(event);
        
    };

    return(
        <>
        <div className="mt-4">
            <h4 className="mb-4 ml-3">환자 리스트</h4>
            <table className={cx("table table-hover ml-2", "diagnosis-table")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th>차트번호</th>
                    <th>성명</th>
                    <th>상태</th>
                    <th>접수시간</th>
                    </tr>
                </thead>
                <tbody className={cx("diagnosis-table-body")}>
                {props.patients.map((patient) => {
                        return (
                            <PatientListItem key={patient.patient_id} patient={patient} selectPatient={selectPatient} />
                        );
                    })}
                </tbody>    
            </table>
        </div>
        </>
    );
}

export default PatientList;