import style from "./Manage.module.css";
import classnames from "classnames/bind";
import { MDBTable, MDBTableBody} from 'mdbreact';
import Clock from 'react-live-clock';
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import PieChart from "./PieChart";
import PieChart2 from "./PieChart2";
import PieChart3 from "./PieChart3";
import { staffList, readStaff, deleteStaf, receiptCount, testCount, medicinePresCount, bloodCount, staffCount, disableStaffCount } from "apis/manage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StaffListItem from "./StaffListItem";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import  Button  from "../common/Button";
import CreateEmployee from "./CreateEmployee/index"
import UpdateEmployee from "./UpdateEmployee/index"
import Swal from "sweetalert2";
const cx = classnames.bind(style);



function Manage(props) {

    const globalHospital = useSelector((state) => state.authReducer.hospital_id);
    const [staffs, setStaffs] = useState([]);
    const [receiptCount2, setReceiptCount2] = useState();
    const [testCount2, setTestCount2] = useState();
    const [medicinePres2, setMedicinePres2] = useState();
    const [aTypeBlood, setATypeBlood] = useState();
    const [bTypeBlood, setBTypeBlood] = useState();
    const [abTypeBlood, setABTypeBlood] = useState();
    const [oTypeBlood, setOTypeBlood] = useState();
    const [rh_aTypeBlood, setRH_ATypeBlood] = useState();
    const [rh_bTypeBlood, setRH_BTypeBlood] = useState();
    const [rh_abTypeBlood, setRH_ABTypeBlood] = useState();
    const [rh_oTypeBlood, setRH_OTypeBlood] = useState();
    const [staffCounts, setStaffCounts] = useState();
    const [disableStaffCounts, setDisableStaffCounts] = useState();
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

    const getInfoCount =  async () => {
        try{
            const response = await receiptCount();
            const response2 = await testCount();
            const response3 = await medicinePresCount();
            setReceiptCount2(response.data.receiptCounts);
            setTestCount2(response2.data.testCounts);
            setMedicinePres2(response3.data.medicinePresCounts);

        }
        catch(error){
            console.log(error)
        }
    };

    const getBloodCount =  async () => {
        try{
            const response = await bloodCount();
            
            setATypeBlood(response.data.acount);
            setBTypeBlood(response.data.bcount);
            setABTypeBlood(response.data.abcount);
            setOTypeBlood(response.data.ocount);
            setRH_ATypeBlood(response.data.rh_acount);
            setRH_BTypeBlood(response.data.rh_bcount);
            setRH_ABTypeBlood(response.data.rh_abcount);
            setRH_OTypeBlood(response.data.rh_ocount);

        }
        catch(error){
            console.log(error)
        }
    };

    const getStaffCount =  async () => {
        try{
            const response = await staffCount();
            const response2 = await disableStaffCount();
            
            setStaffCounts(response.data.staffcount);
            setDisableStaffCounts(response2.data.disablestaffcount);
            

        }
        catch(error){
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
        console.log(event.target.name)
        console.log(event.target.value)
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

    useEffect(() => {
        getBloodCount()
        getStaffList()
        getInfoCount()
        getStaffCount()
    }, [])
    
    const realTimeReceiptList = async () => {
        console.log("realTimeReceiptList");
    }

    return (
        <>
        <CreateEmployee isModal={isModal} closeModal={closeModal} getStaffList={getStaffList} staffs={staffs} />
        <UpdateEmployee getStaffList={getStaffList} updateNameAndIdChange={updateNameAndIdChange} updatePhoneChange={updatePhoneChange} phone={phone} updateIsOpen={updateIsOpen} closeUpdateModal={closeUpdateModal} nowStaff={nowStaff} setNowStaff={setNowStaff} deleteStaff={deleteStaff} />
        <Header realTimeReceiptList={realTimeReceiptList}/>
      
         <div className="mt-5">

         <div className="mb-3"><Clock className={cx("timeInterval")} format={'MM월 DD일  HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'}/></div>
             <div>
             <h2 className="mb-4 ml-5" >관리 페이지</h2>
             </div>    
            
            <div className={cx("d-flex flex-row", "ssip")}>
            <div><PieChart receiptCount2={receiptCount2} testCount2={testCount2} medicinePres2={medicinePres2} /></div>
            <div className={cx("ssip")}><PieChart3 aTypeBlood={aTypeBlood} bTypeBlood={bTypeBlood} abTypeBlood={abTypeBlood} oTypeBlood={oTypeBlood} rh_aTypeBlood={rh_aTypeBlood} rh_bTypeBlood={rh_bTypeBlood} rh_abTypeBlood={rh_abTypeBlood} rh_oTypeBlood={rh_oTypeBlood} /></div>
            <div className={cx("ssip")}><PieChart2 staffCounts={staffCounts} disableStaffCounts={disableStaffCounts}  /></div>
            </div>
            <Button className={cx("ssip2", "mb-1 mt-5")} onClick={openCreateEmployee} ><PersonAddIcon /> 직원 생성 </Button>
            <MDBTable scrollY className={cx("table table-hover", "diagnosis-tbh", "mt-3")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th style={{width:"100px"}}>성명</th>
                    <th style={{width:"100px"}}>번호</th>
                    <th style={{width:"100px"}}>ID</th>
                    {/* <th style={{width:"50px"}}>PW</th> */}
                    <th style={{width:"100px"}}>휴먼상태</th>
                    <th style={{width:"60px"}}>병원</th>
                    </tr>
                </thead>
            </MDBTable>
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
        <DialMenu/>
        </>
    );
}


export default Manage;