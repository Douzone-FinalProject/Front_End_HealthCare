import style from "./result.module.css"
import classnames from "classnames/bind";
import { Table } from 'antd';

const cx = classnames.bind(style);

function ResultInputTable(props) {
    //결과 테이블에 행 별로 key 설정
    for(let i = 0; i < props.result.length; i++) {
        props.result[i].key = i + 1;
    }
    const searchData = props.result;

    return (
        <div className={cx("result-toptable")}>
            <Table bordered
                   className={cx("result-toptablecol")}
                   columns={props.columns}
                   dataSource={searchData}
                   pagination={false}
                   scroll={{ y: '35vh' }}
                   onRow={props.handleSpecimen} />
        </div>
    );
}

export default ResultInputTable;