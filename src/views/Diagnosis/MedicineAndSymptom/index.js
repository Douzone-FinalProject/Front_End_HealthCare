//import {Switch, Route, Link} from "react-router-dom";
import MedicinePrescriptionList from "./MedicinePrescriptionList";
import SymptomAndOpinion from "./SymptomAndOpinion";
import SearchPatients from "./SearchPatients";
import PatientList from "../PatientList";
import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import { useState } from "react";

const cx = classnames.bind(style);

function MedicineAndSymptom(props) {

    
    const [page, setPage] = useState({
        change: "1"
    });

    const changeToOpinion = () =>{
        setPage({
            ...page,
            change: page.change="1"
        })
        
    };
    console.log(page);
    const changeToSearch = () =>{
        setPage({
            ...page,
            change: page.change="2"
        })
    };


    return(
        <>
        <div className="d-flex flex-column mt-4">
            <div className={cx("diagnosis-component-background", "diagnosis-medicine-widthAndHeight", "mr-3")}>
                <MedicinePrescriptionList/>
            </div>
            <div className="mt-2">
                <Button className={cx("diagnosis-button")} onClick={changeToOpinion}>증상 및 소견</Button>
                <Button className={cx("diagnosis-button")} onClick={changeToSearch}>환자 검색</Button>
            </div>
            <div className={cx("diagnosis-component-background", "diagnosis-opinionAndSearch-widthAndHeight", "mr-3 mb-2")}>
            {page.change === "1"?
                <SymptomAndOpinion/>
                :
                <SearchPatients/>
            }
            </div>
        </div>


        </>
    );
}

export default MedicineAndSymptom;