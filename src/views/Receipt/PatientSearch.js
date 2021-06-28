import React, {useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { AutoSizer, List } from 'react-virtualized';
import PatientRow from './PatientRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import  Button  from "../common/Button";
import CreatePatient from 'views/CreatePatient';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
const useStyles = makeStyles((theme) => ({
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


const PatientSearch = (props) => {
  const classes = useStyles();

  // state 
  const [modalIsOpen, setIsOpen] = useState(false);
  const patients = props.patients;

  // 신규 등록 모달 
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }

  // 검색 결과 초기화 
  const handleInit = (e) => {
    // console.log('handleInit 실행됨 ');
  };

  // 하나의 행 UI 만들기 
  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <PatientRow patient={patients[index]} handleClick={props.handleClick}></PatientRow>
      </div>
    );
  };

  return (
    <div className={cx("left-component-top")}>
      {/* 1. 검색할 내용 입력하는 div */}
      <div className={cx("search", "d-flex justify-content-between")}>
        <div>
          <Button className={cx("ml-1", "custom-btn")} color="rgb(153, 102, 255)" onClick={openModal}>
               <AddToQueueIcon className="mr-2 mb-1"/>신규
          </Button>
          <Link to="/reserve">
            <Button className={cx("ml-3", "custom-btn")} color="rgb(153, 102, 255)">
               <AddAlarmIcon className="mr-2 mb-1"/>예약
            </Button>
          </Link>
          <CreatePatient modalIsOpen={modalIsOpen} closeModal={closeModal}/>
        </div>
          <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input} name="patient_name" defaultValue="" 
                  placeholder="환자 이름을 검색하세요" 
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('submit : ', e);
                  }}
                >
                  <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="전체보기" 
                        onClick={function(e){e.preventDefault(); handleInit();}}>
                  <ReplyAllIcon />
                </IconButton>
          </Paper>
      </div>

      {/* 2. 검색 결과가 나오는 div */}
      <div className={cx("search-result")}>
            <div className={cx("table-header", "d-flex")}>
              <span style={{width:"80px"}}>차트번호</span>
              <span className="flex-fill">성명</span>
              <span className="flex-fill">주민번호</span>
              <span className="flex-fill">H.P</span>
              <span className="flex-fill">성별</span>
              <span className="flex-fill">최근진료날짜</span>
            </div>
            {/* 리스트에서 하나의 행 컴포넌트는 자식으로 따로 만들기 */}
            <AutoSizer disableHeight>
                {({width, height}) => {
                  return <List width={width} height={300} list={patients} rowCount={patients.length} rowHeight={50} rowRenderer={rowRenderer} overscanRowCount={7}></List>
                }}
            </AutoSizer>
      </div>
    </div>
  );
};

export default PatientSearch;