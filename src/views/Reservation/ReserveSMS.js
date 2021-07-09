import {React, useState, useEffect} from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import {
  Form,
} from 'react-form-elements';
import { TextareaAutosize } from '@material-ui/core';
import { sendMessage } from './CoolSMSAPI';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const cx = classNames.bind(style);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ReserveSMS = (props) => {
  const classes = useStyles();

  const [updateForm, setUpdateForm] = useState({});
  const [message, setMessage] = useState('');

  const handleSMS = async (params) => {
    try{
      await sendMessage(params); // Server API 호출 
    }catch(e){
      console.log(e);
    }
  };

  // 데이터 양방향 바인딩 
  const handleChange = (event) => {
    setUpdateForm({
        ...updateForm,
        [event.target.name]: event.target.value
    });
    setMessage(event.target.message);
  };  

  useEffect(() => {
    if(props.updateForm !== undefined){
      setUpdateForm(props.updateForm);
    }else{
      console.log('updateForm undefined');
    }
  }, [props.updateForm]);

  return (
    <div className={cx("right-component-bottom")}>
       <div className={cx("form-subject", "d-flex justify-content-between")}>
        <div>
          <MailOutlineIcon style={{fontSize: '1.8em'}} className="mr-1"/>
          문자 발송 
        </div>
        {/* 새로고침 아이콘 여기에 두기, onclick시에 값 초기화  */}
        <AutorenewIcon style={{"fontSize": "1.3em"}} className="mt-2 mr-4"
          onClick={() => {setUpdateForm({}); setMessage('');}}
        ></AutorenewIcon>
      </div>
      <div className={cx("reserve-form")}>
        {/* form data : 이름 , 핸드폰번호, 보낼내용 */}
        <Form id="smsForm" name="smsForm" onSubmit={(e) => {console.log('형식상 필요한 함수')}}>
          <div className="d-flex-col">
            <div>
              <TextField required label="이름" className="mr-5" onChange={handleChange} name="reservation_name" value={updateForm.reservation_name || ''}/> <br/>
              <TextField required label="휴대전화" onChange={handleChange} name="reservation_phone" value={updateForm.reservation_phone || ''}/> <br/>
              <div className="mt-4">
                {/* 이 부분은 예약 수정 컴포넌트에서 SMS 발송 버튼 눌렀을 때만 보여져야함. */}
                <div style={{color: 'gray'}}>
                  {updateForm.reservation_datetime !== undefined && ('예약날짜: '+updateForm.reservation_datetime)}
                </div>
              </div> 
              <TextareaAutosize className="mt-3" required onChange={handleChange} name="message" value={message} rowsMin={5} placeholder="보낼 내용 입력" />
            </div>
          </div>
            <Button type="submit" form="smsForm" 
            variant="outlined" size="small" color="primary" className={classes.margin}
                    onClick={(e) => {
                      e.preventDefault();
                      const params = {
                        name: updateForm.reservation_name,
                        phone: updateForm.reservation_phone,
                        content: updateForm.message,
                      };
                      handleSMS(params);

                      // 예약 폼 초기화 
                      setUpdateForm({});
                      // message 초기화 
                      setMessage('');
                    }}
            >전송</Button>
        </Form>
      </div>
    </div>
  );
};

export default ReserveSMS;