import style from "./result.module.css"
import classnames from "classnames/bind";
import { Table } from 'antd';

const cx = classnames.bind(style);

function DianosisNum(props) {
    //antd 진단번호 테이블 컬럼 설정
    const columns = [
        {
            title: '진단번호',
            dataIndex: "receipt_id",
        },
        {
            title: '환자번호',
            dataIndex: "patient_id",
        },
        {
            title: '성명',
            dataIndex: "patient_name",
        },
        {
            title: '상태',
            dataIndex: "receipt_state",
            width: '15%'
        },
        {
            title: '검사일자',
            dataIndex: "receipt_datetime",
            width: '25%'
        }
    ];

    //진단번호 테이블에 행 별로 key 설정
    for(let i = 0; i < props.receiptData.length; i++) {
        props.receiptData[i].key = i + 1;
    }
    const searchData = props.receiptData;

    return (
        <Table className={cx("result-toptablecol")}
               columns={columns}
               dataSource={searchData}
               pagination={false}
               scroll={{ y: '60vh' }}
               onRow={props.handleResult}
               rowClassName={(record, index) => (index === props.index ? cx("result-color") : '')} />
    );
}

export default DianosisNum;