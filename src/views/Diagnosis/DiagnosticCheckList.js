import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../common/Button";
import DiagnosticCheckListItem from "./DiagnosticCheckListItem"
import { MDBTable, MDBTableBody } from 'mdbreact';

const cx = classnames.bind(style);

function DiagnosticCheckList(props) {
   
    const deleteAll = (event) => {
        props.deleteAll(event);
    };

    return(
        <>
        <div className="mt-4">
            <h4 className={cx("diagnosis-checkList-titleInterval")}>진단 검사 목록</h4>
            <div className="d-flex justify-content-end mr-3">
            <Button deleteButton={true} className={cx("diagnosis-checkList-button")} onClick={deleteAll}>전체 삭제</Button>
            
            </div>
            <MDBTable className={cx("diagnosis-checkList-tableInterval","diagnosis-tbh")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr>
                        <th style={{width:"50px"}}></th>
                    <th>증상코드</th>
                    <th>묶음코드</th>
                    <th>검사명</th>
                    <th>검체명</th>
                    <th>용기</th>
                    <th>검사실</th>
                    </tr>
                </thead>
            </MDBTable>
            <MDBTable scrollY className={cx("table-hover ", "diagnosis-tbb")}>     
                <MDBTableBody>
                     {props.selectSymptoms.map((item) => {
                                return (
                                    <DiagnosticCheckListItem key={item.search_id} item={item} deletePrescript={props.deletePrescript}/>
                                )
                            })}
                </MDBTableBody>
            </MDBTable>
            
            {props.selectSymptoms.length !== 0?
            <div className="d-flex justify-content-end mr-3">
            <Button className={cx("diagnosis-checkList-button2","mt-2")} onClick={() => props.testRequest(props.selectedPatient)}>검사 요청</Button>
            </div>
            :
            <>
            </>
            }

        </div>
        </>
    );
}

export default DiagnosticCheckList;