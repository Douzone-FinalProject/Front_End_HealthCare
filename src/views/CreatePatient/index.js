import Modal from "react-modal";
import style from "./patient.module.css"
import classnames from "classnames/bind";
import { useState, useCallback } from "react";
import InputText from "./InputText";
import InputSmText from "./InputSmText";
import DaumPost from "./DaumPost";
import Button from "views/common/Button";
import Swal from 'sweetalert2';

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
        patient_name: '',
        patient_ssn: '',
        patient_sex: '',
        patient_phone: '',
        patient_zipcode: '',
        patient_address: '',
        patient_detail_address: '',
        patient_blood_type: '',
        patient_max_bp: '',
        patient_min_bp: '',
        patient_pulse: '',
        patient_height: '',
        patient_weight: '',
        patient_guardian_name: '',
        patient_guardian_phone: '',
        patient_guardian_relationship: ''
    });
    const [ssn, setSsn] = useState({
        ssn1: '',
        ssn2: ''
    });
    const [phone, setPhone] = useState({
        phone1: '010',
        phone2: '',
        phone3: '',
        guardian_phone1: 'select1',
        guardian_phone2: '',
        guardian_phone3: ''
    });

    //환자 정보 input 상태를 변경
    const handleChange = useCallback((event) => {
        setPatient(prevPatient => ({
            ...prevPatient,
            [event.target.name]: event.target.value
        }))
    }, []);
    const handleSsnChange = (event) => {
        setSsn({
            ...ssn,
            [event.target.name]: event.target.value,
        })
        if(event.target.name === 'ssn1') {
            setPatient({
                ...patient,
                patient_ssn: event.target.value + '-' + ssn.ssn2
            })
        } else {
            setPatient({
                ...patient,
                patient_ssn: ssn.ssn1 + '-' + event.target.value
            })
        }
    };
    const handlePhoneChange = (event) => {
        setPhone({
            ...phone,
            [event.target.name]: event.target.value,
        })
        if(event.target.name === 'phone1') {
            setPatient({
                ...patient,
                patient_phone: event.target.value + phone.phone2 + phone.phone3
            })
        } else if(event.target.name === 'phone2') {
            setPatient({
                ...patient,
                patient_phone: phone.phone1 + event.target.value + phone.phone3
            })
        } else if(event.target.name === 'phone3') {
            setPatient({
                ...patient,
                patient_phone: phone.phone1 + phone.phone2 + event.target.value
            })
        } else if(event.target.name === 'guardian_phone1') {
            setPatient({
                ...patient,
                patient_guardian_phone: event.target.value + phone.guardian_phone2 + phone.guardian_phone3
            })
        } else if(event.target.name === 'guardian_phone2') {
            setPatient({
                ...patient,
                patient_guardian_phone: phone.guardian_phone1 + event.target.value + phone.guardian_phone3
            })
        } else {
            setPatient({
                ...patient,
                patient_guardian_phone: phone.guardian_phone1 + phone.guardian_phone2 + event.target.value
            })
        }
    };

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
            patient_address: fullAddress,
            patient_zipcode: data.zonecode
        }))
        closeAdModal();
    }, [closeAdModal]);

    //저장 버튼 클릭 시, 필수 정보 null인지 확인
    //필수 정보가 null이 아니면 저장 후 modal 닫기
    const handleSave = useCallback((argPatient, argProps) => {
        if(argPatient.patient_name && ssn.ssn1 && ssn.ssn2 && argPatient.patient_sex &&
            phone.phone2 && phone.phone3 && argPatient.patient_address && argPatient.patient_detail_address) {
            props.handleAdd(argPatient);
            setPatient({
                patient_name: '',
                patient_ssn: '',
                patient_sex: '',
                patient_phone: '',
                patient_zipcode: '',
                patient_address: '',
                patient_detail_address: '',
                patient_blood_type: '',
                patient_max_bp: '',
                patient_min_bp: '',
                patient_pulse: '',
                patient_height: '',
                patient_weight: '',
                patient_guardian_name: '',
                patient_guardian_phone: '',
                patient_guardian_relationship: ''
            });
            setSsn({
                ssn1: '',
                ssn2: ''
            });
            setPhone({
                phone1: '010',
                phone2: '',
                phone3: '',
                guardian_phone1: 'select1',
                guardian_phone2: '',
                guardian_phone3: ''
            });
            Swal.fire({
                icon: 'success',
                title: '신규 환자가 등록되었습니다.',
                showConfirmButton: false,
                timer: 1500
            })
            argProps.closeModal();
        } else {
            Swal.fire({
                icon: 'error',
                title: '필수 사항을 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }, [ssn, phone, props]);

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
                    <InputText name={'patient_name'} val={patient.patient_name} handleChange={handleChange}>{'* '}이름</InputText>
                    <div className="row mt-1">
                        <div className="col-4 text-right">{'* '}주민등록번호</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-6 mr-n1"><input type="text" className="w-100" name="ssn1" value={ssn.ssn1} onChange={handleSsnChange}/></div>
                                -
                                <div className="col-6 ml-n1"><input type="text" className="w-100" name="ssn2" value={ssn.ssn2} onChange={handleSsnChange}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1 mb-2">
                        <div className="col-4 text-right">{'* '}성별</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-3">
                                <input type="radio" name="patient_sex" value="M" onChange={handleChange} checked={patient.patient_sex === "M"}/>
                                <label className="ml-1">
                                    남
                                </label>
                                </div>
                                <div className="col-3">
                                <input type="radio" name="patient_sex" value="F" onChange={handleChange} checked={patient.patient_sex === "F"}/>
                                <label className="ml-1">
                                    여
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 text-right">{'* '}휴대전화</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-4 mr-n1">
                                <select name="phone1" className="w-100" value={phone.phone1} onChange={handlePhoneChange}>
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="019">019</option>
                                </select>
                                </div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100" name="phone2" value={phone.phone2} onChange={handlePhoneChange}/></div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100" name="phone3" value={phone.phone3} onChange={handlePhoneChange}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 d-flex justify-content-end">
                        {'* '}<Button className={cx("patient-button", "ml-2")} onClick={openAdModal}>주소찾기</Button>
                        </div>
                        <DaumPost isModal={isModal} closeAdModal={closeAdModal} handleComplete={handleComplete}/>
                        <div className="col-8">
                            <input type="text" className="w-100" name="patient_address" value={patient.patient_address} onChange={handleChange} />
                        </div>
                    </div>
                    <InputText name={'patient_detail_address'} val={patient.patient_detail_address} handleChange={handleChange}>{'* '}상세주소</InputText>
                </div>
                <div className={cx("col-5", "patient-rightcontainer", "pt-1")}>
                    <div className="row mt-1">
                        <div className="col-4 text-right">혈액형</div>
                        <div className="col-8">
                            <select name="patient_blood_type" className="w-50" value={patient.patient_blood_type} onChange={handleChange}>
                                <option value="" disabled>선택</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                                <option value="Rh-A">Rh-A</option>
                                <option value="Rh-B">Rh-B</option>
                                <option value="Rh-AB">Rh-AB</option>
                                <option value="Rh-O">Rh-O</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 text-right">혈압</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-6 mr-n1"><input type="text" className="w-100" name="patient_min_bp" value={patient.patient_min_bp} onChange={handleChange}/></div>
                                /
                                <div className="col-6 ml-n1"><input type="text" className="w-100" name="patient_max_bp" value={patient.patient_max_bp} onChange={handleChange}/></div>
                            </div>
                        </div>
                    </div>
                    <InputSmText unit={'회/분'} name={'patient_pulse'} val={patient.patient_pulse} handleChange={handleChange}>맥박</InputSmText>
                    <InputSmText unit={'cm'} name={'patient_height'} val={patient.patient_height} handleChange={handleChange}>신장</InputSmText>
                    <InputSmText unit={'kg'} name={'patient_weight'} val={patient.patient_weight} handleChange={handleChange}>체중</InputSmText>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-7">
                    <InputText name={'patient_guardian_name'} val={patient.patient_guardian_name} handleChange={handleChange}>보호자 이름</InputText>
                    <div className="row mt-1">
                        <div className="col-4 text-right">보호자 번호</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-4 mr-n1">
                                <select name="guardian_phone1" className="w-100" value={phone.guardian_phone1} onChange={handlePhoneChange}>
                                    <option value="select1" disabled>선택</option>
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="019">019</option>
                                </select>
                                </div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100" name="guardian_phone2" value={phone.guardian_phone2} onChange={handlePhoneChange}/></div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100" name="guardian_phone3" value={phone.guardian_phone3} onChange={handlePhoneChange}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 text-right">가족관계</div>
                        <div className="col-8">
                            <select name="patient_guardian_relationship" className="w-25" value={patient.patient_guardian_relationship} onChange={handleChange}>
                                <option value="" disabled>선택</option>
                                <option value="부">부</option>
                                <option value="모">모</option>
                                <option value="자녀">자녀</option>
                                <option value="배우자">배우자</option>
                                <option value="기타">기타</option>
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