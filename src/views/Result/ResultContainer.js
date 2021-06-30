import style from "./result.module.css"
import classnames from "classnames/bind";
import ResultTopTable from "./ResultTopTable";
import ResultTable from "./ResultTable";
import { useState, useEffect, useCallback } from 'react';
import Button from "views/common/Button";
import { getSpecimenData } from "./data";
import { Link } from "react-router-dom";
import ImgModal from "./ImgModal";

const cx = classnames.bind(style);

function ResultContainer(props) {
    //우측 상단 테이블의 검체별로 보여줄 데이터 상태
    const [specimen, setSpecimen] = useState({});
    //결과 테이블에서 보여주거나 수정할 수 있는 결과 상태
    const [result, setResult] = useState({});
    //결과 테이블에서 결과 input을 사용하기 위한 flag 상태
    const [flag, setFlag] = useState({});

    //결과 테이블에서 행을 클릭하면 발생
    //검체별로 데이터를 우측 상단 테이블에 보여줌
    const handleSpecimen = useCallback((data, rowIndex) => {
        const specimenData = getSpecimenData(data.diagnostic_specimen_number);
        return {
          onClick: (event) => {
            setSpecimen(specimenData);
          }
        }
    }, []);

    //저장 버튼 클릭 시 실행
    const handleSave = useCallback((event) => {
        for(let i in result) {
            console.log(result[i]);
        }
    }, [result]);

    //왼쪽 테이블에서 오는 데이터가 달라졌을 때 실행
    //결과 데이터 상태를 초기화
    useEffect(() => {
        setResult({});
        setFlag({});
    }, [props.result]);
    
    //antd 결과 테이블에서 사용할 컬럼 설정
    const columns = [
        {
            title: '검사분야',
            dataIndex: "field",
        },
        {
            title: '검사항목명',
            dataIndex: "prescription_name",
        },
        {
            title: '결과',
            dataIndex: "diagnostic_result",
            render(text, record) {
                const handleFirstChange = (event) => {
                    setResult({
                        ...result,
                        [record.key]: event.target.value
                    })
                    setFlag({
                        ...flag,
                        [record.key]: true
                    })
                };
                const handleChange = (event) => {
                    setResult({
                        ...result,
                        [record.key]: event.target.value
                    })
                };
                return {
                    props: {
                      style: { background: "#a5d8ff", padding: '0px' }
                    },
                    children: 
                    <div>
                    {flag[record.key] ?
                    <input type="text"
                            className="w-100"
                            style={{backgroundColor: '#a5d8ff', border: 'none', height: '40px'}}
                            value={result[record.key]}
                            onChange={handleChange} />
                    :
                    <input type="text"
                            className="w-100"
                            style={{backgroundColor: '#a5d8ff', border: 'none', height: '40px'}}
                            value={' '+text}
                            onChange={handleFirstChange} />
                    }
                    </div>
                };
            }
        },
        {
            title: '이전결과',
            dataIndex: "diagnostic_previous_result",
        },
        {
            title: '이전결과일',
            dataIndex: "diagnostic_previous_date",
        },
        {
            title: '참고치',
            dataIndex: "prescription_reference_value",
            render(text, record) {
                return {
                    props: {
                      style: { background: "#ffec99" }
                    },
                    children: <div>{text}</div>
                };
            }
        },
        {
            title: '단위',
            dataIndex: "prescription_unit",
        }
    ];

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() { setIsOpen(true); }
    function closeModal() { setIsOpen(false); }

    return (
        <div className={cx("result-secondcontainer")}>
            <div className={cx("result-height")}>
                <div className="d-flex justify-content-center">
                    <ResultTopTable patientData={props.patientData} specimenData={specimen} />
                </div>
                <div className={cx("d-flex justify-content-center", "result-scroll")}>
                    <ResultTable result={props.result} handleSpecimen={handleSpecimen} columns={columns}/>
                </div>
            </div>
            <div>
                <div className="d-flex justify-content-center">
                    {props.result.length ?
                    <div className={cx("result-imgbox")} onClick={openModal}>
                        <img src="http://localhost:3000/mri1.jpg" alt="" height="100%"/>
                        <img src="http://localhost:3000/mri1.jpg" alt="" height="100%"/>
                        <img src="http://localhost:3000/mri2.png" alt="" height="100%"/>
                        <img src="http://localhost:3000/mri2.png" alt="" height="100%"/>
                    </div>
                    :<div className={cx("result-imgbox")}></div>
                    }
                </div>
                <ImgModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
            </div>
            <div>
                <div className="d-flex justify-content-center">
                    <div className={cx("result-buttonbox", "d-flex justify-content-end")}>
                        <Button className={cx("result-button")} onClick={handleSave}>저장</Button>
                        <Link to="/diagnosis"><Button className={cx("result-button", "ml-2")}>뒤로</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultContainer;