import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";

const cx = classnames.bind(style);

function PatientList(props) {
    return(
        <>
        <div className="mt-4">
            <h4 className="mb-4 ml-3">환자 리스트</h4>
            <table className={cx("table table-hover ml-3", "diagnosis-table")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th>차트번호</th>
                    <th>성명</th>
                    <th>상태</th>
                    <th>접수시간</th>
                    </tr>
                </thead>
                <tbody className={cx("diagnosis-table-body")}>
                    <tr>
                    <th>100552</th>
                    <td>이채정</td>
                    <td style={{color: "red"}}>진료 중</td>
                    <td>2021/06/03/ 13:21:15</td>
                    </tr>
                    <tr>
                    <th>100412</th>
                    <td>조민상</td>
                    <td style={{color: "blue"}}>수납 전</td>
                    <td>2021/06/03/ 13:25:15</td>
                    </tr>
                    <tr>
                    <th>100732</th>
                    <td>임도희</td>
                    <td style={{color: "gold"}}>대기</td>
                    <td>2021/06/03/ 13:40:15</td>
                    </tr>
                    <tr>
                    <th>100212</th>
                    <td>강병주</td>
                    <td style={{color: "gold"}}>대기</td>
                    <td>2021/06/03/ 13:46:15</td>
                    </tr>
                    <tr>
                    <th>100002</th>
                    <td>신용권</td>
                    <td style={{color: "gold"}}>대기</td>
                    <td>2021/06/03/ 14:00:00</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    );
}

export default PatientList;