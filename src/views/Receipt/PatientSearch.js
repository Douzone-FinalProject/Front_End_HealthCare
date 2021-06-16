import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import { css } from 'styled-components';

const cx = classNames.bind(style);


const PatientSearch = () => {
  return (
    <>
      {/* 1. 검색할 내용 입력하는 div */}
      <div className={cx("search", "d-flex")}>
        <span className={cx("search-box")} >성명</span>
        <input className={cx("search-input")} placeholder='홍길동'></input>
        <span className={cx("search-box")} >H.P</span>
        <input className={cx("search-input")} placeholder='010xxxxxxxx'></input>
        <span className={cx("search-box")}>성별</span>
        <input className={cx("search-input")} placeholder='M/F'></input>
        
        <div className={cx("search-btn")}>
          <button className={cx("search-btn-1")}>찾기</button>  
          <button className={cx("search-btn-2")}>접수</button>  
        </div>
      </div>
      {/* 1. 검색 결과가 나오는 div */}
      <div className={cx("search-result")}>
          <table className="table table-bordered">
            <thead >
              <tr className={cx("table-header")}>
                <th>차트번호</th><th>성명</th><th>주민번호</th><th>H.P</th><th>성별</th><th>최근진료날짜</th>
              </tr>    
            </thead>
            <tbody>
                <tr className={cx("table-body")}>
                    <td>10000001</td><td>조민상</td><td>951103-1**</td><td>010-****-7787</td><td>M</td><td>2021/06/03 13:05:54</td>
                </tr>
                <tr className={cx("table-body")}>
                    <td>10000002</td><td>이채정</td><td>970322-2**</td><td>010-****-7787</td><td>F</td><td>2021/06/03 13:05:54</td>
                </tr>
                <tr className={cx("table-body")}>
                    <td>10000003</td><td>임도희</td><td>930520-1**</td><td>010-****-7787</td><td>M</td><td>2021/06/03 13:05:54</td>
                </tr>
                <tr className={cx("table-body")}>
                    <td>10000004</td><td>강병주</td><td>960206-1**</td><td>010-****-7787</td><td>M</td><td>2021/06/03 13:05:54</td>
                </tr>
                {/* 페이저 */}
                <tr>
                  <td colspan="6" className={cx("pager")}>
                      <button class="btn btn-outline-primary btn-sm" ng-click="getInquiryList(1, sid)">처음</button>
                      {/* <button class="btn btn-sm" ng-show="pager.groupNo>1"
                                ng-click="getInquiryList(pager.startPageNo-1, sid)">이전</button> */}
                      <button ng-repeat="i in pageRange"
                                class="btn btn-sm {{(pager.pageNo==i)?'btn-primary':'btn-light'}} {{!$last?'mr-1':''}}"
                                ng-click="getInquiryList(i, sid)">1</button>
                      <button ng-repeat="i in pageRange"
                                class="btn btn-sm {{(pager.pageNo==i)?'btn-primary':'btn-light'}} {{!$last?'mr-1':''}}"
                                ng-click="getInquiryList(i, sid)">2</button>
                      <button ng-repeat="i in pageRange"
                                class="btn btn-sm {{(pager.pageNo==i)?'btn-primary':'btn-light'}} {{!$last?'mr-1':''}}"
                                ng-click="getInquiryList(i, sid)">3</button>
                      {/* <button class="btn btn-sm" ng-show="pager.groupNo < pager.totalGroupNo"
                                ng-click="getInquiryList(pager.endPageNo+1, sid)">다음</button> */}
                      <button class="btn btn-outline-primary btn-sm"
                                ng-click="getInquiryList(pager.totalPageNo, sid)">맨끝</button>     
                  </td>
                </tr>
            </tbody>
          </table>
      </div>
    </>
  );
};

export default PatientSearch;