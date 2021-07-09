import React     from 'react';
import ReactDOM  from 'react-dom';
import PropTypes from 'prop-types';
import Event     from './event';
import Layout    from './api/layout';
import Label     from './label';

const IsDayClass = new RegExp('(\\s|^)(events|day|label)(\\s|$)');

export default class Day extends React.Component {

    static propTypes = {
        day:            PropTypes.object.isRequired,
        layout:         PropTypes.instanceOf(Layout).isRequired,
        handlers:       PropTypes.object,
        position:       PropTypes.number.isRequired,
        highlight:      PropTypes.func,
        onEventClick:   PropTypes.func,
        editComponent:  PropTypes.func,
    }

    static defaultProps = {
        handlers: {},
    }

    constructor() {
        super();
        this.state = { resize: false};
        //'onDoubleClick',
        [
            'onClick', 
        ].forEach((ev) => {
            this[ev] = this[ev].bind(this);
        });
    }

    get boundingBox() {
        return ReactDOM.findDOMNode(this.refs.events || this.refs.root).getBoundingClientRect();
    }

    onClickHandler(ev, handler) {
        if (!handler || !IsDayClass.test(ev.target.className)
            || (this.lastMouseUp
              && (this.lastMouseUp < (new Date()).getMilliseconds() + 100)
            )) {
            return;
        }
        this.lastMouseUp = 0;
        const bounds = this.boundingBox;
        const perc = Math.max(
            0.0,
            ((ev.clientY - bounds.top) / ev.target.offsetHeight),
        );
        const hours = this.props.layout.displayHours[0]
            + ((this.props.layout.minutesInDay() * perc) / 60);
        handler.call(this, ev, this.props.day.clone().startOf('day').add(hours, 'hour'));
    }

    onClick(ev) {
        this.onClickHandler(ev, this.props.handlers.onClick);
    }


    renderEvents() {
        // content - 예약 내역 들어가는 공간 , 보여지는 내용 !!! 
        const asMonth = this.props.layout.isDisplayingAsMonth;
        const singleDayEvents = [];
        const allDayEvents    = [];
        this.props.layout.forDay(this.props.day).forEach((duration) => {
            const event = (    
                <Event
                    duration={duration}
                    key={duration.key()}
                    day={this.props.day}
                    parent={this}
                    // 부모에게 props로 받은 이벤트함수에 파라미터로 이벤트 아이디를 넘겨줌 
                    onClick={(rid) => {this.props.onEventClick(rid);}}
                />
            );
            (duration.event.isSingleDay() ? singleDayEvents : allDayEvents).push(event);
        });
        const events = [];
        if (allDayEvents.length || !asMonth) {
            events.push(
                <div key="allday" {...this.props.layout.propsForAllDayEventContainer()}>
                    {allDayEvents}
                </div>,
            );
        }
        if (singleDayEvents.length) { // 하루!! 일반적인 경우 
            events.push(
                <div
                    key="events" ref="events" className="events"
                >
                    {singleDayEvents}
                </div>,
            );
        }
        return events;
    }

    render() {
        const props = this.props.layout.propsForDayContainer(this.props);

        return (
            <div
                ref="root"
                {...props}
                onClick={this.onClick}
            >
                <Label day={this.props.day} className="label">
                    {this.props.day.format('D')}
                </Label>
                {this.renderEvents()}
            </div>
        );
    }

}
