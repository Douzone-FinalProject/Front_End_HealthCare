import Modal from "react-modal";
import style from "./patient.module.css"
import classnames from "classnames/bind";
import { useState } from "react";
import ResultButton from "views/Result/ResultButton";
import InputText from "./InputText";
import InputSmText from "./InputSmText";
import DaumPost from "./DaumPost";

const cx = classnames.bind(style);
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
    const [isModal, setModal] = useState(false);
    const [patient, setPatient] = useState({
        name: '',
        address: '',
        detail_address: '',
        blood_type: 'select3',
        pulse: '',
        height: '',
        weight: '',
        guardian_name: '',
        guardian_phone: 'select1',
        guardian_relationship: 'select2'
    });

    const handleChange = (event) => {
        setPatient({
            ...patient,
            [event.target.name]: event.target.value
        });
    };

    function openAdModal() {
        setModal(true);
    }

    function closeAdModal() {
        setModal(false);
    }

    const handleComplete = (data) => {
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
        setPatient({
            ...patient,
            address: fullAddress
        });
        closeAdModal();
    }

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
                                <div className="col-6 mr-n1"><input type="text" className="w-100"/></div>
                                -
                                <div className="col-6 ml-n1"><input type="text" className="w-100"/></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1 mb-2">
                        <div className="col-4 text-right">성별</div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-3">
                                <input type="radio" name="usex" value="male"/>
                                <label className="ml-1">
                                    남
                                </label>
                                </div>
                                <div className="col-3">
                                <input type="radio" name="usex" value="female"/>
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
                                <select name="firstphone" className="w-100">
                                    <option value="zero">010</option>
                                    <option value="one">011</option>
                                    <option value="six">016</option>
                                    <option value="seven">017</option>
                                    <option value="nine">019</option>
                                </select>
                                </div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100"/></div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100"/></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 d-flex justify-content-end">
                            <ResultButton onClick={openAdModal}>주소찾기</ResultButton>
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
                                <div className="col-6 mr-n1"><input type="text" className="w-100"/></div>
                                /
                                <div className="col-6 ml-n1"><input type="text" className="w-100"/></div>
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
                                <select name="guardian_phone" className="w-100" value={patient.guardian_phone} onChange={handleChange}>
                                    <option value="select1" disabled>선택</option>
                                    <option value="zero">010</option>
                                    <option value="one">011</option>
                                    <option value="six">016</option>
                                    <option value="seven">017</option>
                                    <option value="nine">019</option>
                                </select>
                                </div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100"/></div>
                                -
                                <div className="col-4 ml-n1"><input type="text" className="w-100"/></div>
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
                    <ResultButton>저장</ResultButton>
                    <ResultButton onClick={props.closeModal} className="ml-2">닫기</ResultButton>
                </div>
            </div>
        </Modal>
    );
}

export default CreatePatient;