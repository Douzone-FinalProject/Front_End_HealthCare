import {React, useState, useEffect} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from './ReserveCalendar/src/moment-range';
import Swal from 'sweetalert2';
import {Form} from 'react-form-elements';
import { getReservationById } from 'apis/reservation';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const cx = classNames.bind(style);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ReserveUpdateForm = (props) => {
  const classes = useStyles();
  // state
  const [updateForm, setUpdateForm] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = (time) => {
    return time.getHours() > 8 && time.getHours() < 19? "text-success" : "text-error";
  };

  // props 
  const rid = props.reservation_id;

  let reservation = {};
  const handleReservationLById = async (rid) => {
    try{
      const response = await getReservationById(rid);
      const db = response.data.reservation;
      reservation = {...db, 
                    resizable: true, 
                    range: moment.range(moment(db.reservation_datetime), 
                          moment(db.reservation_datetime).add(30, 'minutes'))
      }
      console.log('ReserveUpdateForm component: ', reservation);
      setUpdateForm(reservation);

    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    if(rid !== undefined) {
      handleReservationLById(rid);
    }else{
      console.log('rid undefined');
    }
  },[props.reservation_id]);

  const handleChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (e) => {
    Swal.fire({
      icon: 'success',
      title: updateForm.reservation_name + '님 예약이 수정되었습니다.',
      showConfirmButton: false,
      timer: 1500
    })

    // DB 수정 -> 부모로 전달  
    updateForm.reservation_datetime = moment(startDate).format('YYYY-MM-DD HH:mm');
    updateForm.range = moment.range(moment(updateForm.reservation_datetime), moment(updateForm.reservation_datetime).add(30, 'minutes')) 
    props.handleUpdate(updateForm);

    // 값 초기화 
    setUpdateForm({});
    setStartDate(new Date());
    props.handleMode();
  };

  return (
    <div className={cx("right-component-top")}>
      <div className={cx("form-subject", "d-flex justify-content-between")}>
        <div>
          <AddAlarmIcon style={{fontSize: '1.8em'}} className="mr-1"/>예약 수정 
        </div>
        <Button 
          variant="outlined" size="small" color="primary" className={classes.margin}
            onClick={() => {props.handleMode();}}>새로운 예약</Button>
      </div>
      <div className={cx("reserve-form")}>
          <Form name="updateForm" onSubmit={handleUpdate}>
            <div>
              <TextField disabled label="이름" className="mr-5" name="reservation_name" 
                        value={updateForm.reservation_name || ''}/> 
              <TextField disabled label="휴대전화" name="reservation_phone" 
                        value={updateForm.reservation_phone || ''}/> 

              <TextField required label="내원사유"  onChange={handleChange}
                    name="reservation_reason" value={updateForm.reservation_reason || ''}/> 
              <div className="mt-4 mb-3">
                
                <div style={{color: 'gray', fontSize:'13px'}} className="mb-2">예약 날짜
                  <div className="mr-3 font-weight-bold">{updateForm.reservation_datetime || ''}</div>
                </div>
                <DatePicker style={{color: 'gray'}}
                  dateFormat="yyyy-MM-dd HH:mm"
                  showTimeSelect
                  name="reservation_datetime"
                  selected={startDate}
                  onChange={(date) => {
                    console.log('date: ', date);
                    setStartDate(date);
                  }}
                  timeClassName={handleColor}
                />
               </div> 
            </div>
                <Button type="button" 
                  variant="outlined" size="small" color="primary" className={classes.margin}
                  onClick={() => {props.handleSMS(updateForm)}}>SMS 발송</Button>
                <Button
                  variant="outlined" size="small" color="primary" className={classes.margin}
                  type="button" 
                    onClick={() => {
                      Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                          const rid = updateForm.reservation_id;
                          props.handleDelete(rid);
                          setUpdateForm({});
                          setStartDate(new Date());
                          props.handleMode();
                        }
                      })
                    }}
                >삭제</Button> 

                <Button type="submit"
                        variant="outlined" size="small" color="primary" className={classes.margin}
                >수정</Button>
          </Form>
        </div>
    </div>
  )
};

export default ReserveUpdateForm;