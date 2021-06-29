import React       from 'react';
import PropTypes   from 'prop-types';
import Duration from './api/duration';

export default class Event extends React.Component {

    static propTypes = {
        duration:        PropTypes.instanceOf(Duration),
        editComponent: PropTypes.func,
        onClick:       PropTypes.func,
        // onDoubleClick: PropTypes.func,
    }

    constructor(props) {
        super(props);
        // 'onDoubleClick', 'onDoubleClick',
        [
            'onClick',  'onDragStart',
        ].forEach((ev) => {
            this[ev] = this[ev].bind(this);
        });
        this.state = {
            isClicked: false,
        }
    }

    onClick(ev) {
        ev.currentTarget.className= "evbody evbody_visited";
        // event 달력에서 클릭했을 때 색깔 변경하고싶음 -------
        if (!this.props.onClick) { return; }
        this.props.onClick(ev, this.props.duration.event);
        ev.stopPropagation();
        this.setState({
            isClicked: true,
        });
    }

    // onDoubleClick(ev) {
    //     if (!this.props.onDoubleClick) { return; }
    //     this.props.onDoubleClick(ev, this.props.duration.event);
    //     ev.stopPropagation();
    // }

    onDragStart(ev) {}

    render() {
        const body = ( //evbody_visited
            <div className="evbody" onClick={this.onClick}>
                {this.props.duration.event.render()}
            </div>
        );
        // const Edit = this.props.editComponent;
        // const children = this.props.duration.isEditing()
        //     ? (<Edit event={this.props.duration.event} >{body}</Edit>) : body;
        return (

            <div
                ref="element"
                onMouseDown={this.onDragStart}
                style={this.props.duration.inlineStyles()}
                className={this.props.duration.classNames()}
            >
                <div className="evbody" onClick={this.onClick}>
                    {this.props.duration.event.render()}
                </div>
            </div>
        );
    }

}
