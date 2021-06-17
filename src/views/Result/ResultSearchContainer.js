import style from "./result.module.css"
import classnames from "classnames/bind";
import ResultNameBox from "./ResultNameBox";
import ResultButton from "./ResultButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Route, Switch, useHistory } from "react-router-dom";
import DianosisNum from "./DianosisNum";
import SpecimenNum from "./SpecimenNum";

const cx = classnames.bind(style);

function ResultSearchContainer(props) {
    //현재 날짜
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0,10);
    const history = useHistory();
    const handleSwitch = async (event) => {
        if(event.target.name === "dianonum") {
            history.push("/result");
        } else if(event.target.name === "specinum") {
            history.push("/result/specimennum");
        }
    };
    
    return (
        <div className={cx("result-container")}>
            <div className={cx("result-smallcontainer")}>
                <ResultNameBox>검사분야</ResultNameBox>
                <div className={cx("result-whitebox")}>진단검사</div>
            </div>
            <div className={cx("result-smallcontainer")}>
                <ResultNameBox>환자이름</ResultNameBox>
                <input type="text" className={cx("result-whitebox")}/>
            </div>
            <div className={cx("result-smallcontainer")}>
                <input type="checkbox"/> <small className="ml-1">Today</small>
            </div>
            <div className={cx("result-smallcontainer")}>
                <ResultNameBox>검사일자</ResultNameBox>
                <input type="date" defaultValue={date} className={cx("result-inputbox")}/>
            </div>
            <div className={cx("result-smallcontainer")}>
                <ResultNameBox>검사상태</ResultNameBox>
                <select name="diastate" className={cx("result-whitebox")}>
                    <option value="all">전체</option>
                    <option value="diaready">검사대기</option>
                    <option value="diareceipt">검사접수</option>
                    <option value="diafinish">검사완료</option>
                </select>
            </div>
            <div className={cx("result-smallcontainer", "justify-content-end")}>
                <ResultButton><FontAwesomeIcon icon={faSearch} className="mr-1" />조회</ResultButton>
            </div>
            <div className={cx("result-smallcontainer")}>
                <ResultButton onClick={handleSwitch} name="dianonum">진단번호</ResultButton>
                <ResultButton className="ml-1" onClick={handleSwitch} name="specinum">검체번호</ResultButton>
            </div>
            <div className={cx("result-lefttable")}>
                <Switch>
                    <Route path={`${props.props.match.url}`} exact component={DianosisNum}/>
                    <Route path={`${props.props.match.url}/specimennum`} exact component={SpecimenNum}/>
                </Switch>
            </div>
        </div>
    );
}

export default ResultSearchContainer;