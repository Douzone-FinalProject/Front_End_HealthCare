import React from 'react';

const PatientSearch = () => {
  return (
    <div>
      <div class="card">
          <div class="card-header">
             <button>성명</button>
             <input></input>
             <button>H.P</button>
             <input></input>
             <button>성별</button>
             <input></input>

            <button>찾기</button>  
            <button>접수</button>
          </div>
          <div class="card-body">
            <table class="table table-striped ">
                <thead class="">
                  <tr>
                    <th>차트번호</th><th>성명</th><th>주민번호</th><th>H.P</th><th>성별</th><th>최근진료날짜</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10000001</td><td>조민상</td><td>951103-1**</td><td>010-****-7787</td><td>M</td><td>2021/06/03 13:05:54</td>
                  </tr>
                  <tr>
                    <td>10000002</td><td>이채정</td><td>970322-2**</td><td>010-****-7787</td><td>F</td><td>2021/06/03 13:05:54</td>
                  </tr>
                  <tr>
                    <td>10000003</td><td>임도희</td><td>930520-1**</td><td>010-****-7787</td><td>M</td><td>2021/06/03 13:05:54</td>
                  </tr>
                  <tr>
                    <td>10000004</td><td>강병주</td><td>960206-1**</td><td>010-****-7787</td><td>M</td><td>2021/06/03 13:05:54</td>
                  </tr>
                </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};

export default PatientSearch;