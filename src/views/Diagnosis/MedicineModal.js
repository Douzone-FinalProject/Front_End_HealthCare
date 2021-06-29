import { Card, Table } from 'antd';
import style from "./MedicineModal.module.css";
import classnames from "classnames/bind";
import Button from "views/common/Button";
import { search } from "./db";
import { useState } from 'react';
import { useEffect } from 'react';

const cx = classnames.bind(style);

function MedicineModal(props) {
  const [medicineData, setMedicineData] = useState();

  const columns = [
    {
      title: "약품코드",
      dataIndex: "medicine_id",
    },
    {
      title: "약품명",
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
    preserveSelectedRowKeys: true,
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

  useEffect(() => {
    console.log(data);
  }, [data])
  
  return (
    <div className={cx("medicine")}>
      <div className={cx("modal-container")} onClick={(event) => event.stopPropagation()}>
        <Card>
          <div className={cx("d-flex", "justify-content-between", "mb-2")}>
            <div>
              <input type="text" className={cx("mr-2", "medicine-input")} onChange={searchMedicine}/>
            </div>
            <div>
              <Button className={cx("medicine-btn","mr-2")} onClick={() => props.addMedicines(data)}>추가</Button>
              <Button className={cx("medicine-btn")} onClick={props.handleModal}>닫기</Button>
            </div>
          </div>
          <Table className={cx("ant-th")} columns={columns} dataSource={medicineData} rowKey={medicine => medicine.medicine_id} pagination={false} rowSelection={{...rowSelection}}/>
        </Card>
      </div>    
    </div>
  );
}

export default MedicineModal;