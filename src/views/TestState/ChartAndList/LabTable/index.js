import style from "views/TestState/teststate.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function LabTable({ patientNames }, props) {
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
            <td>{patientNames[0]}</td>
            <td>{patientNames[1]}</td>
            <td>{patientNames[2]}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default LabTable;