import React  from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import WhereToVoteIcon from '@material-ui/icons/WhereToVote';

export default class XLabels extends React.Component {

    static propTypes = {
        display:      PropTypes.oneOf(['month', 'week', 'day']),
        date:         PropTypes.object.isRequired,
        dateFormat:   PropTypes.string,
        locale:       PropTypes.string.isRequired,
        weekStartsOn: PropTypes.oneOf([0, 1]),
    }

    get days() {
        const days = [];

        if ('day' === this.props.display) {
            days.push(moment(this.props.date));
        } else {
            let startOfType = 'week';
            const day = moment(this.props.date).locale(this.props.locale);
            if (this.props.weekStartsOn !== undefined) {
                startOfType = 'isoWeek';
                day.startOf(startOfType);
                if (0 === this.props.weekStartsOn && 1 === day.isoWeekday()) {
                    day.subtract(1, 'day');
                }
            } else {
                day.startOf(startOfType);
            }
            for (let i = 0; i < 7; i += 1) {
                days.push(day.clone().add(i, 'day'));
            }
        }
        return days;
    }

    get dateFormat() {
        const defaultFormat = 'month' === this.props.display ? 'dddd' : 'ddd, MMM Do';
        return this.props.dateFormat || defaultFormat;
    }

    render() {
        const today = moment(new Date()).format('YYYYMMDD')
        return (
            <div className="x-labels">
                {
                    this.days.map(day => 
                        // 달력의 날짜 부분 #####
                        <div key={day.format('YYYYMMDD')} className="day-label">
                            {day.format('YYYYMMDD') === today?
                            <div key={day.format('YYYYMMDD')} className="day-label day-label-today">
                                <WhereToVoteIcon className="m-1"/>
                                {day.locale(this.props.locale).format(this.dateFormat)}
                            </div>
                            :
                            <div key={day.format('YYYYMMDD')} className="day-label">
                                {day.locale(this.props.locale).format(this.dateFormat)}
                            </div>
                            }
                        </div>
                )}
            </div>
        );
    }

}
