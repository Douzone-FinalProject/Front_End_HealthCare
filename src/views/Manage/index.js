import style from "./Manage.module.css";
import classnames from "classnames/bind";
import Header from "views/common/Header";
import DialMenu from "views/common/DialMenu";
import ManageTop from "./ManageTop";
import ManageBottom from "./ManageBottom";
const cx = classnames.bind(style);

function Manage(props) {

    const realTimeReceiptList = async () => {
        console.log("realTimeReceiptList");
    }

    return (
        <>
        
        <Header realTimeReceiptList={realTimeReceiptList}/>
      
        <div className="mt-2 d-flex flex-column">
            <div className={cx("diagnosis-component-background", "ml-2", "mr-2")}>
            <ManageTop/>
            </div> 
            <div className={cx("diagnosis-component-background", "ml-2", "mr-2", "mt-2")}>
            <ManageBottom/>
            </div>
        </div>
        <DialMenu/>
        </>
    );
}


export default Manage;