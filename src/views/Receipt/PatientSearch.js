import React, {useState, useEffect} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import  Button  from "../common/Button";
import { AutoSizer, List } from 'react-virtualized';
import PatientRow from './PatientRow';
import { getPatientList } from './db';

const cx = classNames.bind(style);

const PatientSearch = (props) => {
  // state 
  const [search, setSearch] = useState({name: '', phone: '', sex: ''});
  const [patients, setPatients] = useState(getPatientList);

  // 사용자가 입력한 값 바인딩 
  const handleChange = (event) => {
    setSearch({
        ...search,
        [event.target.name]: event.target.value
    });
  };

  // useEffect(() => {
  //   console.log('마운트 실행 ');
  //   return () => {
  //     console.log('언마운트 실행 ');
  //   };
  // }, []);


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
      <div className={cx("search", "d-flex")}>
        <form action='' method='post' >
          <span className={cx("search-box")} >성명</span>
          <input className={cx("search-input")}  placeholder='홍길동' name="uname"></input>
          <span className={cx("search-box")} >H.P</span>
          <input className={cx("search-input")} placeholder='010xxxxxxxx' name="uphone"></input>
          <span className={cx("search-box")}>성별</span>
          <span className="p-1">
            <input className=" mt-2" type="radio" name="usex" value="male"/>
            <span className="ml-1">M</span>
            <input className="ml-3 mt-2" type="radio" name="usex" value="female"/>
            <span className="ml-1">F</span>
          </span>
        </form>
        
        <div className={cx("search-btn")}>
          <Button type="submit" className={cx("form-btn-1", "ml-3", "custom-btn")}
                                onClick={function(e){e.preventDefault();}}>찾기</Button>
          {/* <Button type="submit" className={cx("form-btn-1", "ml-3", "custom-btn")}
                      onClick={function(e){e.preventDefault();}}>접수</Button> */}
          <Button type="submit" className={cx("form-btn-1", "ml-3", "custom-btn")}
                      onClick={function(e){e.preventDefault();}}>모든 환자</Button>           

        </div>
      </div>
      {/* 1. 검색 결과가 나오는 div */}
      <div className={cx("search-result")}>
          <table className="table text-center">
            <thead >
              <tr className={cx("table-header")}>
                <th>차트번호</th><th>성명</th><th>주민번호</th><th>H.P</th><th>성별</th><th>최근진료날짜</th>
              </tr>    
            </thead>
            <tbody>
              <AutoSizer disableHeight>
                {({width, height}) => {
                  return <List width={width} height={300} list={patients} rowCount={patients.length} rowHeight={50} rowRenderer={rowRenderer} overscanRowCount={7}></List>
                }}
              </AutoSizer>
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default PatientSearch;