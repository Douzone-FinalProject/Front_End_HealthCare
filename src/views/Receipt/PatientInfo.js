import React from 'react';

const PatientInfo = () => {
  return (
    <div>
      <div class="card">
          <div class="card-header">
          환자 상세 정보 
          </div>
          <div class="card-body">
          <form>
            <div class="form-group row">
              <label for="chartNum" class="col-sm-2 col-form-label">차트번호</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="chartNum"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label">성명</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="name"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="ssn" class="col-sm-2 col-form-label">주민번호</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="ssn"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="age" class="col-sm-2 col-form-label">나이</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="age"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="bloodType" class="col-sm-2 col-form-label">혈액형</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="bloodType"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="height" class="col-sm-2 col-form-label">신장</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="height"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="weight" class="col-sm-2 col-form-label">체중</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="weight"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="max_bp" class="col-sm-2 col-form-label">최고혈압</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="max_bp"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="min_bp" class="col-sm-2 col-form-label">최저혈압</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="min_bp"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="pulse" class="col-sm-2 col-form-label">맥박</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="pulse"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="phone" class="col-sm-2 col-form-label">핸드폰</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="phone"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="email" class="col-sm-2 col-form-label">이메일</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="email"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="address" class="col-sm-2 col-form-label">주소</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="address"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="guardian_name" class="col-sm-2 col-form-label">보호자 이름</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="guardian_name"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="guardian_phone" class="col-sm-2 col-form-label">보호자 번호</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="guardian_phone"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="guardian_phone" class="col-sm-2 col-form-label">보호자 번호</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="guardian_phone"/>
              </div>
            </div>
            <fieldset class="form-group row">
              <legend class="col-form-label col-sm-2 float-sm-left pt-0">Radios</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                  <label class="form-check-label" for="gridRadios1">
                    First radio
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                  <label class="form-check-label" for="gridRadios2">
                    Second radio
                  </label>
                </div>
                <div class="form-check disabled">
                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled/>
                  <label class="form-check-label" for="gridRadios3">
                    Third disabled radio
                  </label>
                </div>
              </div>
            </fieldset>
            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">저장</button>
              </div>
            </div>
          </form>
 
          </div>
          
      </div>
      
    </div>
  );
};

export default PatientInfo;