import style from "./result.module.css"
import classnames from "classnames/bind";

const cx = classnames.bind(style);

function ResultTopTable(props) {
    return (
        <table className={cx("result-toptable", "table table-bordered mt-4")}>
            <tbody>
                <tr>
                    <td className={cx("result-toptablecol")}>50000001</td>
                    <td>M/43</td>
                    <td className={cx("result-toptablecol")}>진단명</td>
                    <td>당뇨</td>
                    <td className={cx("result-toptablecol")}>채혈일시</td>
                    <td>2021-06-15</td>
                    <td className={cx("result-toptablecol")}>검체번호</td>
                    <td>11111111</td>
                    <td className={cx("result-toptablecol")}>의사명</td>
                    <td>신용권</td>
                </tr>
                <tr>
                    <td className={cx("result-toptablecol")}>강팀장</td>
                    <td>960206-1******</td>
                    <td className={cx("result-toptablecol")}>처방일시</td>
                    <td>2021-06-15</td>
                    <td className={cx("result-toptablecol")}>접수일시</td>
                    <td>2021-06-15</td>
                    <td className={cx("result-toptablecol")}>바코드</td>
                    <td>EDTABNP1</td>
                    <td className={cx("result-toptablecol")}>검사자명</td>
                    <td>양미연</td>
                </tr>
            </tbody>
        </table>
    );
}

export default ResultTopTable;