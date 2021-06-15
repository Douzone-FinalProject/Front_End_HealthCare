import React from 'react';

const ReceiptInfo = () => {
  return (
    <div>
      <div class="card">
          <div class="card-header">
          진료자 리스트 
          </div>
          <div class="card-body">
          <table class="table table-striped ">
              <thead class="">
                <tr>
                  <th>차트번호</th><th>성명</th><th>성별</th><th>H.P</th><th>상태</th><th>접수시간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10000001</td><td>조민상</td><td>M</td><td>010-****-7787</td><td>수납 전</td><td>2021/06/03 13:05:54</td>
                </tr>
                <tr>
                  <td>10000002</td><td>이채정</td><td>F</td><td>010-****-7787</td><td>진료 중</td><td>2021/06/03 13:05:54</td>
                </tr>
                <tr>
                  <td>10000003</td><td>임도희</td><td>F</td><td>010-****-7787</td><td>대기</td><td>2021/06/03 13:05:54</td>
                </tr>
                <tr>
                  <td>10000004</td><td>강병주</td><td>M</td><td>010-****-7787</td><td>대기</td><td>2021/06/03 13:05:54</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default ReceiptInfo;