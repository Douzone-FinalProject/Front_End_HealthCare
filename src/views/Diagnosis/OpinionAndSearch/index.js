import SymptomAndOpinion from "./SymptomAndOpinion";
import SearchPatients from "./SearchPatients";
import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import { useState } from "react";

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
    
    return(
        <>    
            <div className={cx("diagnosis-opinionAndSearch-widthAndHeight")}>
                <Button init={initButton} className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus")} onClick={changeToOpinion}>증상 및 소견</Button>
                <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-buttonFocus")} onClick={() => changeToSearch(false)}>환자 검색</Button>
                {page.change === "1"?
                    <SymptomAndOpinion selectedPatient={props.selectedPatient}/>
                    :
                    <SearchPatients/>
                }
            </div>
        </>
    );
}

export default OpinionAndSearch;