function Thead({ columns }, props) {
  console.log(columns)
  return (
    <>
      <thead>
        <tr>
          {columns.map((column, index) => <th key={index}>{column}</th>)}
        </tr>
      </thead>
    </>
  );
}

export default Thead;