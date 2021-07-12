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
import  Button  from "../common/Button";
import CreatePatient from 'views/CreatePatient';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { Link } from 'react-router-dom';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Clock from 'react-live-clock';

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
  const [patient_name, setPatient_name] = useState('');
  const patients = props.patients;

  // 신규 등록 모달 
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }

  const handleChange = (event) => {
    setPatient_name(event.target.value);
  };

  // 하나의 행 UI 만들기 
  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <PatientRow patient={patients[index]} handleClickPatient={props.handleClickPatient}></PatientRow>
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
          <span style={{fontSize:"1.1em", color:"#91a7ff"}} className="ml-5">
              <Clock format={'YYYY-MM-DD ddd HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'}/> 
          </span>
          <CreatePatient modalIsOpen={modalIsOpen} closeModal={closeModal} handleAdd={props.handleAdd}/>
        </div>
          <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input} name="patient_name" value={patient_name} onChange={handleChange}
                  placeholder="환자 이름을 검색하세요" id="patient_name"
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search"
                  onClick={(e) => {
                    e.preventDefault();
                    props.handleSearch(patient_name);
                  }}
                >  
                  <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="전체보기" 
                        onClick={function(e){
                        e.preventDefault(); 
                        setPatient_name(''); // 검색 초기화 
                        props.handleAllSearch();
                }}>
                  <ClearAllIcon />
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
            {
              patients.length > 0 ?
                  <AutoSizer disableHeight>
                      {({width, height}) => {
                        return <List width={width} height={275} list={patients} rowCount={patients.length} rowHeight={45} rowRenderer={rowRenderer} overscanRowCount={7}></List>
                      }}
                  </AutoSizer>
              :
              <div className="d-flex-row mt-4">
                <PersonOutlineIcon style={{width: "100%", height: "9em", color:"#868e96"}}/>
              </div>
            }
      </div>
    </div>
  );
};

export default PatientSearch;