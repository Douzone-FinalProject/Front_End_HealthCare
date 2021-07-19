import style from "./Manage.module.css";
import classnames from "classnames/bind";
import { MDBTable, MDBTableBody} from 'mdbreact';
import StaffListItem from "./StaffListItem";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import  Button  from "../common/Button";
import CreateEmployee from "./CreateEmployee/index"
import UpdateEmployee from "./UpdateEmployee/index"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { staffList, readStaff, deleteStaf, getSearchStaffList } from "apis/manage";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
const cx = classnames.bind(style);


const useStyles = makeStyles((theme) => ({
    root: {
      width: 280,
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      padding: 7,
      flex: 2,
    },
    iconButton: {
      padding: 10,
    },
    
  }));


function ManageBottom(props) {
    const classes = useStyles();
    const globalHospital = useSelector((state) => state.authReducer.hospital_id);
    const [staffs, setStaffs] = useState([]);
    const getStaffList =  async () => {
        try{
           
            const response = await staffList(globalHospital);
            setStaffs(response.data.staffList2);

        }
        catch(error){
            props.history.push("/page403");
            console.log(error)
        }
    };
   
    const [isModal, setModal] = useState(false);
    const [nowStaff, setNowStaff] = useState({});
    const [phone, setPhone] = useState({
        phone1: '',
        phone2: '',
        phone3: ''
      })
    const [state, setState] = useState({
        checkedA: false
    });


    function openCreateEmployee() {
        setModal(true);
    }

    function closeModal() {
        setModal(false);
    }

    const [updateIsOpen, setUpdateIsOpen] = useState(false);

    function closeUpdateModal() {
        setPhone({});
        setNowStaff({});
        setState({...props.state, checkedA:false});
        setUpdateIsOpen(false);
    }

    const openStaffInfo = async (staff_id) => {
        setUpdateIsOpen(true);
        const response = await readStaff(staff_id);
        setNowStaff(response.data.staffInfo)
        setPhone({
            ...phone,
            phone1: response.data.staffInfo.staff_phone.slice(0,3),
            phone2: response.data.staffInfo.staff_phone.slice(3,7),
            phone3: response.data.staffInfo.staff_phone.slice(7,11)
        })
    }
    const updateNameAndIdChange = (event) => {
        setNowStaff({
            ...nowStaff,
            [event.target.name]: event.target.value,
        })
    }
    const updatePhoneChange = (event) => {
        setPhone({
            ...phone,
            [event.target.name]: event.target.value,
        })
        if(event.target.name === 'phone1') {
            setNowStaff({
                ...nowStaff,
                staff_phone: event.target.value + phone.phone2 + phone.phone3
            })
        } else if(event.target.name === 'phone2') {
            setNowStaff({
                ...nowStaff,
                staff_phone: phone.phone1 + event.target.value + phone.phone3
            })
        } else if(event.target.name === 'phone3') {
            setNowStaff({
                ...nowStaff,
                staff_phone: phone.phone1 + phone.phone2 + event.target.value
            })
        }
    };

    const DeleteSuccess = async () => {
        try{
            await deleteStaf(nowStaff.staff_id);
            const response = await staffList(globalHospital);
            setStaffs(response.data.staffList2);
          
        }catch(error){
          console.log(error);
        }
    };


    const deleteStaff = async (event) => {
        try{
            event.preventDefault();
            Swal.fire({
                title: '정말 삭제하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
              }).then((result)  => {
                if (result.isConfirmed) {
                  Swal.fire(
                    '삭제되었습니다.',
                    'Your file has been deleted.',
                    'success'
                  )
                  DeleteSuccess(nowStaff.staff_id); 
                  setNowStaff({});
                  closeUpdateModal();
                }
              })
        }
        catch(error){
            console.log(error);
        }
    }
    const [nameId, setNameId] = useState();
   
    const handleNameAndId = (event) => {
        console.log(event.target.value)
        setNameId(event.target.value);
    }

    const searchStaff = async (nameId, globalHospital) => {
        const response = await getSearchStaffList(nameId, globalHospital);
        console.log(response.data.searchStaffList);
        setStaffs(response.data.searchStaffList)
    }

    const searchStaffEnter = (e, nameId, globalHospital) => {
        if(e.key === 'Enter'){
            searchStaff(nameId, globalHospital);
        }
    }
    const allStaff = () => {
        getStaffList()
    }
    useEffect(() => {
        getStaffList()
    }, [])

    return(
        <>
        <CreateEmployee isModal={isModal} closeModal={closeModal} getStaffList={getStaffList} staffs={staffs} />
        <UpdateEmployee state={state} setState={setState} getStaffList={getStaffList} updateNameAndIdChange={updateNameAndIdChange} updatePhoneChange={updatePhoneChange} phone={phone} updateIsOpen={updateIsOpen} closeUpdateModal={closeUpdateModal} nowStaff={nowStaff} setNowStaff={setNowStaff} deleteStaff={deleteStaff} />
        <div style={{marginBottom:"2.8%"}}>
        <div className="d-flex flex-row">
            
            <Button className={cx("ssip2", "mb-1 mt-5")} onClick={openCreateEmployee} ><PersonAddIcon /> 직원 생성 </Button>
            
            <div style={{marginLeft:"66%"}}>
            <Paper style={{marginTop:"17%"}} className={classes.root}>
                <InputBase onChange={handleNameAndId} onKeyPress={(e)=>{searchStaffEnter(e,nameId, globalHospital)}}
                    className={classes.input}
                    placeholder="이름 및 ID를 검색하세요." 
                />
                <IconButton onClick={()=>searchStaff(nameId, globalHospital)} className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton onClick={allStaff} color="primary" className={classes.iconButton} aria-label="directions">
                    <PeopleIcon />
                </IconButton>
            </Paper>
            </div>   
        </div>
        
            <MDBTable scrollY className={cx("table table-hover", "diagnosis-tbh", "mt-3")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th style={{width:"100px"}}>이름</th>
                    <th style={{width:"100px"}}>번호</th>
                    <th style={{width:"100px"}}>ID</th>
                    <th style={{width:"100px"}}>휴먼상태</th>
                    <th style={{width:"60px"}}>병원</th>
                    </tr>
                </thead>
            </MDBTable>
            {staffs.length > 0 ? 
            <div style={{height:"200px"}}>
            <MDBTable scrollY className={cx("table-hover ", "diagnosis-tbb")}>
                <MDBTableBody>
                {staffs.map((staff) => {
                    return(
                        <StaffListItem key={staff.staff_id} staff={staff} openStaffInfo={openStaffInfo} />
                    );
                })}
                </MDBTableBody>    
            </MDBTable>
            </div>
            :
            <>
            <div className="d-flex flex-column">
                <div style={{width: "100%", textAlign:"center", marginBottom:"2%",marginTop:"0.75%"}}><h4>존재하지 않는 직원입니다. 다시 검색해 주세요.</h4></div>
                <div><SentimentVeryDissatisfiedIcon  style={{width: "100%", height: "5em", color:"#ced4da"}}/></div>
            </div>
            </>
            }
        </div>

        </>
    );
}

export default ManageBottom;