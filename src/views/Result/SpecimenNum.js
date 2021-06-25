import style from "./result.module.css"
import classnames from "classnames/bind";
import { Table } from 'antd';
import { MDBTable, MDBTableBody } from 'mdbreact';

const cx = classnames.bind(style);

function SpecimenNum(props) {
    //antd 검체번호 테이블 컬럼 설정
    const columns = [
        {
            title: '검체번호',
            dataIndex: "diagnostic_specimen_number",
        },
        {
            title: '환자번호',
            dataIndex: "patient_id",
        },
        {
            title: '성명',
            dataIndex: "name",
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

    //검체번호 테이블에 행 별로 key 설정
    for(let i = 0; i < props.specimenData.length; i++) {
        props.specimenData[i].key = i + 1;
    }
    const searchData = props.specimenData;

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

export default SpecimenNum;