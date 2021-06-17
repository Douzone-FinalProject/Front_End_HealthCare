import style from "./result.module.css"
import classnames from "classnames/bind";

const cx = classnames.bind(style);

function SpecimenNum(props) {
    return (
        <table className={cx("result-table", "table table-bordered")}>
            <thead className={cx("result-toptablecol")}>
                <tr>
                    <th></th>
                    <th>검체번호</th>
                    <th>성명</th>
                    <th>상태</th>
                    <th>검사일자</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>11111111</td>
                    <td>조민상</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>11111112</td>
                    <td>조민상</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>11111113</td>
                    <td>조민상</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>11111114</td>
                    <td>조민상</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>22222221</td>
                    <td>강병주</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>22222222</td>
                    <td>강병주</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>33333331</td>
                    <td>임도희</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>33333331</td>
                    <td>임도희</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>33333331</td>
                    <td>임도희</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>33333331</td>
                    <td>임도희</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
                <tr>
                    <td>11</td>
                    <td>33337771</td>
                    <td>이채정</td>
                    <td>완료</td>
                    <td>210615</td>
                </tr>
            </tbody>
        </table>
    );
}

export default SpecimenNum;