import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import PatientListItem from "./PatientListItem";
import { MDBTable, MDBTableBody} from 'mdbreact';
import Clock from 'react-live-clock';
const cx = classnames.bind(style);

function PatientList(props) {
    
    const selectPatient = (event1, event2, event3, receipt_id) => {
        props.selectPatient(event1, event2, event3, receipt_id);
        
    };

    return(
        <>
        <div className="mt-4">
            <h4 className="mb-4 ml-3">환자 리스트</h4>
            <Clock className={cx("timeInterval")} format={'MM 월 DD 일  HH시 mm분 ss초'} ticking={true} timezone={'Asia/Seoul'}/> 
            <MDBTable scrollY className={cx("table table-hover", "diagnosis-tbh")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th>차트번호</th>
                    <th>성명</th>
                    <th>상태</th>
                    <th>접수시간</th>
                    </tr>
                </thead>
            </MDBTable>
            <MDBTable scrollY className={cx("table-hover ", "diagnosis-tbb")}>
                <MDBTableBody>
                {props.patients.map((patient) => {
                        return (
                            <PatientListItem key={patient.patient_id} patient={patient} selectPatient={selectPatient} />
                        );
                    })}
                </MDBTableBody>    
            </MDBTable>
            
        </div>
        </>
    );
}

export default PatientList;