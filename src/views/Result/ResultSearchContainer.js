import style from "./result.module.css"
import classnames from "classnames/bind";
import ResultNameBox from "./ResultNameBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Route, Switch } from "react-router-dom";
import DianosisNum from "./DianosisNum";
import SpecimenNum from "./SpecimenNum";
import Button from "views/common/Button";
import { useState, useEffect, useCallback, useMemo } from "react";
import { getDiagnosticData, getReceiptData } from "./data";

const cx = classnames.bind(style);

function ResultSearchContainer(props) {
    //오늘 날짜
    var date = useMemo(() => {
        var curr = new Date();
        curr.setDate(curr.getDate());
        return curr.toISOString().substr(0,10);
    }, []);

    //검색을 하기 위한 상태
    const [name, setName] = useState('');
    const [receipt_datetime, setReceipt_datetime] = useState(date);
    const [today, setToday] = useState(true);
    //진단번호, 검체번호별로 출력될 상태
    const [receiptData, setReceiptData] = useState([]);
    const [specimenData, setSpecimenData] = useState([]);
    //버튼 색을 바꾸기 위한 상태
    const [colorReceipt, setColorReceipt] = useState('');
    const [colorSpecimen, setColorSpecimen] = useState('');

    // const history = useHistory();

    //진단번호, 검체번호별로 url을 이동하고, 현재 url에 따라 버튼 색을 바꿈
    const handleSwitch = useCallback((event) => {
        if(event.target.name === "dianonum") {
            setColorReceipt('white');
            setColorSpecimen('');
            props.props.history.push("/result");
        } else if(event.target.name === "specinum") {
            setColorSpecimen('white');
            setColorReceipt('');
            props.props.history.push("/result/specimennum");
        }
    }, [props.props]);

    //input 상태를 바꿈(name, date, today 체크박스)
    const handleNameChange = useCallback((event) => {
        setName(event.target.value);
    }, []);
    const handleDateChange = useCallback((event) => {
        setReceipt_datetime(event.target.value);
        if(event.target.value !== date) {
            setToday(false);
        } else {
            setToday(true);
        }
    }, [date]);
    const handleTodayChange = useCallback((event) => {
        if(event.target.checked) {
            setToday(true)
            setReceipt_datetime(date);
        } else {
            if(receipt_datetime === date) {
                setToday(true)
            } else {
                setToday(false)
            }
        }
    }, [date, receipt_datetime]);

    //조회 버튼 클릭 시, 검색조건별로 데이터를 가져옴.
    const handleSearch = useCallback((argName, argReceipt_datetime) => {
        setReceiptData(getReceiptData(argName, argReceipt_datetime));
        setSpecimenData(getDiagnosticData(argName, argReceipt_datetime));
    }, []);

    //처음 화면에 보여질 때, 기본값인 오늘 기준으로 데이터를 가져옴.
    //receipt_datetime이 바뀔 때마다 데이터를 가져옴.
    useEffect(() => {
        setReceiptData(getReceiptData('', receipt_datetime));
        setSpecimenData(getDiagnosticData('', receipt_datetime));
    }, [receipt_datetime]);

    return (
        <div className={cx("result-container")}>
            <div className={cx("result-smallcontainer")}>
                <ResultNameBox>검사분야</ResultNameBox>
                <div className={cx("result-whitebox")}>진단검사</div>
            </div>
            <div className={cx("result-smallcontainer")}>
                <ResultNameBox>환자이름</ResultNameBox>
                <input type="text" className={cx("result-whitebox")} value={name} onChange={handleNameChange}/>
            </div>
            <div className={cx("result-smallcontainer")}>
                <input type="checkbox" onChange={handleTodayChange} checked={today} /> <small className="ml-1">Today</small>
            </div>
            <div className={cx("result-smallcontainer")}>
                <ResultNameBox>검사일자</ResultNameBox>
                <input type="date" className={cx("result-inputbox")} value={receipt_datetime} onChange={handleDateChange}/>
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
            <div className={cx("result-smallcontainer")}>
                <Button className={cx("result-button")} onClick={()=>handleSearch(name, receipt_datetime)}><FontAwesomeIcon icon={faSearch} className="mr-1"/>조회</Button>
                <div className="w-100 d-flex justify-content-end">
                <Button className={cx("result-button")} onClick={handleSwitch} name="dianonum" style={{backgroundColor: colorReceipt}}>진단번호</Button>
                <Button className={cx("result-button", "ml-1")} onClick={handleSwitch} name="specinum" style={{backgroundColor: colorSpecimen}}>검체번호</Button>
                </div>
            </div>
            <div className={cx("result-lefttable")}>
                <Switch>
                    <Route path={`${props.props.match.url}`} exact render={() => <DianosisNum receiptData={receiptData} handleResult={props.handleResult} index={props.ReceiptIndex} />}/>
                    <Route path={`${props.props.match.url}/specimennum`} exact render={() => <SpecimenNum specimenData={specimenData} handleResult={props.handleResult} index={props.SpecimenIndex} />}/>
                </Switch>
            </div>
        </div>
    );
}

export default ResultSearchContainer;