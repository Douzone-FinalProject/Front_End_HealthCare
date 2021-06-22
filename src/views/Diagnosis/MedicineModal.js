import { Card, Table } from 'antd';
import style from "./MedicineModal.module.css";
import classnames from "classnames/bind";
import Button from "views/common/Button";

const cx = classnames.bind(style);

function MedicineModal(props) {
  const columns = [
    {
      title: "약품코드",
      dataIndex: "medicineCode",
    },
    {
      title: "영문명",
      dataIndex: "medicineEn"
    },
    {
      title: "약품구분",
      dataIndex: "medicineType"
    },
    {
      title: "수량",
      datatIndex: "count"
    },
    {
      title: "단위",
      dataIndex: "unit"
    }
  ]
  
  return (
    <div className={cx("medicine")} onClick={props.handleModal}>
      <div className={cx("modal-container")} onClick={(event) => event.stopPropagation()}>
        <Card>
          <div className={cx("d-flex", "justify-content-between", "mb-2")}>
            <div>
              <input type="text" className={cx("mr-2", "medicine-input")} />
              <Button className={cx("medicine-btn")} color={'rgb(54, 162, 235)'}>검색</Button>
            </div>
            <div>
              <Button className={cx("medicine-btn")}>추가</Button>
              <Button className={cx("medicine-btn")} onClick={props.handleModal}>닫기</Button>
            </div>
          </div>
          <Table columns={columns} />
        </Card>
      </div>    
    </div>
  );
}

export default MedicineModal;