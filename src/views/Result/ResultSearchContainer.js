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
import { getReceiptData, getDiagnosticData, getReceiptDataByRecieptId, getDiagnosticDataByReceiptId } from "apis/result";

const cx = classnames.bind(style);

function ResultSearchContainer(props) {
    //오늘 날짜
    var date = useMemo(() => {
        var curr = new Date();
        curr.setDate(curr.getDate());
        return curr.toISOString().substr(0,10);
    }, []);
    //스피너를 위한 상태
    const [loading, setLoading] = useState(false);
    //검색을 하기 위한 상태
    const [patient_name, setPatient_name] = useState('');
    const [receipt_datetime, setReceipt_datetime] = useState(date);
    const [today, setToday] = useState(true);
    //진단번호, 검체번호별로 출력될 상태
    const [receiptData, setReceiptData] = useState([]);
    const [specimenData, setSpecimenData] = useState([]);
    //버튼 색을 바꾸기 위한 상태
    const [colorReceipt, setColorReceipt] = useState({});
    const [colorSpecimen, setColorSpecimen] = useState({});

    // const history = useHistory();

    //진단번호, 검체번호별로 url을 이동하고, 현재 url에 따라 버튼 색을 바꿈
    const handleSwitch = useCallback((event) => {
        if(event.target.name === "dianonum") {
            setColorReceipt({
                backgroundColor: '#e9ecef',
                color: 'black'
            });
            setColorSpecimen({});
            props.props.history.push("/result");
        } else if(event.target.name === "specinum") {
            setColorSpecimen({
                backgroundColor: '#e9ecef',
                color: 'black'
            });
            setColorReceipt({});
            props.props.history.push("/result/specimennum");
        }
    }, [props.props]);

    //input 상태를 바꿈(name, date, today 체크박스)
    const handleNameChange = useCallback((event) => {
        setPatient_name(event.target.value);
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
    const handleSearch = useCallback( async (argPatient_name, argReceipt_datetime) => {
        sessionStorage.removeItem("receipt_id2");
        const response = await getReceiptData(argPatient_name, argReceipt_datetime);
        setReceiptData(response.data.receiptData);
        const response2 = await getDiagnosticData(argPatient_name, argReceipt_datetime);
        setSpecimenData(response2.data.diagnosticData);
    }, []);

    //처음 화면에 보여질 때, 기본값인 오늘 기준으로 데이터를 가져옴.
    //receipt_datetime이 바뀔 때마다 데이터를 가져옴.
    //진료 페이지에서 넘어온 receipt_id가 있다면, receipt_id로 데이터를 가져옴.
    useEffect(() => {
        const fetchAndSetReceiptData = async () => {
            setLoading(true);
            try {
                const response = await getReceiptData('', receipt_datetime);
                setReceiptData(response.data.receiptData);
                const response2 = await getDiagnosticData('', receipt_datetime);
                setSpecimenData(response2.data.diagnosticData);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        const fetchAndSetReceiptDataByReceiptId = async () => {
            setLoading(true);
            try {
                const response = await getReceiptDataByRecieptId(sessionStorage.getItem("receipt_id2"));
                setReceiptData(response.data.receiptData);
                const response2 = await getDiagnosticDataByReceiptId(sessionStorage.getItem("receipt_id2"));
                setSpecimenData(response2.data.diagnosticData);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        console.log(sessionStorage.getItem("receipt_id2"));
        if(sessionStorage.getItem("receipt_id2")) {
            fetchAndSetReceiptDataByReceiptId();
        } else {
            fetchAndSetReceiptData();
        }
    }, [receipt_datetime, props.saveResult, props.receipt_id2]);

    return (
        <div className={cx("result-container")}>
            <div className={cx("result-smallcontainer")}>
                <ResultNameBox>검사분야</ResultNameBox>
                <div className={cx("result-whitebox")}>진단검사</div>
            </div>
            <div className={cx("result-smallcontainer")}>
                <ResultNameBox>환자이름</ResultNameBox>
                <input type="text" className={cx("result-whitebox")} value={patient_name} onChange={handleNameChange} placeholder="이름을 검색하세요."/>
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
                <Button className={cx("result-button")} onClick={()=>handleSearch(patient_name, receipt_datetime)} ><FontAwesomeIcon icon={faSearch} className="mr-1"/>조회</Button>
                <div className="w-100 d-flex justify-content-end">
                <Button className={cx("result-button")} onClick={handleSwitch} name="dianonum" style={colorReceipt}>진단번호</Button>
                <Button className={cx("result-button", "ml-1")} onClick={handleSwitch} name="specinum" style={colorSpecimen}>검체번호</Button>
                </div>
            </div>
            <div className={cx("result-lefttable")}>
                <Switch>
                    <Route path={`${props.props.match.url}`} exact render={() => <DianosisNum receiptData={receiptData} handleResult={props.handleResult} index={props.ReceiptIndex} loading={loading} />}/>
                    <Route path={`${props.props.match.url}/specimennum`} exact render={() => <SpecimenNum specimenData={specimenData} handleResult={props.handleResult} index={props.SpecimenIndex} loading={loading} />}/>
                </Switch>
            </div>
        </div>
    );
}

export default ResultSearchContainer;