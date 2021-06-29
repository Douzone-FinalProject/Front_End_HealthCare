import SymptomAndOpinion from "./SymptomAndOpinion";
import SearchPatients from "./SearchPatients";
import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import { useState } from "react";
import UpdateOpinion from "./UpdateOpinion";

const cx = classnames.bind(style);

function OpinionAndSearch(props) {
    const [page, setPage] = useState({
        change: "1"
    });

    const changeToSearch = () => {
        setPage({
            ...page,
            change: page.change="2"
        })
    };
    const changeToOpinion = () => {
        setPage({
            ...page,
            change: page.change="1"
        })
        
    };
    //수정 모달 작성

    


    return(
        <>    
         <UpdateOpinion updateIsOpen={props.updateIsOpen} closeUpdateModal={props.closeUpdateModal} medicines={props.medicines} medicineCount={props.medicineCount} handleCount={props.handleCount} quantity={props.quantity} reportOpinion={props.reportOpinion} reportSuccess={props.reportSuccess} opp={props.opp} updatOpinion={props.updatOpinion} saveOpinion={props.saveOpinion} opinions={props.opinions} medicopp={props.medicopp} saveMedicine={props.saveMedicine} />
            <div className={cx("diagnosis-opinionAndSearch-widthAndHeight")}>
                {page.change === "1"?
                    <SymptomAndOpinion fatientOpinion={props.fatientOpinion} medicines={props.medicines}  selectedPatient={props.selectedPatient} handleCount={props.handleCount}  handleT={props.handleT} reportOpinion={props.reportOpinion} reportSuccess={props.reportSuccess} modalIsOpen={props.modalIsOpen} openModal={props.openModal} closeModal={props.closeModal} openOpinion={props.openOpinion} selectOpinion={props.selectOpinion} selectReceipt_id={props.selectReceipt_id} changeToSearch={changeToSearch}/>
                    :
                    <SearchPatients opinions={props.opinions} selectedPatient={props.selectedPatient} openOpinion={props.openOpinion} selectOpinion2={props.selectOpinion2} selectReceipt_id2={props.selectReceipt_id2} changeToOpinion={changeToOpinion}/>
                }
            </div>
        </>
    );
}

export default OpinionAndSearch;