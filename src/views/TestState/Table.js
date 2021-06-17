function Table({ columns, tableData }) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            { columns.map((column, index) => <th key={index}>{column.title}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Table;