import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";
import CreateOpinion from "./CreateOpinion";
import OpinionListItem from "./OpinionListItem";
import {useState} from "react";
import { MDBTable, MDBTableBody } from 'mdbreact';

const cx = classnames.bind(style);

function SymptomAndOpinion(props) {
    

    const addCheckOpinion = (event) => {

    };


    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return(
        <>
        
        <div className={cx("mt-4")}>
            <h4 className={cx("diagnosis-opinionAndSearch-title","mb-3")}>증상 및 소견</h4>
            <div className={cx("diagnosis-opinion-tabaleinterval")}></div>
                <div className={cx("diagnosis-opinionAndSearch-tabaleHeight")}>
                    <MDBTable scrollY className={cx("diagnosis-table", "diagnosis-opinionAndSearch-tableInterval", "table-hover")}>
                        <MDBTableBody> 
                        {props.fatientOpinion.map((opinion) => {
                                return (
                                    <OpinionListItem key={opinion.receipt_id} opinion={opinion}  />
                                )
                            })}
                        </MDBTableBody>
                    </MDBTable>
                </div>
                <div>
                    <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button")} onClick={openModal}>소견 작성</Button>
                    <Button className={cx("diagnosis-button")}>결과 조회</Button>
                </div>    
                <CreateOpinion modalIsOpen={modalIsOpen} closeModal={closeModal}/>  
        </div>
        </>
    );
}

export default SymptomAndOpinion;