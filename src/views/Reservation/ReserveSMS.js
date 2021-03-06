import {React, useState, useEffect} from 'react';
import style from './style.module.css';
import classNames from 'classnames/bind';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {Form} from 'react-form-elements';
import { TextareaAutosize } from '@material-ui/core';
import { sendMessage } from './CoolSMSAPI';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Swal from 'sweetalert2';

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
  const [format, setFormat] = useState('');

  const handleSMS = async (params) => {
    try{
      await sendMessage(params); // Server API 호출 
    }catch(e){
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    if(!(updateForm.reservation_phone && updateForm.reservation_phone && message)){
      console.log('문자 발송 금지 ');
      Swal.fire({
        title: '문자를 발송할 수 없습니다',
        text: '이름, 휴대전화, 메세지를 모두 입력하세요.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
      })
    }
    else{
      Swal.fire({
        title: '해당 번호로 문자를 보냅니다.',
        text: updateForm.reservation_phone,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '전송',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: '문자를 발송하였습니다.',
            showConfirmButton: false,
            timer: 1500
          })
          const params = {
            name: updateForm.reservation_name,
            phone: updateForm.reservation_phone,
            content: message,
          };
          handleSMS(params); // 여기서 content가 안들어가고 있음 

          // 예약 폼 초기화 
          setUpdateForm({});
          setMessage('');
          setFormat('');
        }
      })}};

  // 데이터 양방향 바인딩 
  const handleChange = (event) => {
    setUpdateForm({
        ...updateForm,
        [event.target.name]: event.target.value
    });
    setMessage(event.target.message);
    setFormat(event.target.value);
    if(event.target.value === 'confirm'){
      if(updateForm.reservation_name !== undefined){
        setMessage('[더조은병원]\n'+(updateForm.reservation_name || '00')+'님 '+
        (updateForm.reservation_datetime || '0000-00-00 00시 00분')+'예약 완료되었습니다.');
      }else{
        setMessage('[더조은병원]\n 000 환자 000 예약 완료되었습니다.');
      }
    }else if(event.target.value === 'position'){
      setMessage("[더조은병원]\n 중대로 135 서관 12층입니다. 지하에 주차 가능합니다. (1시간 무료) \n감사합니다");

    }else if(event.target.value === 'holiday'){
      setMessage('[더조은병원]\n 00월 00일은 병원 휴관입니다. 더 좋은 진료를 위해 항상 노력하겠습니다.\n감사합니다');
    }
  };  

  useEffect(() => {
    if(props.updateForm !== undefined){
      setUpdateForm(props.updateForm);
      setMessage('');
      setFormat('');
    }
  }, [props.updateForm]);

  const formatlist = [
    {
      value: 'confirm',
      label: '예약 확인',
    },
    {
      value: 'position',
      label: '위치 안내',
    },
    {
      value: 'holiday',
      label: '휴관 안내',
    },
  ];

  return (
    <div className={cx("right-component-bottom")}>
       <div className={cx("form-subject", "d-flex justify-content-between")}>
        <div>
          <MailOutlineIcon style={{fontSize: '1.8em'}} className="mr-1"/>
          문자 발송 
        </div>
        {/* 새로고침 아이콘 여기에 두기, onclick시에 값 초기화  */}
        <AutorenewIcon style={{"fontSize": "1.3em"}} className="mt-2 mr-4"
          onClick={() => {setUpdateForm({}); setMessage(''); setFormat('');}}
        ></AutorenewIcon>
      </div>
      <div className={cx("reserve-form-bottom")}>
        {/* form data : 이름 , 핸드폰번호, 보낼내용 */}
        <Form id="smsForm" name="smsForm" onSubmit={handleSubmit}>
              <div>
                <TextField required label="이름" className="mr-5" onChange={handleChange} name="reservation_name" value={updateForm.reservation_name || ''}/> <br/>
                <TextField required label="휴대전화" onChange={handleChange} name="reservation_phone" value={updateForm.reservation_phone || ''}/> <br/>
              </div>
              <div className="mt-2 mb-2">
                {/* 이 부분은 예약 수정 컴포넌트에서 SMS 발송 버튼 눌렀을 때만 보여져야함. */}
                <div style={{color: 'gray'}}>
                  {updateForm.reservation_datetime !== undefined && ('예약날짜: '+updateForm.reservation_datetime)}
                </div>
              </div> 
              {/* select  */}
              <div className="d-flex-row">
                <TextField
                  className="d-flex"
                  id="standard-select-currency"
                  select
                  required
                  label="내용 형식"
                  value={format}
                  onChange={handleChange}
                  helperText="간편하게 문자를 작성하세요."
                >
                  {formatlist.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> 
                <TextareaAutosize className="d-flex mt-2 mb-1" required onChange={handleChange} name="message" value={message} rowsMin={5} placeholder="보낼 내용 입력" />
              </div>
              <div>
                <Button type="submit" onClick={handleSubmit}
                form="smsForm" variant="outlined" size="small" color="primary" className={classes.margin}
                >전송</Button>
              </div>
        </Form>
      </div>
    </div>
  );
};

export default ReserveSMS;