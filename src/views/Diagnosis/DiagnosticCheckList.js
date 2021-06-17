import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../common/Button";
const cx = classnames.bind(style);

function DiagnosticCheckList(props) {
    return(
        <>
        <div className="mt-4">
            
            <h4 className={cx("diagnosis-checkList-titleInterval")}>진단 검사 목록</h4>
            <Button deleteButton={true} className={cx("diagnosis-checkList-button")}>삭제</Button>
            
            <table className={cx("table table-hover", "diagnosis-checkList-tableInterval","diagnosis-table")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr>
                    <th></th> 
                    <th>증상코드</th>
                    <th>묶음코드</th>
                    <th>검사명</th>
                    <th>검체명</th>
                    <th>용기</th>
                    <th>바코드 출력명</th>
                    </tr>
                </thead>
                <tbody className={cx("diagnosis-table-body")}>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td>SRC60</td>
                    <td>E7401</td>
                    <td>Valproic acid therapeutic drug monitoring</td>
                    <td>EDTA Blood</td>
                    <td>EDTA</td>
                    <td>EDTABNP1</td>
                    </tr>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td></td>
                    <td>B1020</td>
                    <td>헤마토크리트</td>
                    <td>EDTA Blood</td>
                    <td>EDTA</td>
                    <td>EDTABNP2</td>
                    </tr>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td></td>
                    <td>D0012</td>
                    <td>백혈구백분율</td>
                    <td>EDTA Blood</td>
                    <td>EDTA</td>
                    <td>EDTABNP3</td>
                    </tr>
                    <tr>
                    <td><input type="checkbox"/></td>
                    <td>UA7</td>
                    <td>D2252</td>
                    <td>Unine 7종</td>
                    <td>Unine</td>
                    <td>Unine</td>
                    <td>Unine</td>
                    </tr>
                </tbody>
            </table>
            <Button className={cx("diagnosis-checkList-button")}>검사 요청</Button>
        </div>
        </>
    );
}

export default DiagnosticCheckList;