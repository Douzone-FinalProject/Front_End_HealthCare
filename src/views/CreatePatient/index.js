import Modal from "react-modal";
import style from "./patient.module.css"
import classnames from "classnames/bind";
import { useState, useCallback } from "react";
import InputText from "./InputText";
import InputSmText from "./InputSmText";
import DaumPost from "./DaumPost";
import Button from "views/common/Button";

const cx = classnames.bind(style);

//신규 환자 생성 modal 스타일 설정
const customStyles = {
    content: {
        width: '750px',
        height: '430px',
        top: '50%',
        left: '44%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('body');
function CreatePatient(props) {
    //주소찾기 modal을 보여주기 위한 상태(기본값 false, true면 보여줌)
    const [isModal, setModal] = useState(false);
    //환자 정보 상태
    const [patient, setPatient] = useState({
        name: '',
        ssn1: '',
        ssn2: '',
        sex: '',
        phone1: 'zero',
        phone2: '',
        phone3: '',
        zipcode: '',
        address: '',
        detail_address: '',
        blood_type: 'select3',
        max_bp: '',
        min_bp: '',
        pulse: '',
        height: '',
        weight: '',
        guardian_name: '',
        guardian_phone1: 'select1',
        guardian_phone2: '',
        guardian_phone3: '',
        guardian_relationship: 'select2'
    });

    //환자 정보 input 상태를 변경
    const handleChange = useCallback((event) => {
        setPatient(prevPatient => ({
            ...prevPatient,
            [event.target.name]: event.target.value
        }))
    }, []);

    //주소찾기 modal을 열고 닫기
    const openAdModal = useCallback(() => {
        setModal(true);
    }, []);
    const closeAdModal = useCallback(() => {
        setModal(false);
    }, []);

    //주소 정보를 세팅하고 주소찾기 modal 닫기
    const handleComplete = useCallback((data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setPatient(prevPatient => ({
            ...prevPatient,
            address: fullAddress,
            zipcode: data.zonecode
        }))
        closeAdModal();
    }, [closeAdModal]);

    //저장 버튼 클릭 시, 필수 정보 null인지 확인
    //필수 정보가 null이 아니면 저장 후 modal 닫기
    const handleSave = useCallback((argPatient, argProps) => {
        if(argPatient.name && argPatient.ssn1 && argPatient.ssn2 && argPatient.sex &&
            argPatient.phone2 && argPatient.phone3 && argPatient.address && argPatient.detail_address &&
            argPatient.blood_type !== 'select3') {
            console.log(argPatient);
            setPatient({
                name: '',
                ssn1: '',
                ssn2: '',
                sex: '',
                phone1: 'zero',
                phone2: '',
                phone3: '',
                zipcode: '',
                address: '',
                detail_address: '',
                blood_type: 'select3',
                max_bp: '',
                min_bp: '',
                pulse: '',
                height: '',
                weight: '',
                guardian_name: '',
                guardian_phone1: 'select1',
                guardian_phone2: '',
                guardian_phone3: '',
                guardian_relationship: 'select2'
            });
            alert('신규 환자가 등록되었습니다.');
            argProps.closeModal();
        } else {
            alert("필수 사항을 입력해주세요.");
        }
    }, []);

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            contentLabel="Create Patient Modal"
            style={customStyles}
        >
            <h5 className="mb-1">신규 환자 생성</h5>
            <div className="row">
                <div className="col-7">
                    <InputText name={'name'} val={patient.name} handleChange={handleChange}>이름</InputText>
                    <div className="row mt-1">
                        <div className="col-4 text-right">주민등록번호</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-6 mr-n1"><input type="text" className="w-100" name="ssn1" value={patient.ssn1} onChange={handleChange}/></div>
                                -
                                <div className="col-6 ml-n1"><input type="text" className="w-100" name="ssn2" value={patient.ssn2} onChange={handleChange}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1 mb-2">
                        <div className="col-4 text-right">성별</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-3">
                                <input type="radio" name="sex" value="male" onChange={handleChange} checked={patient.sex === "male"}/>
                                <label className="ml-1">
                                    남
                                </label>
                                </div>
                                <div className="col-3">
                                <input type="radio" name="sex" value="female" onChange={handleChange} checked={patient.sex === "female"}/>
                                <label className="ml-1">
                                    여
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 text-right">휴대전화</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-4 mr-n1">
                                <select name="phone1" className="w-100" value={patient.phone1} onChange={handleChange}>
                                    <option value="zero">010</option>
                                    <option value="one">011</option>
                                    <option value="six">016</option>
                                    <option value="seven">017</option>
                                    <option value="nine">019</option>
                                </select>
                                </div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100" name="phone2" value={patient.phone2} onChange={handleChange}/></div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100" name="phone3" value={patient.phone3} onChange={handleChange}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 d-flex justify-content-end">
                            <Button className={cx("patient-button")} onClick={openAdModal}>주소찾기</Button>
                        </div>
                        <DaumPost isModal={isModal} closeAdModal={closeAdModal} handleComplete={handleComplete}/>
                        <div className="col-8">
                            <input type="text" className="w-100" name="address" value={patient.address} onChange={handleChange} />
                        </div>
                    </div>
                    <InputText name={'detail_address'} val={patient.detail_address} handleChange={handleChange}>상세주소</InputText>
                </div>
                <div className={cx("col-5", "patient-rightcontainer", "pt-1")}>
                    <div className="row mt-1">
                        <div className="col-4 text-right">혈액형</div>
                        <div className="col-8">
                            <select name="blood_type" className="w-50" value={patient.blood_type} onChange={handleChange}>
                                <option value="select3" disabled>선택</option>
                                <option value="bloodA">A</option>
                                <option value="bloodB">B</option>
                                <option value="bloodAB">AB</option>
                                <option value="bloodO">O</option>
                                <option value="bloodmA">Rh-A</option>
                                <option value="bloodmB">Rh-B</option>
                                <option value="bloodmAB">Rh-AB</option>
                                <option value="bloodmO">Rh-O</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 text-right">혈압</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-6 mr-n1"><input type="text" className="w-100" name="min_bp" value={patient.min_bp} onChange={handleChange}/></div>
                                /
                                <div className="col-6 ml-n1"><input type="text" className="w-100" name="max_bp" value={patient.max_bp} onChange={handleChange}/></div>
                            </div>
                        </div>
                    </div>
                    <InputSmText unit={'회/분'} name={'pulse'} val={patient.pulse} handleChange={handleChange}>맥박</InputSmText>
                    <InputSmText unit={'cm'} name={'height'} val={patient.height} handleChange={handleChange}>신장</InputSmText>
                    <InputSmText unit={'kg'} name={'weight'} val={patient.weight} handleChange={handleChange}>체중</InputSmText>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-7">
                    <InputText name={'guardian_name'} val={patient.guardian_name} handleChange={handleChange}>보호자 이름</InputText>
                    <div className="row mt-1">
                        <div className="col-4 text-right">보호자 번호</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-4 mr-n1">
                                <select name="guardian_phone1" className="w-100" value={patient.guardian_phone1} onChange={handleChange}>
                                    <option value="select1" disabled>선택</option>
                                    <option value="zero">010</option>
                                    <option value="one">011</option>
                                    <option value="six">016</option>
                                    <option value="seven">017</option>
                                    <option value="nine">019</option>
                                </select>
                                </div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100" name="guardian_phone2" value={patient.guardian_phone2} onChange={handleChange}/></div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100" name="guardian_phone3" value={patient.guardian_phone3} onChange={handleChange}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 text-right">가족관계</div>
                        <div className="col-8">
                            <select name="guardian_relationship" className="w-25" value={patient.guardian_relationship} onChange={handleChange}>
                                <option value="select2" disabled>선택</option>
                                <option value="father">부</option>
                                <option value="mother">모</option>
                                <option value="child">자녀</option>
                                <option value="spouse">배우자</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-5 d-flex align-items-end justify-content-end">
                    <Button className={cx("patient-button")} onClick={() => handleSave(patient, props)}>저장</Button>
                    <Button className={cx("patient-button", "ml-2")} onClick={props.closeModal}>닫기</Button>
                </div>
            </div>
        </Modal>
    );
}

export default CreatePatient;