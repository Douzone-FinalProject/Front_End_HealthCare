import style from "../Diagnosis.module.css";
import classnames from "classnames/bind";
import Button from "../../common/Button";

const cx = classnames.bind(style);

function SymptomAndOpinion(props) {
    return(
        <>
        <div className="mt-4">
            <h4 className={cx("diagnosis-opinionAndSearch-title","mb-2")}>증상 및 소견</h4>
            <input className={cx("diagnosis-opinionAndSearch-date")} type="date"/>
            <table className={cx("table-bordered table-hover","diagnosis-table", "diagnosis-opinionAndSearch-tableInterval")}>
                <tbody className={cx("")}>
                    <tr>
                    <td className={cx("diagnosis-opinionAndSearch-chart")}>100412</td>
                    <td></td>
                    <td className={cx("diagnosis-opinionAndSearch-dateTable")}>2021-06-16</td>
                    <td className={cx("diagnosis-opinionAndSearch-state")}>검사중</td>
                    </tr>
                    <tr>
                    <td className={cx("diagnosis-opinionAndSearch-chart")}>100412</td>
                    <td>당뇨 의심.<br/>혈액 검사 후 재진 필요</td>
                    <td className={cx("diagnosis-opinionAndSearch-dateTable")}>2021-06-13</td>
                    <td className={cx("diagnosis-opinionAndSearch-state")}></td>
                    </tr>
                    <tr>
                    <td className={cx("diagnosis-opinionAndSearch-chart")}>100412</td>
                    <td>당뇨 의심.<br/>혈액 검사 후 재진 필요</td>
                    <td className={cx("diagnosis-opinionAndSearch-dateTable")}>2021-03-12</td>
                    <td className={cx("diagnosis-opinionAndSearch-state")}></td>
                    </tr>
                    <tr>
                    <td className={cx("diagnosis-opinionAndSearch-chart")}>100412</td>
                    <td>당뇨 의심.<br/>혈액 검사 후 재진 필요</td>
                    <td className={cx("diagnosis-opinionAndSearch-dateTable")}>2020-08-29</td>
                    <td className={cx("diagnosis-opinionAndSearch-state")}>완료</td>
                    </tr>
                    <tr>
                    <td className={cx("diagnosis-opinionAndSearch-chart")}>100412</td>
                    <td>당뇨 의심.<br/>혈액 검사 후 재진 필요</td>
                    <td className={cx("diagnosis-opinionAndSearch-dateTable")}>2019-04-16</td>
                    <td className={cx("diagnosis-opinionAndSearch-state")}></td>
                    </tr>
                </tbody>
            </table>
            <div className={cx("mt-3")}>
                <Button className={cx("diagnosis-button","diagnosis-opinionAndSearch-button")}>소견 작성</Button>
                <Button className={cx("diagnosis-button")}>결과 조회</Button>
            </div>    
        </div>
        </>
    );
}

export default SymptomAndOpinion;