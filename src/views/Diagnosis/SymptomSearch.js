import style from "./Diagnosis.module.css";
import classnames from "classnames/bind";
import  Button  from "../common/Button";
import SymptomSearchItem from "./SymptomSearchItem"
import { MDBTable, MDBTableBody } from 'mdbreact';
import Swal from "sweetalert2";
const cx = classnames.bind(style);

function SymptomSearch(props) {

    const searchSymptom = (event) => {
        if(!event){
            Swal.fire({
                icon: 'info',
                title: '검색 할 증상을 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else{
            props.searchSymptom(event);
        }
        
        
    };

    const selectSymptom = (event) => {
        if(props.selectedPatient.patient_id){
            props.selectSymptom(event);
        }
        else{
            Swal.fire({
                icon: 'info',
                title: '진행 할 환자를 먼저 선택해주세요.',
                showConfirmButton: false,
                timer: 1500
            })
        }
        
        
    };

    const handleChange = (event) => {
        props.handleChange(event);
        console.log(event.target);
    };
    return(
        <>
        <div className="mt-4">

            <h4 className="mb-4 ml-4">증상 검색</h4>
            <input className={cx("diagnosis-symptom-input","ml-4 mb-2")} type="text" name="symptom_name" onKeyPress={(e)=>{props.symptomEnter(e,props.search.symptom_name)}} onChange={handleChange} placeholder="증상을 검색하시오."/>
            <Button className={cx("symptomButton")} onClick={()=>{searchSymptom(props.search.symptom_name)}}>검색</Button>
            <Button className="ml-2" onClick={()=>{selectSymptom(props.search.symptom_name)}}>선택</Button>

            <MDBTable className={cx("diagnosis-tbh")}>
                <thead  className={cx("diagnosis-table-header")}>
                    <tr> 
                    <th style={{width:"50px"}}></th>
                    <th>증상명칭</th>
                    <th>증상코드</th>
                    <th>묶음코드</th>
                    <th>묶음명</th>
                    </tr>
                </thead>
            </MDBTable>     
            <MDBTable scrollY className={cx("table-hover ", "diagnosis-tbb")}>
                <MDBTableBody>
                    {props.symptomsCopy && props.symptomsCopy.map((symptom) => {
                        return (
                            <SymptomSearchItem key={symptom.search_id} symptom={symptom} deleteBeforePrescript={props.deleteBeforePrescript} />
                        );
                    })}
                </MDBTableBody>
            </MDBTable>

        </div>
        </>
    );
}

export default SymptomSearch;