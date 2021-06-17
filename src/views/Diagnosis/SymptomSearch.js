import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import { useState } from "react";
import  Button  from "../common/Button";

const cx = classnames.bind(style);

function SymptomSearch(props) {

    const [search, setSearch] = useState({
        symptom_name : ""
    });
    
    const handleChange = (event) => {
        setSearch({
            ...search,
            [event.target.name]: event.target.value
            
        })
    };

    return(
        <>
        <div className="mt-4">
            <h4 className="mb-4 ml-4">증상 검색</h4>
            <input className={cx("diagnosis-symptom-input","ml-4 mb-2")} type="text" name="symptom" onChange={handleChange} placeholder="증상을 검색하시오."/>
            <Button className="ml-3">검색</Button>
            <Button className="ml-1">선택</Button>
            <table className={cx("table table-hover ml-4","diagnosis-table")}>
                <thead className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th>증상명칭</th>
                    <th>증상코드</th>
                    <th>묶음코드</th>
                    <th>묶음명</th>
                    </tr>
                </thead>
                <tbody className={cx("diagnosis-table-body")}>
                    <tr>
                    <td>중증 열성 혈소판감소 증후군</td>
                    <td>BLD18</td>
                    <td>B1061</td>
                    <td>Valproic acid therapeutic drug monitoring</td>
                    </tr>
                    <tr>
                    <td>고혈압</td>
                    <td>BLD05</td>
                    <td>E6540</td>
                    <td>Blood Pressure</td>
                    </tr>
                    <tr>
                    <td>고혈압</td>
                    <td>BLD05</td>
                    <td>C3791</td>
                    <td>Na (Sodium)</td>
                    </tr>
                    <tr>
                    <td>고혈압</td>
                    <td>BLD05</td>
                    <td>C2202</td>
                    <td>Total Protein</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    );
}

export default SymptomSearch;