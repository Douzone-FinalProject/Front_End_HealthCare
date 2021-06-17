import style from "./result.module.css"
import classnames from "classnames/bind";
import ResultTopTable from "./ResultTopTable";
import ResultTable from "./ResultTable";
import ResultButton from "./ResultButton";
import { useState } from 'react';
import CreatePatient from "views/CreatePatient";

const cx = classnames.bind(style);

function ResultContainer(props) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className={cx("result-secondcontainer")}>
            <div className={cx("result-height")}>
                <div className="d-flex justify-content-center">
                    <ResultTopTable />
                </div>
                <div className={cx("d-flex justify-content-center", "result-scroll")}>
                    <ResultTable />
                </div>
            </div>
            <div>
                <div className="d-flex justify-content-center">
                    <div className={cx("result-imgbox")}>
                        <img src="http://localhost:3000/logo512.png" alt="" height="100%"/>
                        <img src="http://localhost:3000/logo512.png" alt="" height="100%"/>
                        <img src="http://localhost:3000/logo512.png" alt="" height="100%"/>
                        <img src="http://localhost:3000/logo512.png" alt="" height="100%"/>
                        <img src="http://localhost:3000/logo512.png" alt="" height="100%"/>
                    </div>
                </div>
            </div>
            <div>
                <div className="d-flex justify-content-center">
                    <div className={cx("result-buttonbox", "d-flex justify-content-end")}>
                        <ResultButton>저장</ResultButton>
                        <ResultButton className="ml-2" onClick={openModal}>뒤로</ResultButton>
                        <CreatePatient modalIsOpen={modalIsOpen} closeModal={closeModal}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultContainer;