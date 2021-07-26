import Modal from "react-modal";

//신규 환자 생성 modal 스타일 설정
const customStyles = {
    content: {
        width: '750px',
        height: '700px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding:"0px",
        transform: 'translate(-50%, -50%)',
    },
};

const customBackStyles = {
    content: {
    },
}

Modal.setAppElement('body');
function GuidelineModal(props) {
    
    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            contentLabel="Notice Modal"
            style={customStyles}
            overlayClassName={customBackStyles}
        >
            <div className="p-2" style={{backgroundColor:"#91a7ff"}}><h4 className="text-white">검사의뢰지침</h4></div>
            <div className="d-flex mt-2">
                <div>
                    
                </div>
                <div className="ml-2 mb-2">
                    {props.notice === 1 ?
                    <div>환자가 자주 묻는 질문 및 답변</div>:
                    props.notice === 2 ?
                    <div>채혈용기 채혈순서</div>:
                    props.notice === 3 ?
                    <div>혈액배양 검체 채취</div>:
                    <div>채혈시 부작용</div>}
                </div>
            </div>
            <div style={{borderRadius:"4px", border:"1px solid black", height:"550px", padding:"10px", marginLeft:"10px", marginRight:"10px", overflowY:"auto"}}>
                {props.notice === 1 ?
                <pre style={{fontFamily:"sans-serif"}}>
                1) Q : 같은 피검사인데 왜 여러 용기에 뽑나요?<br/>
                &nbsp;&nbsp; A : 검사항목에 따라 용기에 들어가는 첨가제가 달라집니다.<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;적절한 첨가제가 포함된 용기에 충분한 양만큼 채혈해야 검사가 이루어집니다.<br/>
            <br/>
            2) Q : 채혈할 때(주사바늘이 들어갈 때) 어떤 날은 아프고 어떤 날은 안 아픈 이유는 무엇인가요?<br/>
            &nbsp;&nbsp;&nbsp;A : 채혈 시 통증을 느끼는 이유는 다양합니다. 우선 주사바늘의 사면이 눈에는<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;안보이지만 매끄럽게 처리되지 못한 경우가 있습니다.<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이런 경우 바늘이 근육과 혈관을 통과할 때 주변 조직을 더 상 하기 때문에 통증이 유발됩니다. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;그리고 날씨와 환자분의 컨디션에 따라서도 통증의 강도가 달라집니다. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;추운 날씨에는 조직이 체온을 유지하고자 수축하는 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;경향이 있기 때문에 그만큼 통증을 유발할 수 있습니다.
            <br/><br/>
            3) Q : 채혈하고 나서 목욕이나 수영을 해도 되나요?<br/>
            &nbsp;&nbsp;&nbsp;A : 채혈이 끝난 후 정상인들은 5분 안에 지혈이 되기 때문에 운동이나 목욕을 하셔도 됩니다.<br/>
            <br/>
            4) Q : 피를 너무 뽑아서 빈혈에 걸리지는 않나요?<br/>
            &nbsp;&nbsp;&nbsp;A : 그렇지 않습니다. 피는 매일 만들어지고 있습니다. 우리 몸에는 체중의 7~8%의 혈액이 있습니다.<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;보통성인의 경우, 최대한 많이 채혈해도 몸전체 혈액의 0.4% 미만에 불과합니다.<br/>
            <br/>
            5) Q : 채혈 전에는 반드시 공복 해야 하나요?<br/>
            &nbsp;&nbsp;&nbsp;A : 반드시 그렇지는 않습니다. 그러나 식이에 영향을 받는 중성지방, 혈당검사등 많은 검사에 있어서<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 공복이 필요합니다. 특히 중성지방(Triglyceride) 검사는 적어도 8시간,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 길게는 14시간 정도 금식 금식이 필요하기 때문에 정확한 검사 결과를 위해서는 담당 의사나<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간호사에게 금식여부와 시간 을 확인 하시는 것이 좋습니다.
            <br/><br/>
            6) Q : 12시간 공복 하라고 하는데 물도 안 됩니까?<br/>
            &nbsp;&nbsp;&nbsp;A : 채혈검사에 필요한 12시간 공복은 물도 가능하고,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;당뇨약이나 약물검사를 제외한 약 복용 도 가능합니다.<br/>
            <br/>
            7) Q : 당뇨검사를 하는데 평상시에 먹던 당뇨약이나 인슐린 주사는 어떻게 하나요?<br/>
            &nbsp;&nbsp;&nbsp;A : 공복상태의 채혈이 끝나면 평상시에 드시던 당뇨약이나 인슐린 주사를 맞고 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20분에서 30분 후에 식사를 하시고 식사 시작부터 2시간 후에 식후 2시간 검사를 하시면 됩니다.<br/>
            <br/>
            8) Q : 지금 막 도착 했는데 바로 채혈해도 되나요?<br/>
            &nbsp;&nbsp;&nbsp;A : 보통 강도로 운동을 하면 혈당이 증가하고 인슐린 분비가 촉진 됩니다.<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이외 근육 효소들은 5분 정도만 걸어도 증가하기 때문에 급하게 오셨다면<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5분 정도 안정을 취하신 후 채혈하는 것이 좋습니다.<br/>
            <br/>
            9) Q : 객담검사를 할 때는 가래를 어떻게 모아야 하나요?<br/>
            &nbsp;&nbsp;&nbsp;A : 이른 아침 식사 전에 양치 후 깊은 기침을 하여 객담을 한번만 받으시면 됩니다. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;침이 섞이지 않게 하여야 하며, 용기에 담아 냉장보관을 하여 신속하게 검사실로 보내야 합니다.<br/>
            <br/>
            10) Q : 24시간 소변 검사용 소변은 어떻게 모아야 하나요?<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;A : 오전 7부터 소변을 모으고자 한다면, 오전 7시에 소변을 보고 난 후부터 모으기<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 시작하여 다음 날 오전 7시의 마지막 소변까지 모으셔야 합니다.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 24시간 동안 모이는 소변량이 중요하므로 한 번도 빠짐없이 받으셔야 합니다. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;방부제는 소변백에 소변을 1~2회 받으신 후 넣어 주십시오. 
            <br/>
                </pre>:
                props.notice === 2 ?
                <img src="/bloodbottle.PNG" alt="" width="" height="" className="w-100"/>:
                props.notice === 3 ?
                <img src="/specimen2.JPG" alt="" width="" height="" className="w-100"/>:
                <pre style={{fontFamily:"sans-serif"}}>
            1) 잘못된 채혈로 인한 검사결과 영향<br/>
<br/>
(1) 혈소판 파괴<br/>
&nbsp;&nbsp;&nbsp;장시간 tourniquet을 묶고 있을 경우 혈액정체로 세포의 수분균형에 영향을 미쳐<br/> &nbsp;&nbsp;적혈구와 혈소판이 파괴 된다(1분 이상 tourniquet으로 압박하지 않는다)<br/>
<br/>
(2) 혈액량<br/>
&nbsp;&nbsp;&nbsp;혈액량이 적정량보다 적거나 많을 경우 Dilution, Clot이 될 수 있다.<br/>
<br/>
(3) 항응고제 혼입<br/>
&nbsp;&nbsp;&nbsp;SST tube 보다 항응고제 tube를 먼저 채혈한 경우 항응고제 혼입으로 혈청검사에 영향을 미칠 수 있다.<br/>
<br/>
(4) IV Fluid오염<br/>
&nbsp;&nbsp;&nbsp;IV Fluid오염(IV 사이트 위에서 채혈하지 않는다)<br/>
<br/>
(5) 너무 세게 Mixing<br/>
&nbsp;&nbsp;&nbsp;너무 세게 Mixing(적혈구 파괴로 용혈이 일어날 수 있다)<br/>
<br/>
(6) 환자가 바뀌어 채혈이 이루어진 경우<br/>
<br/><br/>
2) 환자의 채혈 거부<br/>
<br/>
(1) 환자의 인지능력 부족으로 인한 거부<br/>
&nbsp;&nbsp;&nbsp;환자의 나이가 너무 어리거나 많은 경우, 채혈과정을 이해하지 못하므로 채혈을 거부하거나<br/> &nbsp;&nbsp;버둥 거리게 되어 채혈이 용이하지 않을 수가 있다.<br/> &nbsp;&nbsp;이런 경우 동료 채혈원 또는 부모, 친척, 간병인등 의 도움을 청한다. <br/>&nbsp;&nbsp;&nbsp;정신적 이상자 이거나 약물중독자인 경우, 환자들이 저항할 수<br/> &nbsp;&nbsp;있으므로 환자 를 안심시키고 확실한 협조를 구한다.<br/>
<br/>
(2) 정상인데 채혈을 거부하는 경우<br/>
&nbsp;&nbsp;&nbsp;환자에게 채혈이 안전함을 설득한다. 특히 주치의가 환자 자신의 질병을 정확하게 진단하고 <br/>&nbsp;&nbsp;&nbsp;처방을 내리기 위해 혈액검사가 꼭 필요하다는 사실을 주지시킨다.<br/> &nbsp;&nbsp;절대 물리적인 힘이나 협박을 해서는 안 된다. 그래도 환자가 거절한다면 진료과에 연락 후<br/>&nbsp;&nbsp; 메모를 남기고, 반드시 담당 간호사에게 이 사실을 알린다.<br/>
<br/>
            </pre>}
            </div>
            <div className="d-flex justify-content-end mt-2 mr-3">
                <button className="btn btn-sm text-white" style={{backgroundColor:"#74c0fc"}} onClick={props.closeModal}>닫기</button>
            </div>
        </Modal>
    );
}

export default GuidelineModal;