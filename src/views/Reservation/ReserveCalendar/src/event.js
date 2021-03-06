import React       from 'react';
import PropTypes   from 'prop-types';
import Duration from './api/duration';

export default class Event extends React.Component {

    static propTypes = {
        duration:        PropTypes.instanceOf(Duration),
        editComponent: PropTypes.func,
        onClick:       PropTypes.func,
    }

    constructor(props) {
        super(props);
        [
            'onClick',  'onDragStart',
        ].forEach((ev) => {
            this[ev] = this[ev].bind(this);
        });
        this.state = {
            isClicked: false,
        }
    }

    onClick(e) {
        e.preventDefault();
        const rid = this.props.duration.event.attributes.reservation_id;

        // event 달력에서 클릭했을 때 색깔 변경
        e.currentTarget.className= "evbody evbody_visited";
        if (!this.props.onClick) { return; }

        this.props.onClick(rid);
       
        e.stopPropagation();
        this.setState({
            isClicked: true,
        });
    }

    onDragStart(ev) {}


    render() {
        return (
            <div
                ref="element"
                onMouseDown={this.onDragStart}
                style={{...this.props.duration.inlineStyles(), backgroundColor:this.props.backColor}}
                className={this.props.duration.classNames()}
            >
                <div className="evbody" onClick={this.onClick}>
                    {this.props.duration.event.render()}
                </div>
            </div>
        );
    }

}
