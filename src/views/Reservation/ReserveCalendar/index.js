import React from 'react';
import moment from './src/moment-range';
import Dayz from './src/dayz';
import { DateTime } from 'react-form-elements';
import ReserveUpdateForm from '../ReserveUpdateForm';
require('./demo.scss');

/**
 * 예약은 30분 단위로만 할 수 있음 
 * 
 */
const style = {
    backgroundColor: 'white',
    borderRadius: '7px'
};

class ReserveCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.onEventClick = this.onEventClick.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
        this.onEventResize = this.onEventResize.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
         // 기준 날짜 - 날짜 선택해서 동적으로 바뀔 수 있도록 함 
        const date = new Date();
        this.state = {
            isModal: false,
            date,
            display: 'week',
            // 디비에서 가져온 예약 리스트도 상태로 가지고 있음 
            events: new Dayz.EventsCollection(this.props.events),
            reservation_id: undefined // 예약 내역을 선택해야(이벤트 발생) 상태 바뀌는거임 
        };
    }

    changeDisplay(ev) {
        this.setState({ display: ev.target.value });
    }

    // 시간대별로 나올 수 있도록 
    onEventResize(ev, event) {
        // const start = event.start.format('hh:mma');
        // const end   = event.end.format('hh:mma');
        // event.set({ content: `${start} - ${end} (resizable)` });
    }

    /* 예약 수정, 삭제 할 수 있는 모달 창 뜨게 하기 */
    onEventClick(ev, event) {
        this.setState({ isModal: true});
        //console.log('reservation_id: ', ev); // 자식에게 넘겨받은 파라미터 -> reservation_id 를 넘겨받아야 함 !!!! 
        this.setState({reservation_id: ev});   // 이것을 모달창에 넘겨줘야 함 
    }

    /* 자식인 모달창으로 보낼 함수 , 모달창에서 수정이 일어나면 여기서 리스트 상태를 바꿔주기 */
    handleUpdate(ev, event){
        // 부모로 또 전하기 
        this.props.updateEvent(ev);
    }

    // 예약 수정, 삭제 모달 
    closeModal(ev){
        this.setState({ isModal: false});
    }

    render() {
        return (
            <div className="dayz-test-wrapper" style={style}>
                <DateTime className="mb-2" label="" name="myDate" 
                            onChange={(e) => {this.setState({ date: moment(e.target.value)});}}
                />
                <div className="tools">
                    <label>
                        Week: <input type="radio"
                                     name="style" value="week" onChange={this.changeDisplay}
                                     checked={'week' === this.state.display} />
                    </label>
                    <label>
                        Day: <input type="radio"
                                    name="style" value="day" onChange={this.changeDisplay}
                                    checked={'day' === this.state.display} />
                    </label>
                </div>

                <Dayz {...this.state}
                      events={new Dayz.EventsCollection(this.props.events)}
                      displayHours={[9, 19]}
                    //   highlightDays={[this.state.date]}
                      onEventResize={this.onEventResize}
                      editComponent={this.editComponent}
                      onEventClick={this.onEventClick}
                >
                </Dayz> 
                <ReserveUpdateForm 
                    reservation_id={this.state.reservation_id}
                    handleUpdate={this.handleUpdate}
                    modalIsOpen={this.state.isModal}  closeModal={this.closeModal}/>
            </div>
        );
    }
}


// const div = document.createElement('div');
// document.body.appendChild(div);
// render(React.createElement(DayzTestComponent, {}), div);


export default ReserveCalendar;