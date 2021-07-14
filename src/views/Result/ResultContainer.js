import style from "./result.module.css"
import classnames from "classnames/bind";
import ResultTopTable from "./ResultTopTable";
import ResultInputTable from "./ResultInputTable";
import { useState, useEffect, useCallback } from 'react';
import Button from "views/common/Button";
import { Link } from "react-router-dom";
import ImgModal from "./ImgModal";
import ResultTable from "./ResultTable";
import { getSpecimenData, updateResultDataBySpecimen, updateResultDataByReceipt } from "apis/result";
import Swal from 'sweetalert2';

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
        return {
          onClick: async (event) => {
            console.log(data.diagnostic_specimen_number);
            const response = await getSpecimenData(data.diagnostic_specimen_number);
            const specimenData = response.data.specimenData;
            console.log(specimenData);
            setSpecimen(specimenData||0);
          }
        }
    }, []);

    //저장 버튼 클릭 시 실행
    const handleSave = useCallback(async (event) => {
        Swal.fire({
            title: '저장하시겠습니까?',
            text: "한 번 더 확인해주세요. 저장하면 조회만 가능합니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '저장하기',
            cancelButtonText: '취소하기'
        }).then( async (event) => {
            if (event.isConfirmed) {
                if(props.flag.specimen) {
                    let resultInfo = {};
                    let resultArray = [];
                    for(let rst in result) {
                        resultArray.push({diagnostic_result: result[rst], diagnostic_results_id: rst});
                    }
                    resultInfo.result = resultArray;
                    await updateResultDataBySpecimen(resultInfo);
                } else {
                    let resultInfo = {};
                    let resultArray = [];
                    for(let rst in result) {
                        resultArray.push({diagnostic_result: result[rst], diagnostic_results_id: rst});
                    }
                    resultInfo.result = resultArray;
                    await updateResultDataByReceipt(resultInfo);
                }
                Swal.fire({
                    icon: 'success',
                    title: '저장되었습니다',
                    showConfirmButton: false,
                    timer: 1000
                });
                await props.setSaveResult(!props.saveResult);
                await props.setResultState('ⓞ');
            }
        });
        console.log(props.saveResult)
        props.props.history.push("/result");
    }, [result, props]);

    //왼쪽 테이블에서 오는 데이터가 달라졌을 때 실행
    //결과 데이터 상태를 초기화
    useEffect(() => {
        setResult({});
        setFlag({});
    }, [props.result]);
    
    //antd 결과 테이블에서 사용할 컬럼 설정
    const columns = [
        {
            title: '검사항목명',
            dataIndex: "prescription_name",
            width: '20%',
        },
        {
            title: '결과',
            dataIndex: "diagnostic_result",
            render(text, record) {
                const handleFirstChange = (event) => {
                    setResult({
                        ...result,
                        [record.diagnostic_results_id]: event.target.value
                    })
                    setFlag({
                        ...flag,
                        [record.diagnostic_results_id]: true
                    })
                };
                const handleChange = (event) => {
                    setResult({
                        ...result,
                        [record.diagnostic_results_id]: event.target.value
                    })
                };
                return {
                    props: {
                      style: { background: "#a5d8ff", padding: '0px' }
                    },
                    children: 
                    <div>
                    {flag[record.diagnostic_results_id] ?
                    <input type="text"
                            className="w-100"
                            style={{backgroundColor: '#a5d8ff', border: 'none', height: '40px'}}
                            value={result[record.diagnostic_results_id]}
                            onChange={handleChange} />
                    :
                    <input type="text"
                            className="w-100"
                            style={{backgroundColor: '#a5d8ff', border: 'none', height: '40px'}}
                            value={""}
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

    const columns2 = [
        {
            title: '검사항목명',
            dataIndex: "prescription_name",
            width: '20%',
        },
        {
            title: '결과',
            dataIndex: "diagnostic_result",
            render(text, record) {
                return {
                    children: 
                    <div>
                    {flag[record.diagnostic_results_id] ?
                    <div>{result[record.diagnostic_results_id]}</div>
                    :
                    <div>{text}</div>
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

    const [imgIndex, setImgIndex] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(index) {
        setIsOpen(true);
        setImgIndex(index);
    }
    function closeModal() { setIsOpen(false); }
    return (
        <div className={cx("result-secondcontainer")}>
            <div className={cx("result-height")}>
                <div className="d-flex justify-content-center">
                    <ResultTopTable patientData={props.patientData} specimenData={specimen} />
                </div>
                <div className={cx("d-flex justify-content-center", "result-scroll")}>
                    {props.resultState === 'ⓧ'? 
                        <ResultInputTable result={props.result} handleSpecimen={handleSpecimen} columns={columns}/>
                        :
                        <ResultTable result={props.result} handleSpecimen={handleSpecimen} columns={columns2}/>
                    }
                </div>
            </div>
            <div>
                <div className="d-flex justify-content-center">
                    
                    <div className={cx("result-imgbox")}>
                    {props.imgArray.map((arr, index) => {
                        return (
                            <img key={arr.diagnostic_img_id} src={arr.diagnostic_img} alt="" height="100%" onClick={() => openModal(index)} />
                        )
                    })
                    }
                    </div>
                </div>
                <ImgModal modalIsOpen={modalIsOpen} closeModal={closeModal} imgArray={props.imgArray} imgIndex={imgIndex} />
            </div>
            <div>
                <div className="d-flex justify-content-center">
                    <div className={cx("result-buttonbox", "d-flex justify-content-end")}>
                        {props.resultState === 'ⓧ'? 
                            <Button className={cx("result-button")} onClick={handleSave}>저장</Button>
                            :
                            <></>
                        }
                        <Link to="/diagnosis"><Button className={cx("result-button", "ml-2")}>뒤로</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultContainer;