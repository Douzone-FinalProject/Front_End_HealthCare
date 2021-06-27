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
  divider: {
    height: 28,
    margin: 4,
  },
}));

const PatientSearch = (props) => {
  const classes = useStyles();

  // state 
  const [search, setSearch] = useState({name: '', phone: '', sex: ''});
  const patients = props.patients;

  // 사용자가 입력한 값 바인딩 
  const handleChange = (event) => {
    setSearch({
        ...search,
        [event.target.name]: event.target.value
    });
  };

  // 검색 결과 초기화 
  const handleInit = (e) => {
    // console.log('handleInit 실행됨 ');
    setSearch({name: '', phone: '', sex: ''});
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
        <form method='post' onSubmit={(e) => {
          e.preventDefault();
          alert('submit : '+ e.target.uname.value +' '+e.target.uphone.value+' '+e.target.usex.value);
        }}>

      <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input} name="uname" onClick={handleChange}
              placeholder="환자 이름을 검색하세요"
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="전체보기" 
                    onClick={function(e){e.preventDefault(); handleInit();}}>
              <ReplyAllIcon />
            </IconButton>
            {/* <Button type="button" className={cx("form-btn-1", "ml-3", "custom-btn")}
           color="" onClick={function(e){e.preventDefault(); handleInit();}}>전체보기</Button> */}
      </Paper>

          {/* <span className={cx("search-box")} >성명</span>
          <input className={cx("search-input")}  placeholder='홍길동' name="uname" onClick={handleChange}></input>
          <span className={cx("search-box")} >H.P</span>
          <input className={cx("search-input")} placeholder='010xxxxxxxx' name="uphone" onClick={handleChange}></input>
          <span className={cx("search-box")}>성별</span>
          <span className="p-1">
            <input className=" mt-2" type="radio" name="usex" value="male" onClick={handleChange}/>
            <span className="ml-1">M</span>
            <input className="ml-3 mt-2" type="radio" name="usex" value="female" onClick={handleChange}/>
            <span className="ml-1">F</span>
          </span>
          <Button type="submit" className={cx("form-btn-1", "ml-3", "custom-btn")}
          >찾기</Button> */}
        </form>
        
       
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
                  return <List width={width} height={230} list={patients} rowCount={patients.length} rowHeight={50} rowRenderer={rowRenderer} overscanRowCount={5}></List>
                }}
            </AutoSizer>
      </div>
    </div>
  );
};

export default PatientSearch;