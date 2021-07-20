import React,{ useState, useCallback, useEffect} from 'react';
import Modal from "react-modal";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { makeStyles } from '@material-ui/core/styles';
import style from './style.module.css';
import classNames from 'classnames/bind';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { getReservationsByName } from 'apis/reservation';
import { AutoSizer, List } from 'react-virtualized';
import PatientRow from './PatientRow';

const cx = classNames.bind(style);

const customStyles = {
  content: {
      width: '60vh',
      height: '27em',
      top: '50%',
      left: '44%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0px',
      // backgroundColor: 'yellow'

  },
};

Modal.setAppElement('body');
const SearchReservation = (props) => {
  const [name, setName] = useState(''); // 검색 조건 - 이름 
  const [patients, setPatients] = useState([]); // 검색 결과 

  useEffect(() => {
    setName('');
    setPatients([]);
  }, [props.modalIsOpen]);

  const handleChange = useCallback((event) => {
    setName(event.target.value);
  }, []);

  //회원 검색
  /* 이름 입력안하고 검색할때 에러 처리하기  */
  const handleSearch = async (patient_name) => {
    try{
      if(patient_name === ''){
        console.log('입력하세요');
        setPatients([]);
      }else{
        const response = await getReservationsByName(patient_name);
        setPatients(response.data.reservations);
      }
    }catch(error){
      console.log(error);
    }
  }; 

  const handleClick = (rid) => {
    props.handleClick(rid);
    // props.closeModal();
  };

  // 검색 초기화 
  const handleAllSearch = async() => {
    try{
      const response = await getReservationsByName('-');
      setPatients(response.data.reservations);
    }catch(error){
      console.log(error);
    }
  };

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


  // 하나의 행 UI 만들기 
  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <PatientRow patient={patients[index]} closeModal={props.closeModal} handleClick={handleClick} ></PatientRow>
      </div>
    );
  };

  return (
    <>
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      contentLabel="Search Reservation Modal"
      style={customStyles}      
    >
    <div className={cx("left-component-top")}>

      {/* 1. 검색할 내용 입력하는 div */}
      <div className={cx("search", "d-flex justify-content-center")}>
          <Paper component="form" className={cx("classes.root", "d-flex")}>
                <InputBase
                  className={cx("classes.input", "ml-3")} name="patient_name" 
                  value={name} required
                  onChange={handleChange}
                  placeholder="이름을 검색하세요" id="patient_name"
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch(name);
                  }}
                >  
                <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="전체보기" 
                        onClick={function(e){
                        e.preventDefault(); 
                        setName(''); // 검색 초기화 
                        handleAllSearch();
                }}>
                  <ClearAllIcon />
                </IconButton>
          </Paper>
      </div>

      {/* 2. 검색 결과가 나오는 div */}
      <div className={cx("search-result")}>
            <div className={cx("table-header", "d-flex")}>
              <span className="flex-fill">성명</span>
              <span className="flex-fill">H.P</span>
              <span className="flex-fill">다음예약</span>
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
    </Modal>
    </>
  );
};

export default SearchReservation;