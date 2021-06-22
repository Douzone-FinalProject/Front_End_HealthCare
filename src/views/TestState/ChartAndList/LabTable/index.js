function LabTable(props) {
  const lab = ["검사실1", "검사실2", "검사실3"];
  return (
    <>
      <table className="table">
        <thead className="text-center">
          <tr>
            {lab.map((item, index) => <th key={index}>{item}</th>)}
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>민상조</td>
            <td>채정리</td>
            <td>병주캉</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default LabTable;