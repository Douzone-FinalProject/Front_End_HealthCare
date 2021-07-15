import React from 'react';
import moment from './src/moment-range';
import Dayz from './src/dayz';
import { DateTime } from 'react-form-elements';
import  Button  from "../../common/Button";
import { Link } from 'react-router-dom';
import style from '../style.module.css';
import classNames from 'classnames/bind';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { makeStyles } from '@material-ui/core/styles';

require('./demo.scss');

/*
 * 예약은 30분 단위로만 할 수 있음 
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
            patient_name: ''
        };
    }


    // 달력에서 문자열 길이만큼 보여주기 
    textLengthOverCut(txt, len, lastTxt) {
        if (len === "" || len === null) { // 기본값
            len = 20;
        }
        if (lastTxt === "" || lastTxt === null) { // 기본값
            lastTxt = "...";
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return txt;
    }

    // month or day mode 
    changeDisplay(ev) {
        this.setState({ display: ev.target.value });
    }

    handleChange(event){
        this.setState({patient_name: event.target.value})
    }

    // 시간대별로 나올 수 있도록 
    onEventResize(ev, event) {}

    /* 예약 수정, 삭제 할 수 있는 컴포넌트 뜨게 하기 => 부모의 mode 상태 바꾸기  */
    onEventClick(rid) {
        this.props.handleClick(rid); // 여기서는 rid를 꼭 넘겨줘야 한다!!!!!!!---- 
    }

    render() {
        const classes = makeStyles((theme) => ({
            root: {
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
            },
            input: {
              marginLeft: theme.spacing(1),
              flex: 1,
            },
            iconButton: {
              padding: 10,
            },
          }));

      

        return (
            <div className="dayz-test-wrapper" style={custom_style}>
                <div className="d-flex justify-content-between">
                    <Link to="/receipt">
                        <Button className={cx("ml-3", "custom-btn")} color="rgb(153, 102, 255)">
                            <ArrowBackIcon/> 접수
                        </Button>
                    </Link>

                    <Paper component="form" className={cx("classes.root", "d-flex")} >
                        <InputBase
                            style={{"width": "15em"}}
                            className={classes.input} name="patient_name" 
                            // value
                            onChange={this.handleChange}
                            placeholder="  환자 이름을 검색하세요" id="patient_name"
                        />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search"
                            onClick={(e) => {
                                e.preventDefault();
                                // props.handleSearch(patient_name);
                            }}
                            >  
                            <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton color="primary" className={classes.iconButton} aria-label="전체보기" 
                                    onClick={function(e){
                                    e.preventDefault(); 
                                    // setPatient_name(''); // 검색 초기화 
                                    // props.handleAllSearch();
                            }}>
                            <ClearAllIcon />
                            </IconButton>
                    </Paper>
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
                      displayHours={[8, 19]}
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