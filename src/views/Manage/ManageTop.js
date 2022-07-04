import style from "./Manage.module.css";
import classnames from "classnames/bind";
import Clock from 'react-live-clock';
import PieChart from "./PieChart";
import PieChart2 from "./PieChart2";
import PieChart3 from "./PieChart3";
import {readyCount, treatmentCount, inspectionCount, paymentCount ,bloodCount, staffCount, disableStaffCount } from "apis/manage";
import { useEffect, useState } from "react";
const cx = classnames.bind(style);

function ManageTop(props) {
    //대기, 진료중, 검사중, 수납전
    const [ready, setReady] = useState();
    const [treatment, setTreatment] = useState();
    const [inspection, setInspection] = useState();
    const [payment, setPayment] = useState();
    //혈액형
    const [aTypeBlood, setATypeBlood] = useState();
    const [bTypeBlood, setBTypeBlood] = useState();
    const [abTypeBlood, setABTypeBlood] = useState();
    const [oTypeBlood, setOTypeBlood] = useState();
    const [rh_aTypeBlood, setRH_ATypeBlood] = useState();
    const [rh_bTypeBlood, setRH_BTypeBlood] = useState();
    const [rh_abTypeBlood, setRH_ABTypeBlood] = useState();
    const [rh_oTypeBlood, setRH_OTypeBlood] = useState();
    //활성화, 비활성화
    const [staffCounts, setStaffCounts] = useState();
    const [disableStaffCounts, setDisableStaffCounts] = useState();
    
    const getInfoCount =  async () => {
        try{
            const response = await readyCount();
            const response2 = await treatmentCount();
            const response3 = await inspectionCount();
            const response4 = await paymentCount();
            setReady(response.data.readyCounts);
            setTreatment(response2.data.treatmentCounts);
            setInspection(response3.data.inspectionCounts);
            setPayment(response4.data.paymentCounts);

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
    useEffect(() => {
        getInfoCount()
        getStaffCount()
        getBloodCount()
    }, [])
    return(
        <>
         <div className="mb-2 mt-2"><Clock className={cx("timeInterval")} format={'MM월 DD일  HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'}/></div>
             <div>
             <h2 className="mb-4 ml-5" >관리 페이지</h2>
             </div>    
            
            <div className={cx("d-flex flex-row", "ssip", "mb-4")}>
            <div><PieChart ready={ready} treatment={treatment} inspection={inspection} payment={payment} /></div>
            <div className={cx("ssip")}><PieChart3 aTypeBlood={aTypeBlood} bTypeBlood={bTypeBlood} abTypeBlood={abTypeBlood} oTypeBlood={oTypeBlood} rh_aTypeBlood={rh_aTypeBlood} rh_bTypeBlood={rh_bTypeBlood} rh_abTypeBlood={rh_abTypeBlood} rh_oTypeBlood={rh_oTypeBlood} /></div>
            <div className={cx("ssip")}><PieChart2 staffCounts={staffCounts} disableStaffCounts={disableStaffCounts}  /></div>
            </div>


        </>
    );
}

export default ManageTop;
