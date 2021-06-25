function TableRow({ key, item }, props) {
  const rendering = () => {
    const result = [];
    for (let i in item) {
      result.push(<td>{item[i]}</td>)
    }
  }
  return (
    <>
      <tr>
        {rendering()}
      </tr>
    </>
  )
}

export default TableRow;