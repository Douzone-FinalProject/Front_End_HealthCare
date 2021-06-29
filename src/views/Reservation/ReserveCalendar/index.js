import React from 'react';
import moment from './src/moment-range';
import Dayz from './src/dayz';
import { DateTime } from 'react-form-elements';
import ReserveUpdateForm from '../ReserveUpdateForm';
import  Button  from "../../common/Button";
import { Link } from 'react-router-dom';
import style from '../style.module.css';
import classNames from 'classnames/bind';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

require('./demo.scss');

/**
 * 예약은 30분 단위로만 할 수 있음 
 * 
 */
const cx = classNames.bind(style);

const custom_style = {
    backgroundColor: '#f8f9fa',
    borderRadius: '7px',
};

class ReserveCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.onEventClick = this.onEventClick.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
        this.onEventResize = this.onEventResize.bind(this);
         // 기준 날짜 - 날짜 선택해서 동적으로 바뀔 수 있도록 함 
        const date = new Date();
        this.state = {
            date,
            display: 'week',
            // 디비에서 가져온 예약 리스트도 상태로 가지고 있음 
            events: new Dayz.EventsCollection(this.props.events),
        };
    }

    changeDisplay(ev) {
        this.setState({ display: ev.target.value });
    }

    // 시간대별로 나올 수 있도록 
    onEventResize(ev, event) {}

    /* 예약 수정, 삭제 할 수 있는 컴포넌트 뜨게 하기 => 부모의 mode 상태 바꾸기  */
    onEventClick(ev, event) {
        this.props.handleClick(ev);
    }

    render() {
        return (
            
            <div className="dayz-test-wrapper" style={custom_style}>
                <div className="d-flex justify-content-between">
                    <Link to="/receipt">
                        <Button className={cx("ml-3", "custom-btn")} color="rgb(153, 102, 255)">
                            <ArrowBackIcon/> 접수
                        </Button>
                    </Link>
                    <DateTime className="mb-2" label="" name="myDate" 
                            onChange={(e) => {this.setState({ date: moment(e.target.value)});}}/>
                </div>
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
                      onEventResize={this.onEventResize}
                      editComponent={this.editComponent}
                      onEventClick={this.onEventClick}
                >
                </Dayz> 
            </div>
        );
    }
}

export default ReserveCalendar;