import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function LabTable({ labTable }, props) {
  const lab = ["검사실1", "검사실2", "검사실3"];
  return (
    <>
      <table className="table">
        <thead className="text-center">
          <tr className={cx("lab-th")}>
            {lab.map((item, index) => <th key={index}>{item}</th>)}
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            {/* {lab.map((index, item) => {

            })} */}
            {labTable && labTable.lab === "검사실1"
            ?
            <td>{labTable.patientName}</td>
            :
            <td></td>
            }
            {labTable && labTable.lab === "검사실2"
            ?
            <td>{labTable.patientName}</td>
            :
            <td></td>
            }            
            {labTable && labTable.lab === "검사실3"
            ?
            <td>{labTable.patientName}</td>
            :
            <td></td>
            }
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default LabTable;