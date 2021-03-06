import React     from 'react';
import PropTypes from 'prop-types';
import Layout    from './api/layout';
import Day       from './day';
import XLabels   from './x-labels';
import YLabels   from './y-labels';
import EventsCollection from './api/events-collection';
import { now } from 'moment';
import moment from './moment-range';

export default class Dayz extends React.Component {

    static EventsCollection = EventsCollection;

    static propTypes = {
        date:              PropTypes.object.isRequired,
        events:            PropTypes.instanceOf(EventsCollection),
        display:           PropTypes.oneOf(['month', 'week', 'day']),
        timeFormat:        PropTypes.string,
        dateFormat:        PropTypes.string,
        displayHours:      PropTypes.array,
        onEventClick:      PropTypes.func,
        onEventResize:     PropTypes.func,
        dayEventHandlers:  PropTypes.object,
        locale:            PropTypes.string,
        highlightDays:     PropTypes.oneOfType(
            [PropTypes.array, PropTypes.func],
        ),
        weekStartsOn:      PropTypes.oneOf([0, 1]),
    }

    static defaultProps = {
        display: 'week',
        locale: 'en',
    }

    constructor(props) {
        super(props);
        this.layoutFromProps();
    }

    componentDidUpdate(prevProps) {
        // don't calculate layout if update is due to state change
        if (prevProps !== this.props) {
            this.layoutFromProps();
            this.forceUpdate();
        }
    }

    componentWillUnmount() {
        this.detachEventBindings();
    }

    detachEventBindings() {
        if (this.props.events) { this.props.events.off('change', this.onEventAdd); }
    }

    onEventsChange() {
        this.forceUpdate();
    }

    layoutFromProps() {
        const { props } = this;
        if (this.props && props.events) {
            this.detachEventBindings();
            props.events.on('change', this.onEventsChange, this);
        }
        this.layout = new Layout(Object.assign({}, props));
    }

    get days() {
        return Array.from(this.layout.range.by('days'));
    }

    renderDays() {
        // ?????? ?????? ??????
        // Day??? ?????? ?????? (month?????? ??????)
        return this.days.map((day, index) => {
            let result = undefined;

            let backgroundColor = "#3b5bdb";
            const customDay = day.format('yyyyMMDD');
            const today = moment().format('yyyyMMDD');

            if(customDay < today){
                backgroundColor = "#868e96" 
            }else if(customDay === today){
                backgroundColor = "#9775fa" // now??? ????????? ????????? ??????????????? 
            }else{
                backgroundColor = "#f783ac"
                // backgroundColor = "#fd7e14"
            }

            if(day.format('ddd') === 'Sun' || day.format('ddd') === 'Sat'){
                result = <Day
                    key={day.format('YYYYMMDD')}
                    day={day}
                    position={index}
                    layout={this.layout}
                    handlers={this.props.dayEventHandlers}
                    onEventClick={this.props.onEventClick}
                    backColor={backgroundColor}
                    />;
            }else{
                result = <Day
                    key={day.format('YYYYMMDD')}
                    day={day}
                    position={index}
                    layout={this.layout}
                    handlers={this.props.dayEventHandlers}
                    onEventClick={this.props.onEventClick}
                    backColor={backgroundColor}
                    />;
            }
            return result;
        });
    }

    render() {
        const classes = ['dayz', this.props.display];
        return (
            <div className={classes.join(' ')}>
                <XLabels
                    date={this.props.date}
                    display={this.props.display}
                    dateFormat={this.props.dateFormat}
                    locale={this.props.locale}
                    weekStartsOn={this.props.weekStartsOn}
                />
                <div className="body">
                    <YLabels
                        layout={this.layout}
                        display={this.props.display}
                        date={this.props.date}
                        timeFormat={this.props.timeFormat}
                    />
                    <div className="days">
                        {this.renderDays()}
                        {this.props.children}
                    
                    </div>
                </div>
            </div>
        );
    }

}
