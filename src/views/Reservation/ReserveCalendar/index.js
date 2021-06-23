import React from 'react';
import moment from './src/moment-range';
import Dayz from './src/dayz';
import { DateTime } from 'react-form-elements';
import ReserveUpdateForm from '../ReserveUpdateForm';
require('./demo.scss');
let COUNT = 1;

const style = {
    backgroundColor: '#fff5f5',
    borderRadius: '7px'
};

class ReserveCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.addEvent = this.addEvent.bind(this);
        this.onEventClick = this.onEventClick.bind(this);
        this.editComponent = this.editComponent.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
        this.closeModal = this.closeModal.bind(this);
         // 기준 날짜 - 날짜 선택해서 동적으로 바뀔 수 있도록 함 
        const date = new Date();
        this.state = {
            isModal: false,
            date,
            display: 'month',
            events: new Dayz.EventsCollection([
                { content: '14:00 임도리 1343',
                  range: moment.range(moment('2021-06-21').hour(14), moment('2021-06-21').hour(14).minutes(20)) },

                { content: '11:00 주캉병 7643',
                  range: moment.range(moment('2021-06-23').hour(11), moment('2021-06-23').hour(11).minutes(20)) },

                { content: '17:00 무좀상 9977',
                  range: moment.range(moment('2021-06-29').hour(17), moment('2021-06-29').hour(17).minutes(20))
                },

                { content: '10:00 이채정 7787',
                  range: moment.range(moment('2021-06-23').hour(10), moment('2021-06-23').hour(10).minutes(20)) },
            ]),
        };
    }

    changeDisplay(ev) {
        this.setState({ display: ev.target.value });
    }

    onEventClick(ev, event) {
        // 예약 수정, 삭제 할 수 있는 모달 창 뜨게 하기 
        // event.set({ editing: !event.isEditing() });
        this.setState({ isModal: true});
    }

    // 예약 수정, 삭제 모달 
    closeModal(ev){
        this.setState({ isModal: false});
    }

    addEvent(ev, date) {
        this.state.events.add({
            content: `Event ${COUNT++}`,
            range: moment.range(date.clone(), date.clone().add(1, 'hour').add(45, 'minutes')),
        });
    }

    editComponent(props) {
        console.log('수정 컴포넌트 props: ', props);
        const onBlur   = function() { 
            console.log(' 블러?????  !! ')
            props.event.set({ editing: false }); 
        };
        const onChange = function(e) { 

            props.event.set({ content: e.target.value }); 
        };
        const onDelete = function() { 
            console.log('Delete Button Click !! ')
            props.event.remove(); 
        };
        return (
            <div className="edit">
                <input
                    type="text" autoFocus
                    value={props.event.content}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <button onClick={onDelete}>X</button>

            </div>
        );
    }

    render() {
        return (
            <div className="dayz-test-wrapper" style={style}>
                <DateTime className="mb-2" label="" name="myDate" 
                            onChange={(e) => {this.setState({ date: moment(e.target.value)});}}
                />
                <div className="tools">
                    <label>
                        Month: <input type="radio"
                                      name="style" value="month" onChange={this.changeDisplay}
                                      checked={'month' === this.state.display} />
                    </label><label>
                        Week: <input type="radio"
                                     name="style" value="week" onChange={this.changeDisplay}
                                     checked={'week' === this.state.display} />
                    </label><label>
                        Day: <input type="radio"
                                    name="style" value="day" onChange={this.changeDisplay}
                                    checked={'day' === this.state.display} />
                    </label>
                </div>

                <Dayz {...this.state}
                      displayHours={[9, 19]}
                    //   highlightDays={[this.state.date]}
                      editComponent={this.editComponent}
                    //   onDayDoubleClick={this.addEvent}
                      onEventClick={this.onEventClick}
                >
                </Dayz>
                <ReserveUpdateForm modalIsOpen={this.state.isModal}  closeModal={this.closeModal}/>
            </div>
        );
    }
}


// const div = document.createElement('div');
// document.body.appendChild(div);
// render(React.createElement(DayzTestComponent, {}), div);


export default ReserveCalendar;