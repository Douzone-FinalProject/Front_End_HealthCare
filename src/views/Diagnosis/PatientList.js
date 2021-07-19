import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import PatientListItem from "./PatientListItem";
import { MDBTable, MDBTableBody} from 'mdbreact';
import Clock from 'react-live-clock';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';

const cx = classnames.bind(style);


function PatientList(props) {

    return(
        <>
        <div className="mt-4">
            <h4 className="ml-3" style={{marginBottom:"7%"}}>환자 리스트</h4>

            <div className="d-flex flex-row">
                <div style={{marginLeft:"33%", marginBottom:"1%"}}><Clock className={cx("timeInterval")} format={'MM 월 DD 일  HH시 mm분 ss초'} ticking={true} timezone={'Asia/Seoul'}/> </div>
            </div>
            <MDBTable scrollY className={cx("table", "diagnosis-tbh")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th>차트번호</th>
                    <th>성명</th>
                    <th>상태</th>
                    <th>접수시간</th>
                    </tr>
                </thead>
            </MDBTable>
            {props.patients.length > 0 ? 
                <MDBTable scrollY className={cx("table-hover ", "diagnosis-tbb")}>
                    <MDBTableBody>
                    {props.patients.map((patient) => {
                            return (
                                
                                <PatientListItem key={patient.patient_id} patient={patient} selectPatient={props.selectPatient} selectedPatient={props.selectedPatient} />
                            );
                        })}
                    </MDBTableBody>    
                </MDBTable>
            :
            <FaceOutlinedIcon style={{width: "100%", height: "6em", color:"#ced4da", marginTop:"10%"}} />
            }
        </div>
        </>
    );
}

export default PatientList;