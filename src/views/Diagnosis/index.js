import PatientList from "./PatientList";
import SymptomSearch from "./SymptomSearch";
import DiagnosticCheckList from "./DiagnosticCheckList";
import MedicineAndSymptom from "./MedicineAndSymptom";
import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";

const cx = classnames.bind(style);

function Diagnosis(props) {
    return(
        <>
        <div className="d-flex">
            <div>
                <div className="d-flex flex-row ml-3 mr-2 mt-4 mb-2">
                    <div className={cx("diagnosis-component-background", "diagnosis-patient-widthAndHeight", "mr-3")}>
                      <PatientList/>
                    </div>
                    <div className={cx("diagnosis-component-background", "diagnosis-symptom-widthAndHeight")}>
                      <SymptomSearch/>
                    </div>
                </div>
                <div className={cx("diagnosis-component-background", "ml-3 mr-2")} style={{height: "435px"}}>
                      <DiagnosticCheckList/>
                </div>
            </div>
            <div>
                <MedicineAndSymptom/>
            </div>
        </div>    
        </>
    );
}

export default Diagnosis;