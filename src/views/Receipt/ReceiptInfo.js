import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import  Button  from "../common/Button";

const cx = classNames.bind(style);

const ReceiptInfo = (props) => {
  return (
    <>
      <div className={cx("search", "d-flex")}>
        <div className={cx("flex-grow-1")}>
          <h5 className={cx("patientlist")}>진료자 리스트</h5>
        </div>
        <div className={cx("mr-3")}>
          <Button type="submit" className={cx("form-btn-1", "ml-3", "custom-btn")}
                      onClick={function(e){e.preventDefault();}}>접수 취소</Button>

        </div>
      </div>
      {/* 테이블 */}
      <div className={cx("search-result")}>
        <table class="table table-bordered">
          <thead>
            <tr className={cx("table-header")}>
              <th>차트번호</th><th>성명</th><th>성별</th><th>H.P</th><th>상태</th><th>접수시간</th>
            </tr>
          </thead>
          <tbody>
            <tr className={cx("table-body")}>
              <td>10000001</td><td>조민상</td><td>M</td><td>010-****-7787</td><td>수납 전</td><td>2021/06/03 13:05:54</td>
            </tr>
            <tr className={cx("table-body")}>
              <td>10000002</td><td>이채정</td><td>F</td><td>010-****-7787</td><td>진료 중</td><td>2021/06/03 13:05:54</td>
            </tr>
            <tr className={cx("table-body")}>
              <td>10000003</td><td>임도희</td><td>F</td><td>010-****-7787</td><td>대기</td><td>2021/06/03 13:05:54</td>
            </tr>
            <tr className={cx("table-body")}>
              <td>10000004</td><td>강병주</td><td>M</td><td>010-****-7787</td><td>대기</td><td>2021/06/03 13:05:54</td>
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

export default ReceiptInfo;