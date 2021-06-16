import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';

const cx = classNames.bind(style);

const PatientInfo = (props) => {
  return (
    <div className={cx("patient-detail")}>
      <div className={cx("patient-detail-top")}>
        <span>환자 상세 정보</span>
      </div>
      {/* form - 환자 정보 읽기, 수정 또는 삭제 기능 */}
      <div className={cx("patient-detail-bottom")}>
          <form>
              {/* 필수 입력 정보 required */}
              <div className={cx("d-flex")}>
                <div className={cx("form-span")}>차트번호</div>
                <input className={cx("form-input")} type="text" name="chartNum" value="10000001"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>성명</span>
                <input className={cx("form-input")} type="text" name="name" value="조민상"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>주민번호</span>
                <input className={cx("form-input")} type="text" name="ssn" value="951103-1*****"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>핸드폰</span>
                <input className={cx("form-input")} type="text" name="phone" value="01011111111"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>주소</span>
                <input className={cx("form-input")} type="text" name="address" value="서울시 중대로 135 12층"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>혈액형</span>
                <input className={cx("form-input")} type="text" name="bloodType" value="AB"/>
              </div>
              
              {/* 널 허용하는 인풋 */}
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>신장</span>
                <input className={cx("form-input")} type="text" name="height" value="190"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>체중</span>
                <input className={cx("form-input")} type="text" name="weight" value="81"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>최고혈압</span>
                <input className={cx("form-input")} type="text" name="max_bp" value="120"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>최저혈압</span>
                <input className={cx("form-input")} type="text" name="min_bp" value="80"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>맥박</span>
                <input className={cx("form-input")} type="text" name="pulse" value="90"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>보호자 이름</span>
                <input className={cx("form-input")} type="text" name="guardian_name" value="조병주"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>보호자 번호</span>
                <input className={cx("form-input")} type="text" name="guardian_phone" value="01022222222"/>
              </div>
              <div className={cx("d-flex")}>
                <span className={cx("form-span")}>가족관계</span>
                <input className={cx("form-input")} type="text" name="guardian_name" value="부"/>
              </div>
              <div className={cx("form-record")}>
                <div>최초진료: 2021-06-01</div>
                <div>최근진료: 2021-06-03</div>
                <div>다음예약: 2021-06-10 09:00</div>
              </div>

             {/* 버튼 */}
             <div className={cx("form-btn")}>
                <button type="button" class="btn btn-primary mr-3 ">영구 삭제</button>
                <button type="submit" class="btn btn-primary">저장</button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default PatientInfo;