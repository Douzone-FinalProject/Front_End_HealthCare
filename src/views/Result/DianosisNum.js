import style from "./result.module.css"
import classnames from "classnames/bind";

const cx = classnames.bind(style);

function DianosisNum(props) {
    return (
        <table className={cx("result-table", "table table-bordered")}>
            <thead className={cx("result-toptablecol")}>
                <tr>
                    <th></th>
                    <th>진단번호</th>
                    <th>성명</th>
                    <th>상태</th>
                    <th>검사일자</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>10000001</td>
                    <td>조민상</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>10000002</td>
                    <td>강병주</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>10000003</td>
                    <td>임도희</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>10000004</td>
                    <td>이채정</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
            </tbody>
        </table>
    );
}

export default DianosisNum;