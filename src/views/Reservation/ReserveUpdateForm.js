import {React, useState, useEffect} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.css';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from './ReserveCalendar/src/moment-range';
import {Form} from 'react-form-elements';
import { getReservationById } from 'apis/reservation';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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

const ReserveUpdateForm = (props) => {
  const classes = useStyles();
  // state
  const [updateForm, setUpdateForm] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = (time) => {
    return (time.getHours()>7 && time.getHours() < 19 && time.getHours() !== 12)? "text-success" : "text-error";
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

    // DB ?????? -> ????????? ??????  
    updateForm.reservation_datetime = moment(startDate).format('YYYY-MM-DD HH:mm');
    updateForm.range = moment.range(moment(updateForm.reservation_datetime), moment(updateForm.reservation_datetime).add(30, 'minutes')) 
    props.handleUpdate(updateForm);

    // ??? ????????? 
    setUpdateForm({});
    setStartDate(new Date());
    props.handleMode();
  };

  return (
    <div className={cx("right-component-top")}>
      <div className={cx("form-subject", "d-flex justify-content-between")}>
        <div>
          <AddAlarmIcon style={{fontSize: '1.8em'}} className="mr-1"/>?????? ?????? 
        </div>
        <Button 
          variant="outlined" size="small" color="primary" className={classes.margin}
            onClick={() => {props.handleMode();}}>????????? ??????</Button>
      </div>
      <div className={cx("reserve-form")}>
          <Form name="updateForm" onSubmit={handleUpdate}>
            <div>
              <TextField disabled label="??????" className="mr-5" name="reservation_name" 
                        value={updateForm.reservation_name || ''}/> 
              <TextField disabled label="????????????" name="reservation_phone" 
                        value={updateForm.reservation_phone || ''}/> 

              <TextField required label="????????????"  onChange={handleChange}
                    name="reservation_reason" value={updateForm.reservation_reason || ''}/> 
              <div className="mt-4 mb-3">
                
                <div style={{color: 'gray', fontSize:'13px'}} className="mb-2">?????? ??????
                  <div className="mr-3 font-weight-bold">{updateForm.reservation_datetime || ''}</div>
                </div>
                <DatePicker style={{color: 'gray'}}
                  dateFormat="yyyy-MM-dd HH:mm"
                  showTimeSelect
                  name="reservation_datetime"
                  selected={startDate}
                  onChange={(date) => {setStartDate(date);}}
                  timeClassName={handleColor}
                />
               </div> 
            </div>
                <Button type="button" 
                  variant="outlined" size="small" color="primary" className={classes.margin}
                  onClick={() => {
                    setUpdateForm({});
                    setStartDate(new Date());
                    props.handleMode();
                    props.handleSMS(updateForm)}}>SMS ??????</Button>
                <Button
                  variant="outlined" size="small" color="primary" className={classes.margin}
                  type="button" 
                    onClick={() => {
                      Swal.fire({
                        title: '?????????????????????????',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '??????',
                        cancelButtonText: '??????'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            icon: 'success',
                            title: '?????????????????????.',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          const rid = updateForm.reservation_id;
                          props.handleDelete(rid);
                          setUpdateForm({});
                          setStartDate(new Date());
                          props.handleMode();
                        }
                      })
                    }}
                >??????</Button> 

                <Button type="submit"
                        variant="outlined" size="small" color="primary" className={classes.margin}
                >??????</Button>
          </Form>
        </div>
    </div>
  )
};

export default ReserveUpdateForm;