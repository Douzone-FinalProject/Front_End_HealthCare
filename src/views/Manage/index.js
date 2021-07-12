import style from "./Manage.module.css";
import classnames from "classnames/bind";
import { MDBTable, MDBTableBody} from 'mdbreact';
import Clock from 'react-live-clock';
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import PieChart from "./PieChart";
import PieChart2 from "./PieChart2";
import PieChart3 from "./PieChart3";
import { staffList, readStaff, deleteStaf, receiptCount, testCount, medicinePresCount } from "apis/manage";
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
    // console.log(globalHospital)
    const [staffs, setStaffs] = useState([]);
    const [receiptCount2, setReceiptCount2] = useState();
    const [testCount2, setTestCount2] = useState();
    const [medicinePres2, setMedicinePres2] = useState();
    const getStaffList =  async () => {
        try{
           
            const response = await staffList(globalHospital);
            setStaffs(response.data.staffList2);

        }
        catch(error){
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
   
    const [isModal, setModal] = useState(false);
    const [nowStaff, setNowStaff] = useState({});

    function openCreateEmployee() {
        setModal(true);
    }

    function closeModal() {
        setModal(false);
    }

    const [updateIsOpen, setUpdateIsOpen] = useState(false);

    function closeUpdateModal() {
        setUpdateIsOpen(false);
    }

    const openStaffInfo = async (staff_id) => {
        setUpdateIsOpen(true);
        const response = await readStaff(staff_id);
        setNowStaff(response.data.staffInfo)
    }
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
        getStaffList()
        getInfoCount()
        //진료 검사 약처방 수 넣기
    }, [])
    


    return (
        <>
        
        <Header/>
        <CreateEmployee isModal={isModal} closeModal={closeModal} getStaffList={getStaffList} staffs={staffs} />
        <UpdateEmployee updateIsOpen={updateIsOpen} closeUpdateModal={closeUpdateModal} nowStaff={nowStaff} deleteStaff={deleteStaff} />
         <div className="mt-5">
             <div>
             <h2 className="mb-4 ml-5" >관리 페이지</h2>
             <Clock className={cx("timeInterval")} format={'MM 월 DD 일  HH시 mm분 ss초'} ticking={true} timezone={'Asia/Seoul'}/> 
             </div>    
            
            <div className={cx("d-flex flex-row", "ssip", "mb-5")}>
            <div><PieChart receiptCount2={receiptCount2} testCount2={testCount2} medicinePres2={medicinePres2} /></div> <div className={cx("ssip")}><PieChart3 /></div><div className={cx("ssip")}><PieChart2 /></div>
            
            </div>
            <Button className={cx("ssip2", "mb-2 mt-5")} onClick={openCreateEmployee} ><PersonAddIcon /> 직원 생성 </Button>
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