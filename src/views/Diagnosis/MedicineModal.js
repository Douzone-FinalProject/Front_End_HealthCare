import { Card, Table } from 'antd';
import style from "./MedicineModal.module.css";
import classnames from "classnames/bind";
import Button from "views/common/Button";
import { search } from "./db";
import { useState } from 'react';


const cx = classnames.bind(style);

function MedicineModal(props) {
  const [medicineData, setMedicineData] = useState();
  const columns = [
    {
      title: "약품코드",
      dataIndex: "medicine_id",
    },
    {
      title: "영문명",
      dataIndex: "medicine_name"
    },
    {
      title: "약품구분",
      dataIndex: "medicine_type"
    },
    {
      title: "단위",
      dataIndex: "medicine_unit"
    }
  ]

  const searchMedicine = (event) => {
    setMedicineData(search(event.target.value));
  }

  let data = [];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      data = selectedRows;
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  }
  
  return (
    <div className={cx("medicine")} onClick={props.handleModal}>
      <div className={cx("modal-container")} onClick={(event) => event.stopPropagation()}>
        <Card>
          <div className={cx("d-flex", "justify-content-between", "mb-2")}>
            <div>
              <input type="text" className={cx("mr-2", "medicine-input")} onChange={searchMedicine}/>
              {/* <Button className={cx("medicine-btn")} color={'rgb(54, 162, 235)'} onChange={searchMedicine}>검색</Button> */}
            </div>
            <div>
              <Button className={cx("medicine-btn")} onClick={() => props.addMedicines(data)}>추가</Button>
              <Button className={cx("medicine-btn")} onClick={props.handleModal}>닫기</Button>
            </div>
          </div>
          <Table columns={columns} dataSource={medicineData} rowKey={medicine => medicine.medicine_id} rowSelection={{...rowSelection}}/>
        </Card>
      </div>    
    </div>
  );
}

export default MedicineModal;