import Thead from "./Thead";
import TableRow from "./TableRow";

function Table({ columns, datas },props) {
  return (
    <>
      <table>
        <Thead columns={columns}/>
        {/* <tbody>
          {datas.map((item, index) => <TableRow key={index} item={item} />)}
        </tbody> */}
      </table>
    </>
  );
}

export default Table;