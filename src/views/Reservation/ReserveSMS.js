import React from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const cx = classNames.bind(style);

function sendSMS(pageName){
  console.log("문자를 전송합니다.");
  // $("#smsForm").attr("action", pageName + ".do"); //위에 있는 폼태그를 컨트롤러로 전송한다.
  // $("#smsForm").submit();
}

const ReserveSMS = (props) => {
  return (
    <div className={cx("right-component-bottom")}>
       <div className={cx("form-subject")}>
        <MailOutlineIcon style={{fontSize: '1.8em'}} className="mr-1"/>
        문자 발송 
      </div>
      <div className={cx("reserve-form")}>
        {/* 이름 , 핸드폰번호, 문자메세지 내용 입력  */}
        {/* <form method="post" id="smsForm">
          <table border="1" align="right" width="300" height="200" >
            <tr>
              <td>
                <span style={{color: 'green', fontWeight: 'bold'}}>SMS 전송 (문자보내기)</span>
                <ul>
                  <li>보낼사람 : <input type="text" name="from" placeholder=" 전화번호 입력 ( '-' 포함 )"/></li><br/>
                  <li>내용 : <textarea name="text" placeholder=" 보낼 내용 입력 "></textarea>    </li><br/>
                  <input type="button" onclick="sendSMS('sendSms')" value="전송하기" /><br/>
                </ul>
              </td>
            </tr>
          </table>
        </form> */}
      </div>
    </div>
  );
};

export default ReserveSMS;