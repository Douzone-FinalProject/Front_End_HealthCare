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

    const changeToOpinion = (event) => {
        setPage({
            ...page,
            change: page.change="1"
        })
        
    };
    const [initButton, setInitButton] = useState(true);
    
    function initCancleButton() {
        setInitButton(false);
    }

    const changeToSearch = (event) => {
        initCancleButton();
        setPage({
            ...page,
            change: page.change="2"
        })
    };
    
    //수정 모달 작성

    


    return(
        <>    
         <UpdateOpinion updateIsOpen={props.updateIsOpen} closeUpdateModal={props.closeUpdateModal} medicines={props.medicines} medicineCount={props.medicineCount} handleCount={props.handleCount} quantity={props.quantity} reportOpinion={props.reportOpinion} reportSuccess={props.reportSuccess} opp={props.opp} updatOpinion={props.updatOpinion} saveOpinion={props.saveOpinion} opinions={props.opinions} medicopp={props.medicopp}/>
            <div className={cx("diagnosis-opinionAndSearch-widthAndHeight")}>
                <Button init={initButton} className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus")} onClick={changeToOpinion}>증상 및 소견</Button>
                <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus")} onClick={() => changeToSearch(false)}>환자 검색</Button>
                {page.change === "1"?
                    <SymptomAndOpinion fatientOpinion={props.fatientOpinion} medicines={props.medicines}  selectedPatient={props.selectedPatient} handleCount={props.handleCount}  handleT={props.handleT} reportOpinion={props.reportOpinion} reportSuccess={props.reportSuccess} modalIsOpen={props.modalIsOpen} openModal={props.openModal} closeModal={props.closeModal} openOpinion={props.openOpinion} selectOpinion={props.selectOpinion} selectReceipt_id={props.selectReceipt_id}/>
                    :
                    <SearchPatients opinions={props.opinions} selectedPatient={props.selectedPatient} openOpinion={props.openOpinion} selectOpinion2={props.selectOpinion2} selectReceipt_id2={props.selectReceipt_id2}/>
                }
            </div>
        </>
    );
}

export default OpinionAndSearch;