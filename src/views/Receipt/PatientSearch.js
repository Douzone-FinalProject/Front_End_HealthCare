import React, {useState, useMemo, useEffect} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import  Button  from "../common/Button";
import { AutoSizer, List } from 'react-virtualized';
import PatientRow from './PatientRow';

const cx = classNames.bind(style);

const PatientSearch = (props) => {
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

  // 재연산을 방지하자 => useMemo 
  const getLength = useMemo(() => { // 매번 입력할때마다 실행될 필요 없음 -> 성능 향상 시키기 
    console.log('getLength() 실행 ');
    return patients.length;
  }); 

  // 검색 결과 초기화 
  const handleInit = (e) => {
    console.log('handleInit 실행됨 ');
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
      <div className={cx("search", "d-flex")}>
        <form method='post' onSubmit={(e) => {
          e.preventDefault();
          alert('submit : '+ e.target.uname.value +' '+e.target.uphone.value+' '+e.target.usex.value);
        }}>
          <span className={cx("search-box")} >성명</span>
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
          >찾기</Button>
        </form>
        
        <div className={cx("")}>
          <Button type="button" className={cx("form-btn-1", "ml-3", "custom-btn")}
                      onClick={function(e){e.preventDefault(); handleInit();}}>모든 환자</Button>                 
          <span className="ml-5 text-primary">결과 </span>
          <span className="text-primary">{getLength}</span>
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
                  return <List width={width} height={230} list={props.patients} rowCount={props.patients.length} rowHeight={50} rowRenderer={rowRenderer} overscanRowCount={5}></List>
                }}
              </AutoSizer>
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default PatientSearch;